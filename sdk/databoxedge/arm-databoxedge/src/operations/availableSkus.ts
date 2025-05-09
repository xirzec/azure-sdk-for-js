/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { AvailableSkus } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DataBoxEdgeManagementClient } from "../dataBoxEdgeManagementClient.js";
import {
  DataBoxEdgeSku,
  AvailableSkusListNextOptionalParams,
  AvailableSkusListOptionalParams,
  AvailableSkusListResponse,
  AvailableSkusListNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing AvailableSkus operations. */
export class AvailableSkusImpl implements AvailableSkus {
  private readonly client: DataBoxEdgeManagementClient;

  /**
   * Initialize a new instance of the class AvailableSkus class.
   * @param client Reference to the service client
   */
  constructor(client: DataBoxEdgeManagementClient) {
    this.client = client;
  }

  /**
   * List all the available Skus and information related to them.
   * @param options The options parameters.
   */
  public list(
    options?: AvailableSkusListOptionalParams
  ): PagedAsyncIterableIterator<DataBoxEdgeSku> {
    const iter = this.listPagingAll(options);
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
        return this.listPagingPage(options, settings);
      }
    };
  }

  private async *listPagingPage(
    options?: AvailableSkusListOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<DataBoxEdgeSku[]> {
    let result: AvailableSkusListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    options?: AvailableSkusListOptionalParams
  ): AsyncIterableIterator<DataBoxEdgeSku> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * List all the available Skus and information related to them.
   * @param options The options parameters.
   */
  private _list(
    options?: AvailableSkusListOptionalParams
  ): Promise<AvailableSkusListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: AvailableSkusListNextOptionalParams
  ): Promise<AvailableSkusListNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataBoxEdge/availableSkus",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataBoxEdgeSkuList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataBoxEdgeSkuList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
