/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Changes } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AzureChangeAnalysisManagementClient } from "../azureChangeAnalysisManagementClient.js";
import {
  Change,
  ChangesListChangesByResourceGroupNextOptionalParams,
  ChangesListChangesByResourceGroupOptionalParams,
  ChangesListChangesByResourceGroupResponse,
  ChangesListChangesBySubscriptionNextOptionalParams,
  ChangesListChangesBySubscriptionOptionalParams,
  ChangesListChangesBySubscriptionResponse,
  ChangesListChangesByResourceGroupNextResponse,
  ChangesListChangesBySubscriptionNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Changes operations. */
export class ChangesImpl implements Changes {
  private readonly client: AzureChangeAnalysisManagementClient;

  /**
   * Initialize a new instance of the class Changes class.
   * @param client Reference to the service client
   */
  constructor(client: AzureChangeAnalysisManagementClient) {
    this.client = client;
  }

  /**
   * List the changes of a resource group within the specified time range. Customer data will always be
   * masked.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param startTime Specifies the start time of the changes request.
   * @param endTime Specifies the end time of the changes request.
   * @param options The options parameters.
   */
  public listChangesByResourceGroup(
    resourceGroupName: string,
    startTime: Date,
    endTime: Date,
    options?: ChangesListChangesByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<Change> {
    const iter = this.listChangesByResourceGroupPagingAll(
      resourceGroupName,
      startTime,
      endTime,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listChangesByResourceGroupPagingPage(
          resourceGroupName,
          startTime,
          endTime,
          options,
          settings
        );
      }
    };
  }

  private async *listChangesByResourceGroupPagingPage(
    resourceGroupName: string,
    startTime: Date,
    endTime: Date,
    options?: ChangesListChangesByResourceGroupOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<Change[]> {
    let result: ChangesListChangesByResourceGroupResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listChangesByResourceGroup(
        resourceGroupName,
        startTime,
        endTime,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listChangesByResourceGroupNext(
        resourceGroupName,
        startTime,
        endTime,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listChangesByResourceGroupPagingAll(
    resourceGroupName: string,
    startTime: Date,
    endTime: Date,
    options?: ChangesListChangesByResourceGroupOptionalParams
  ): AsyncIterableIterator<Change> {
    for await (const page of this.listChangesByResourceGroupPagingPage(
      resourceGroupName,
      startTime,
      endTime,
      options
    )) {
      yield* page;
    }
  }

  /**
   * List the changes of a subscription within the specified time range. Customer data will always be
   * masked.
   * @param startTime Specifies the start time of the changes request.
   * @param endTime Specifies the end time of the changes request.
   * @param options The options parameters.
   */
  public listChangesBySubscription(
    startTime: Date,
    endTime: Date,
    options?: ChangesListChangesBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<Change> {
    const iter = this.listChangesBySubscriptionPagingAll(
      startTime,
      endTime,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listChangesBySubscriptionPagingPage(
          startTime,
          endTime,
          options,
          settings
        );
      }
    };
  }

  private async *listChangesBySubscriptionPagingPage(
    startTime: Date,
    endTime: Date,
    options?: ChangesListChangesBySubscriptionOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<Change[]> {
    let result: ChangesListChangesBySubscriptionResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listChangesBySubscription(
        startTime,
        endTime,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listChangesBySubscriptionNext(
        startTime,
        endTime,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listChangesBySubscriptionPagingAll(
    startTime: Date,
    endTime: Date,
    options?: ChangesListChangesBySubscriptionOptionalParams
  ): AsyncIterableIterator<Change> {
    for await (const page of this.listChangesBySubscriptionPagingPage(
      startTime,
      endTime,
      options
    )) {
      yield* page;
    }
  }

  /**
   * List the changes of a resource group within the specified time range. Customer data will always be
   * masked.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param startTime Specifies the start time of the changes request.
   * @param endTime Specifies the end time of the changes request.
   * @param options The options parameters.
   */
  private _listChangesByResourceGroup(
    resourceGroupName: string,
    startTime: Date,
    endTime: Date,
    options?: ChangesListChangesByResourceGroupOptionalParams
  ): Promise<ChangesListChangesByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, startTime, endTime, options },
      listChangesByResourceGroupOperationSpec
    );
  }

  /**
   * List the changes of a subscription within the specified time range. Customer data will always be
   * masked.
   * @param startTime Specifies the start time of the changes request.
   * @param endTime Specifies the end time of the changes request.
   * @param options The options parameters.
   */
  private _listChangesBySubscription(
    startTime: Date,
    endTime: Date,
    options?: ChangesListChangesBySubscriptionOptionalParams
  ): Promise<ChangesListChangesBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { startTime, endTime, options },
      listChangesBySubscriptionOperationSpec
    );
  }

  /**
   * ListChangesByResourceGroupNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param startTime Specifies the start time of the changes request.
   * @param endTime Specifies the end time of the changes request.
   * @param nextLink The nextLink from the previous successful call to the ListChangesByResourceGroup
   *                 method.
   * @param options The options parameters.
   */
  private _listChangesByResourceGroupNext(
    resourceGroupName: string,
    startTime: Date,
    endTime: Date,
    nextLink: string,
    options?: ChangesListChangesByResourceGroupNextOptionalParams
  ): Promise<ChangesListChangesByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, startTime, endTime, nextLink, options },
      listChangesByResourceGroupNextOperationSpec
    );
  }

  /**
   * ListChangesBySubscriptionNext
   * @param startTime Specifies the start time of the changes request.
   * @param endTime Specifies the end time of the changes request.
   * @param nextLink The nextLink from the previous successful call to the ListChangesBySubscription
   *                 method.
   * @param options The options parameters.
   */
  private _listChangesBySubscriptionNext(
    startTime: Date,
    endTime: Date,
    nextLink: string,
    options?: ChangesListChangesBySubscriptionNextOptionalParams
  ): Promise<ChangesListChangesBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { startTime, endTime, nextLink, options },
      listChangesBySubscriptionNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listChangesByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ChangeAnalysis/changes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ChangeList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.skipToken,
    Parameters.startTime,
    Parameters.endTime
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listChangesBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.ChangeAnalysis/changes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ChangeList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.skipToken,
    Parameters.startTime,
    Parameters.endTime
  ],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listChangesByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ChangeList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.skipToken,
    Parameters.startTime,
    Parameters.endTime
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listChangesBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ChangeList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.skipToken,
    Parameters.startTime,
    Parameters.endTime
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
