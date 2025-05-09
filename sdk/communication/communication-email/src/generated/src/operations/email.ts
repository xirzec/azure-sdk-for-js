/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Email } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { EmailRestApiClient } from "../emailRestApiClient.js";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl.js";
import {
  EmailGetSendResultOptionalParams,
  EmailGetSendResultResponse,
  EmailMessage,
  EmailSendOptionalParams,
  EmailSendResponse
} from "../models/index.js";

/** Class containing Email operations. */
export class EmailImpl implements Email {
  private readonly client: EmailRestApiClient;

  /**
   * Initialize a new instance of the class Email class.
   * @param client Reference to the service client
   */
  constructor(client: EmailRestApiClient) {
    this.client = client;
  }

  /**
   * Gets the status of the email send operation.
   * @param operationId ID of the long running operation (GUID) returned from a previous call to send
   *                    email
   * @param options The options parameters.
   */
  getSendResult(
    operationId: string,
    options?: EmailGetSendResultOptionalParams
  ): Promise<EmailGetSendResultResponse> {
    return this.client.sendOperationRequest(
      { operationId, options },
      getSendResultOperationSpec
    );
  }

  /**
   * Queues an email message to be sent to one or more recipients
   * @param message Message payload for sending an email
   * @param options The options parameters.
   */
  async beginSend(
    message: EmailMessage,
    options?: EmailSendOptionalParams
  ): Promise<
    PollerLike<PollOperationState<EmailSendResponse>, EmailSendResponse>
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<EmailSendResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { message, options },
      sendOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Queues an email message to be sent to one or more recipients
   * @param message Message payload for sending an email
   * @param options The options parameters.
   */
  async beginSendAndWait(
    message: EmailMessage,
    options?: EmailSendOptionalParams
  ): Promise<EmailSendResponse> {
    const poller = await this.beginSend(message, options);
    return poller.pollUntilDone();
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getSendResultOperationSpec: coreClient.OperationSpec = {
  path: "/emails/operations/{operationId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EmailSendResult,
      headersMapper: Mappers.EmailGetSendResultHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
      headersMapper: Mappers.EmailGetSendResultExceptionHeaders
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.operationId],
  headerParameters: [Parameters.accept],
  serializer
};
const sendOperationSpec: coreClient.OperationSpec = {
  path: "/emails:send",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.EmailSendResult,
      headersMapper: Mappers.EmailSendHeaders
    },
    201: {
      bodyMapper: Mappers.EmailSendResult,
      headersMapper: Mappers.EmailSendHeaders
    },
    202: {
      bodyMapper: Mappers.EmailSendResult,
      headersMapper: Mappers.EmailSendHeaders
    },
    204: {
      bodyMapper: Mappers.EmailSendResult,
      headersMapper: Mappers.EmailSendHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
      headersMapper: Mappers.EmailSendExceptionHeaders
    }
  },
  requestBody: Parameters.message,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.operationId1,
    Parameters.clientRequestId
  ],
  mediaType: "json",
  serializer
};
