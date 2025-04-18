/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { ConfigurationAssignmentsWithinSubscription } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MaintenanceManagementClient } from "../maintenanceManagementClient.js";
import {
  ConfigurationAssignment,
  ConfigurationAssignmentsWithinSubscriptionListOptionalParams,
  ConfigurationAssignmentsWithinSubscriptionListResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing ConfigurationAssignmentsWithinSubscription operations. */
export class ConfigurationAssignmentsWithinSubscriptionImpl
  implements ConfigurationAssignmentsWithinSubscription
{
  private readonly client: MaintenanceManagementClient;

  /**
   * Initialize a new instance of the class ConfigurationAssignmentsWithinSubscription class.
   * @param client Reference to the service client
   */
  constructor(client: MaintenanceManagementClient) {
    this.client = client;
  }

  /**
   * Get configuration assignment within a subscription
   * @param options The options parameters.
   */
  public list(
    options?: ConfigurationAssignmentsWithinSubscriptionListOptionalParams,
  ): PagedAsyncIterableIterator<ConfigurationAssignment> {
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
      },
    };
  }

  private async *listPagingPage(
    options?: ConfigurationAssignmentsWithinSubscriptionListOptionalParams,
    _settings?: PageSettings,
  ): AsyncIterableIterator<ConfigurationAssignment[]> {
    let result: ConfigurationAssignmentsWithinSubscriptionListResponse;
    result = await this._list(options);
    yield result.value || [];
  }

  private async *listPagingAll(
    options?: ConfigurationAssignmentsWithinSubscriptionListOptionalParams,
  ): AsyncIterableIterator<ConfigurationAssignment> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Get configuration assignment within a subscription
   * @param options The options parameters.
   */
  private _list(
    options?: ConfigurationAssignmentsWithinSubscriptionListOptionalParams,
  ): Promise<ConfigurationAssignmentsWithinSubscriptionListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/configurationAssignments",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListConfigurationAssignmentsResult,
    },
    default: {
      bodyMapper: Mappers.MaintenanceError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
