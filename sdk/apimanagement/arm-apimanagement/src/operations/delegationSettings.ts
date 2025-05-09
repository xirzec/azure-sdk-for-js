/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { DelegationSettings } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ApiManagementClient } from "../apiManagementClient.js";
import {
  DelegationSettingsGetEntityTagOptionalParams,
  DelegationSettingsGetEntityTagResponse,
  DelegationSettingsGetOptionalParams,
  DelegationSettingsGetResponse,
  PortalDelegationSettings,
  DelegationSettingsUpdateOptionalParams,
  DelegationSettingsCreateOrUpdateOptionalParams,
  DelegationSettingsCreateOrUpdateResponse,
  DelegationSettingsListSecretsOptionalParams,
  DelegationSettingsListSecretsResponse,
} from "../models/index.js";

/** Class containing DelegationSettings operations. */
export class DelegationSettingsImpl implements DelegationSettings {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class DelegationSettings class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Gets the entity state (Etag) version of the DelegationSettings.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    options?: DelegationSettingsGetEntityTagOptionalParams,
  ): Promise<DelegationSettingsGetEntityTagResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, options },
      getEntityTagOperationSpec,
    );
  }

  /**
   * Get Delegation Settings for the Portal.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    options?: DelegationSettingsGetOptionalParams,
  ): Promise<DelegationSettingsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, options },
      getOperationSpec,
    );
  }

  /**
   * Update Delegation settings.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param parameters Update Delegation settings.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serviceName: string,
    ifMatch: string,
    parameters: PortalDelegationSettings,
    options?: DelegationSettingsUpdateOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, ifMatch, parameters, options },
      updateOperationSpec,
    );
  }

  /**
   * Create or Update Delegation settings.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param parameters Create or update parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    parameters: PortalDelegationSettings,
    options?: DelegationSettingsCreateOrUpdateOptionalParams,
  ): Promise<DelegationSettingsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, parameters, options },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Gets the secret validation key of the DelegationSettings.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  listSecrets(
    resourceGroupName: string,
    serviceName: string,
    options?: DelegationSettingsListSecretsOptionalParams,
  ): Promise<DelegationSettingsListSecretsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, options },
      listSecretsOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getEntityTagOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/portalsettings/delegation",
  httpMethod: "HEAD",
  responses: {
    200: {
      headersMapper: Mappers.DelegationSettingsGetEntityTagHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/portalsettings/delegation",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PortalDelegationSettings,
      headersMapper: Mappers.DelegationSettingsGetHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/portalsettings/delegation",
  httpMethod: "PATCH",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters72,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch1,
  ],
  mediaType: "json",
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/portalsettings/delegation",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PortalDelegationSettings,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters72,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch,
  ],
  mediaType: "json",
  serializer,
};
const listSecretsOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/portalsettings/delegation/listSecrets",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.PortalSettingValidationKeyContract,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
