/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ComponentLinkedStorageAccountsOperations } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ApplicationInsightsManagementClient } from "../applicationInsightsManagementClient.js";
import {
  StorageType,
  ComponentLinkedStorageAccountsGetOptionalParams,
  ComponentLinkedStorageAccountsGetResponse,
  ComponentLinkedStorageAccounts,
  ComponentLinkedStorageAccountsCreateAndUpdateOptionalParams,
  ComponentLinkedStorageAccountsCreateAndUpdateResponse,
  ComponentLinkedStorageAccountsPatch,
  ComponentLinkedStorageAccountsUpdateOptionalParams,
  ComponentLinkedStorageAccountsUpdateResponse,
  ComponentLinkedStorageAccountsDeleteOptionalParams,
} from "../models/index.js";

/** Class containing ComponentLinkedStorageAccountsOperations operations. */
export class ComponentLinkedStorageAccountsOperationsImpl
  implements ComponentLinkedStorageAccountsOperations
{
  private readonly client: ApplicationInsightsManagementClient;

  /**
   * Initialize a new instance of the class ComponentLinkedStorageAccountsOperations class.
   * @param client Reference to the service client
   */
  constructor(client: ApplicationInsightsManagementClient) {
    this.client = client;
  }

  /**
   * Returns the current linked storage settings for an Application Insights component.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the Application Insights component resource.
   * @param storageType The type of the Application Insights component data source for the linked storage
   *                    account.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    storageType: StorageType,
    options?: ComponentLinkedStorageAccountsGetOptionalParams,
  ): Promise<ComponentLinkedStorageAccountsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, storageType, options },
      getOperationSpec,
    );
  }

  /**
   * Replace current linked storage account for an Application Insights component.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the Application Insights component resource.
   * @param storageType The type of the Application Insights component data source for the linked storage
   *                    account.
   * @param linkedStorageAccountsProperties Properties that need to be specified to update linked storage
   *                                        accounts for an Application Insights component.
   * @param options The options parameters.
   */
  createAndUpdate(
    resourceGroupName: string,
    resourceName: string,
    storageType: StorageType,
    linkedStorageAccountsProperties: ComponentLinkedStorageAccounts,
    options?: ComponentLinkedStorageAccountsCreateAndUpdateOptionalParams,
  ): Promise<ComponentLinkedStorageAccountsCreateAndUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceName,
        storageType,
        linkedStorageAccountsProperties,
        options,
      },
      createAndUpdateOperationSpec,
    );
  }

  /**
   * Update linked storage accounts for an Application Insights component.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the Application Insights component resource.
   * @param storageType The type of the Application Insights component data source for the linked storage
   *                    account.
   * @param linkedStorageAccountsProperties Properties that need to be specified to update a linked
   *                                        storage accounts for an Application Insights component.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    resourceName: string,
    storageType: StorageType,
    linkedStorageAccountsProperties: ComponentLinkedStorageAccountsPatch,
    options?: ComponentLinkedStorageAccountsUpdateOptionalParams,
  ): Promise<ComponentLinkedStorageAccountsUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceName,
        storageType,
        linkedStorageAccountsProperties,
        options,
      },
      updateOperationSpec,
    );
  }

  /**
   * Delete linked storage accounts for an Application Insights component.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the Application Insights component resource.
   * @param storageType The type of the Application Insights component data source for the linked storage
   *                    account.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    resourceName: string,
    storageType: StorageType,
    options?: ComponentLinkedStorageAccountsDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, storageType, options },
      deleteOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.insights/components/{resourceName}/linkedStorageAccounts/{storageType}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ComponentLinkedStorageAccounts,
    },
    default: {
      bodyMapper: Mappers.ErrorResponseLinkedStorage,
    },
  },
  queryParameters: [Parameters.apiVersion7],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.storageType,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createAndUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.insights/components/{resourceName}/linkedStorageAccounts/{storageType}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ComponentLinkedStorageAccounts,
    },
    default: {
      bodyMapper: Mappers.ErrorResponseLinkedStorage,
    },
  },
  requestBody: Parameters.linkedStorageAccountsProperties,
  queryParameters: [Parameters.apiVersion7],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.storageType,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.insights/components/{resourceName}/linkedStorageAccounts/{storageType}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ComponentLinkedStorageAccounts,
    },
    default: {
      bodyMapper: Mappers.ErrorResponseLinkedStorage,
    },
  },
  requestBody: Parameters.linkedStorageAccountsProperties1,
  queryParameters: [Parameters.apiVersion7],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.storageType,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.insights/components/{resourceName}/linkedStorageAccounts/{storageType}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponseLinkedStorage,
    },
  },
  queryParameters: [Parameters.apiVersion7],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.storageType,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
