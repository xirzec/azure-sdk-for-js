// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, SendRequest, PipelinePolicy } from "@azure/core-rest-pipeline";
import {
  OperationRequest,
  SerializerOptions,
  XmlOptions,
  XML_CHARKEY,
  RequiredSerializerOptions,
  OperationArguments,
  OperationSpec
} from "./interfaces";
import { MapperTypeNames } from "./serializer";
import { getOperationRequestInfo } from "./operationHelpers";

/**
 * The programmatic identifier of the serializationPolicy.
 */
export const serializationPolicyName = "serializationPolicy";

/**
 * Options to configure API request serialization.
 */
export interface SerializationPolicyOptions {
  /**
   * A function that is able to write XML. Required for XML support.
   */
  stringifyXML?: (obj: any, opts?: XmlOptions) => string;

  /**
   * Configures behavior of xml parser and builder.
   */
  serializerOptions?: SerializerOptions;
}

/**
 * This policy handles turning request bodies serialized by mappingPolicy into
 * serialized strings that can be sent over the network.
 */
export function serializationPolicy(options: SerializationPolicyOptions = {}): PipelinePolicy {
  const stringifyXML = options.stringifyXML;

  return {
    name: serializationPolicyName,
    async sendRequest(request: OperationRequest, next: SendRequest): Promise<PipelineResponse> {
      const operationInfo = getOperationRequestInfo(request);
      const operationSpec = operationInfo?.operationSpec;
      const operationArguments = operationInfo?.operationArguments;
      if (operationSpec && operationArguments) {
        serializeRequestBody(request, operationArguments, operationSpec, stringifyXML);
      }
      return next(request);
    }
  };
}

/**
 * @internal
 */
export function serializeRequestBody(
  request: OperationRequest,
  operationArguments: OperationArguments,
  operationSpec: OperationSpec,
  stringifyXML: (obj: any, opts?: XmlOptions) => string = function() {
    throw new Error("XML serialization unsupported!");
  }
): void {
  const serializerOptions = operationArguments.options?.serializerOptions;
  const updatedOptions: RequiredSerializerOptions = {
    xml: {
      rootName: serializerOptions?.xml.rootName ?? "",
      includeRoot: serializerOptions?.xml.includeRoot ?? false,
      xmlCharKey: serializerOptions?.xml.xmlCharKey ?? XML_CHARKEY
    }
  };

  const xmlCharKey = updatedOptions.xml.xmlCharKey;
  if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
    const bodyMapper = operationSpec.requestBody.mapper;
    const { required, serializedName, xmlName, nullable } = bodyMapper;
    const typeName = bodyMapper.type.name;

    try {
      if (
        (request.body !== undefined && request.body !== null) ||
        (nullable && request.body === null) ||
        required
      ) {
        const isStream = typeName === MapperTypeNames.Stream;

        if (operationSpec.isXML) {
          if (typeName === MapperTypeNames.Sequence) {
            request.body = stringifyXML(request.body, {
              rootName: xmlName || serializedName,
              xmlCharKey
            });
          } else if (!isStream) {
            request.body = stringifyXML(request.body, {
              rootName: xmlName || serializedName,
              xmlCharKey
            });
          }
        } else if (
          typeName === MapperTypeNames.String &&
          (operationSpec.contentType?.match("text/plain") || operationSpec.mediaType === "text")
        ) {
          // the String serializer has validated that request body is a string
          // so just send the string.
          return;
        } else if (!isStream) {
          request.body = JSON.stringify(request.body);
        }
      }
    } catch (error) {
      throw new Error(
        `Error "${error.message}" occurred in serializing the payload - ${JSON.stringify(
          serializedName,
          undefined,
          "  "
        )}.`
      );
    }
  }
}
