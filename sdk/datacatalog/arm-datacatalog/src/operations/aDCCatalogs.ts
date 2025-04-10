/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ADCCatalogs } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DataCatalogRestClient } from "../dataCatalogRestClient.js";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl.js";
import {
  ADCCatalogsListtByResourceGroupOptionalParams,
  ADCCatalogsListtByResourceGroupResponse,
  ADCCatalog,
  ADCCatalogsCreateOrUpdateOptionalParams,
  ADCCatalogsCreateOrUpdateResponse,
  ADCCatalogsGetOptionalParams,
  ADCCatalogsGetResponse,
  ADCCatalogsDeleteOptionalParams,
  ADCCatalogsUpdateOptionalParams,
  ADCCatalogsUpdateResponse
} from "../models/index.js";

/** Class containing ADCCatalogs operations. */
export class ADCCatalogsImpl implements ADCCatalogs {
  private readonly client: DataCatalogRestClient;

  /**
   * Initialize a new instance of the class ADCCatalogs class.
   * @param client Reference to the service client
   */
  constructor(client: DataCatalogRestClient) {
    this.client = client;
  }

  /**
   * The List catalogs in Resource Group operation lists all the Azure Data Catalogs available under the
   * given resource group.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param options The options parameters.
   */
  listtByResourceGroup(
    resourceGroupName: string,
    options?: ADCCatalogsListtByResourceGroupOptionalParams
  ): Promise<ADCCatalogsListtByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listtByResourceGroupOperationSpec
    );
  }

  /**
   * The Create Azure Data Catalog service operation creates a new data catalog service with the
   * specified parameters. If the specific service already exists, then any patchable properties will be
   * updated and any immutable properties will remain unchanged.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param catalogName The name of the data catalog in the specified subscription and resource group.
   * @param properties Properties supplied to the Create or Update a data catalog.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    catalogName: string,
    properties: ADCCatalog,
    options?: ADCCatalogsCreateOrUpdateOptionalParams
  ): Promise<ADCCatalogsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, catalogName, properties, options },
      createOrUpdateOperationSpec
    );
  }

  /**
   * The Get Azure Data Catalog Service operation retrieves a json representation of the data catalog.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param catalogName The name of the data catalog in the specified subscription and resource group.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    catalogName: string,
    options?: ADCCatalogsGetOptionalParams
  ): Promise<ADCCatalogsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, catalogName, options },
      getOperationSpec
    );
  }

  /**
   * The Delete Azure Data Catalog Service operation deletes an existing data catalog.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param catalogName The name of the data catalog in the specified subscription and resource group.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    catalogName: string,
    options?: ADCCatalogsDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
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
      { resourceGroupName, catalogName, options },
      deleteOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * The Delete Azure Data Catalog Service operation deletes an existing data catalog.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param catalogName The name of the data catalog in the specified subscription and resource group.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    catalogName: string,
    options?: ADCCatalogsDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      catalogName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * The Update Azure Data Catalog Service operation can be used to update the existing deployment. The
   * update call only supports the properties listed in the PATCH body.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param catalogName The name of the data catalog in the specified subscription and resource group.
   * @param properties Properties supplied to the Update a data catalog.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    catalogName: string,
    properties: ADCCatalog,
    options?: ADCCatalogsUpdateOptionalParams
  ): Promise<ADCCatalogsUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, catalogName, properties, options },
      updateOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listtByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ADCCatalogsListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs/{catalogName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ADCCatalog
    },
    201: {
      bodyMapper: Mappers.ADCCatalog
    }
  },
  requestBody: Parameters.properties,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.catalogName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs/{catalogName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ADCCatalog
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.catalogName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs/{catalogName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.catalogName
  ],
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs/{catalogName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ADCCatalog
    }
  },
  requestBody: Parameters.properties,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.catalogName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
