// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, SendRequest, PipelinePolicy } from "@azure/core-rest-pipeline";
import {
  OperationRequest,
  XML_CHARKEY,
  RequiredSerializerOptions,
  OperationArguments,
  XML_ATTRKEY,
  OperationSpec,
  DictionaryMapper
} from "./interfaces";
import { MapperTypeNames } from "./serializer";
import { getPathStringFromParameter } from "./interfaceHelpers";
import {
  getOperationArgumentValueFromParameter,
  getOperationRequestInfo
} from "./operationHelpers";

/**
 * The programmatic identifier of the mappingPolicy.
 */
export const mappingPolicyName = "mappingPolicy";

/**
 * This policy handles assembling the request body and headers using
 * an OperationSpec and OperationArguments on the request.
 * It will not conduct the final stringification of the body, as that
 * will be handled by serializationPolicy.
 */
export function mappingPolicy(): PipelinePolicy {
  return {
    name: mappingPolicyName,
    async sendRequest(request: OperationRequest, next: SendRequest): Promise<PipelineResponse> {
      const operationInfo = getOperationRequestInfo(request);
      const operationSpec = operationInfo?.operationSpec;
      const operationArguments = operationInfo?.operationArguments;
      if (operationSpec && operationArguments) {
        serializeHeaders(request, operationArguments, operationSpec);
        serializeRequestBody(request, operationArguments, operationSpec);
      }
      return next(request);
    }
  };
}

/**
 * @internal
 */
export function serializeHeaders(
  request: OperationRequest,
  operationArguments: OperationArguments,
  operationSpec: OperationSpec
): void {
  if (operationSpec.headerParameters) {
    for (const headerParameter of operationSpec.headerParameters) {
      let headerValue = getOperationArgumentValueFromParameter(operationArguments, headerParameter);
      if (headerValue !== null && headerValue !== undefined) {
        headerValue = operationSpec.serializer.serialize(
          headerParameter.mapper,
          headerValue,
          getPathStringFromParameter(headerParameter)
        );
        const headerCollectionPrefix = (headerParameter.mapper as DictionaryMapper)
          .headerCollectionPrefix;
        if (headerCollectionPrefix) {
          for (const key of Object.keys(headerValue)) {
            request.headers.set(headerCollectionPrefix + key, headerValue[key]);
          }
        } else {
          request.headers.set(
            headerParameter.mapper.serializedName || getPathStringFromParameter(headerParameter),
            headerValue
          );
        }
      }
    }
  }
  const customHeaders = operationArguments.options?.requestOptions?.customHeaders;
  if (customHeaders) {
    for (const customHeaderName of Object.keys(customHeaders)) {
      request.headers.set(customHeaderName, customHeaders[customHeaderName]);
    }
  }
}

/**
 * @internal
 */
export function serializeRequestBody(
  request: OperationRequest,
  operationArguments: OperationArguments,
  operationSpec: OperationSpec
): void {
  const serializerOptions = operationArguments.options?.serializerOptions;
  const updatedOptions: RequiredSerializerOptions = {
    xml: {
      rootName: serializerOptions?.xml.rootName ?? "",
      includeRoot: serializerOptions?.xml.includeRoot ?? false,
      xmlCharKey: serializerOptions?.xml.xmlCharKey ?? XML_CHARKEY
    }
  };

  if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
    request.body = getOperationArgumentValueFromParameter(
      operationArguments,
      operationSpec.requestBody
    );

    const bodyMapper = operationSpec.requestBody.mapper;
    const {
      required,
      serializedName,
      xmlName,
      xmlElementName,
      xmlNamespace,
      xmlNamespacePrefix,
      nullable
    } = bodyMapper;
    const typeName = bodyMapper.type.name;

    try {
      if (
        (request.body !== undefined && request.body !== null) ||
        (nullable && request.body === null) ||
        required
      ) {
        const requestBodyParameterPathString: string = getPathStringFromParameter(
          operationSpec.requestBody
        );
        request.body = operationSpec.serializer.serialize(
          bodyMapper,
          request.body,
          requestBodyParameterPathString,
          updatedOptions
        );

        const isStream = typeName === MapperTypeNames.Stream;

        if (operationSpec.isXML) {
          const xmlnsKey = xmlNamespacePrefix ? `xmlns:${xmlNamespacePrefix}` : "xmlns";
          const value = getXmlValueWithNamespace(
            xmlNamespace,
            xmlnsKey,
            typeName,
            request.body,
            updatedOptions
          );

          if (typeName === MapperTypeNames.Sequence) {
            request.body = prepareXMLRootList(
              value,
              xmlElementName || xmlName || serializedName!,
              xmlnsKey,
              xmlNamespace
            );
          } else if (!isStream) {
            request.body = value;
          }
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
  } else if (operationSpec.formDataParameters && operationSpec.formDataParameters.length > 0) {
    request.formData = {};
    for (const formDataParameter of operationSpec.formDataParameters) {
      const formDataParameterValue = getOperationArgumentValueFromParameter(
        operationArguments,
        formDataParameter
      );
      if (formDataParameterValue !== undefined && formDataParameterValue !== null) {
        const formDataParameterPropertyName: string =
          formDataParameter.mapper.serializedName || getPathStringFromParameter(formDataParameter);
        request.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(
          formDataParameter.mapper,
          formDataParameterValue,
          getPathStringFromParameter(formDataParameter),
          updatedOptions
        );
      }
    }
  }
}

/**
 * Adds an xml namespace to the xml serialized object if needed, otherwise it just returns the value itself
 */
function getXmlValueWithNamespace(
  xmlNamespace: string | undefined,
  xmlnsKey: string,
  typeName: string,
  serializedValue: any,
  options: RequiredSerializerOptions
): any {
  // Composite and Sequence schemas already got their root namespace set during serialization
  // We just need to add xmlns to the other schema types
  if (xmlNamespace && !["Composite", "Sequence", "Dictionary"].includes(typeName)) {
    const result: any = {};
    result[options.xml.xmlCharKey] = serializedValue;
    result[XML_ATTRKEY] = { [xmlnsKey]: xmlNamespace };
    return result;
  }

  return serializedValue;
}

function prepareXMLRootList(
  obj: any,
  elementName: string,
  xmlNamespaceKey?: string,
  xmlNamespace?: string
): any {
  if (!Array.isArray(obj)) {
    obj = [obj];
  }
  if (!xmlNamespaceKey || !xmlNamespace) {
    return { [elementName]: obj };
  }

  const result = { [elementName]: obj };
  result[XML_ATTRKEY] = { [xmlNamespaceKey]: xmlNamespace };
  return result;
}
