/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { BackupsUnderAccount } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { NetAppManagementClient } from "../netAppManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  BackupsMigrationRequest,
  BackupsUnderAccountMigrateBackupsOptionalParams,
  BackupsUnderAccountMigrateBackupsResponse,
} from "../models/index.js";

/** Class containing BackupsUnderAccount operations. */
export class BackupsUnderAccountImpl implements BackupsUnderAccount {
  private readonly client: NetAppManagementClient;

  /**
   * Initialize a new instance of the class BackupsUnderAccount class.
   * @param client Reference to the service client
   */
  constructor(client: NetAppManagementClient) {
    this.client = client;
  }

  /**
   * Migrate the backups under a NetApp account to backup vault
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param body Migrate backups under an account payload supplied in the body of the operation.
   * @param options The options parameters.
   */
  async beginMigrateBackups(
    resourceGroupName: string,
    accountName: string,
    body: BackupsMigrationRequest,
    options?: BackupsUnderAccountMigrateBackupsOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<BackupsUnderAccountMigrateBackupsResponse>,
      BackupsUnderAccountMigrateBackupsResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<BackupsUnderAccountMigrateBackupsResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, accountName, body, options },
      spec: migrateBackupsOperationSpec,
    });
    const poller = await createHttpPoller<
      BackupsUnderAccountMigrateBackupsResponse,
      OperationState<BackupsUnderAccountMigrateBackupsResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Migrate the backups under a NetApp account to backup vault
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param body Migrate backups under an account payload supplied in the body of the operation.
   * @param options The options parameters.
   */
  async beginMigrateBackupsAndWait(
    resourceGroupName: string,
    accountName: string,
    body: BackupsMigrationRequest,
    options?: BackupsUnderAccountMigrateBackupsOptionalParams,
  ): Promise<BackupsUnderAccountMigrateBackupsResponse> {
    const poller = await this.beginMigrateBackups(
      resourceGroupName,
      accountName,
      body,
      options,
    );
    return poller.pollUntilDone();
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const migrateBackupsOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/migrateBackups",
  httpMethod: "POST",
  responses: {
    200: {
      headersMapper: Mappers.BackupsUnderAccountMigrateBackupsHeaders,
    },
    201: {
      headersMapper: Mappers.BackupsUnderAccountMigrateBackupsHeaders,
    },
    202: {
      headersMapper: Mappers.BackupsUnderAccountMigrateBackupsHeaders,
    },
    204: {
      headersMapper: Mappers.BackupsUnderAccountMigrateBackupsHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.body39,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
