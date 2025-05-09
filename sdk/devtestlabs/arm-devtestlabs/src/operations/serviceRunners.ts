/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ServiceRunners } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DevTestLabsClient } from "../devTestLabsClient.js";
import {
  ServiceRunnersGetOptionalParams,
  ServiceRunnersGetResponse,
  ServiceRunner,
  ServiceRunnersCreateOrUpdateOptionalParams,
  ServiceRunnersCreateOrUpdateResponse,
  ServiceRunnersDeleteOptionalParams
} from "../models/index.js";

/** Class containing ServiceRunners operations. */
export class ServiceRunnersImpl implements ServiceRunners {
  private readonly client: DevTestLabsClient;

  /**
   * Initialize a new instance of the class ServiceRunners class.
   * @param client Reference to the service client
   */
  constructor(client: DevTestLabsClient) {
    this.client = client;
  }

  /**
   * Get service runner.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the service runner.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    labName: string,
    name: string,
    options?: ServiceRunnersGetOptionalParams
  ): Promise<ServiceRunnersGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, labName, name, options },
      getOperationSpec
    );
  }

  /**
   * Create or replace an existing service runner.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the service runner.
   * @param serviceRunner A container for a managed identity to execute DevTest lab services.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    labName: string,
    name: string,
    serviceRunner: ServiceRunner,
    options?: ServiceRunnersCreateOrUpdateOptionalParams
  ): Promise<ServiceRunnersCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, labName, name, serviceRunner, options },
      createOrUpdateOperationSpec
    );
  }

  /**
   * Delete service runner.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the service runner.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    labName: string,
    name: string,
    options?: ServiceRunnersDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, labName, name, options },
      deleteOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/servicerunners/{name}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServiceRunner
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.name,
    Parameters.labName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/servicerunners/{name}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ServiceRunner
    },
    201: {
      bodyMapper: Mappers.ServiceRunner
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.serviceRunner,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.name,
    Parameters.labName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/servicerunners/{name}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.name,
    Parameters.labName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
