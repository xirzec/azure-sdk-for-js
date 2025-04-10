/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Schedules } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DevCenterClient } from "../devCenterClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  Schedule,
  SchedulesListByPoolNextOptionalParams,
  SchedulesListByPoolOptionalParams,
  SchedulesListByPoolResponse,
  SchedulesGetOptionalParams,
  SchedulesGetResponse,
  SchedulesCreateOrUpdateOptionalParams,
  SchedulesCreateOrUpdateResponse,
  ScheduleUpdate,
  SchedulesUpdateOptionalParams,
  SchedulesUpdateResponse,
  SchedulesDeleteOptionalParams,
  SchedulesDeleteResponse,
  SchedulesListByPoolNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Schedules operations. */
export class SchedulesImpl implements Schedules {
  private readonly client: DevCenterClient;

  /**
   * Initialize a new instance of the class Schedules class.
   * @param client Reference to the service client
   */
  constructor(client: DevCenterClient) {
    this.client = client;
  }

  /**
   * Lists schedules for a pool
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param poolName Name of the pool.
   * @param options The options parameters.
   */
  public listByPool(
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: SchedulesListByPoolOptionalParams,
  ): PagedAsyncIterableIterator<Schedule> {
    const iter = this.listByPoolPagingAll(
      resourceGroupName,
      projectName,
      poolName,
      options,
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
        return this.listByPoolPagingPage(
          resourceGroupName,
          projectName,
          poolName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByPoolPagingPage(
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: SchedulesListByPoolOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<Schedule[]> {
    let result: SchedulesListByPoolResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByPool(
        resourceGroupName,
        projectName,
        poolName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByPoolNext(
        resourceGroupName,
        projectName,
        poolName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByPoolPagingAll(
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: SchedulesListByPoolOptionalParams,
  ): AsyncIterableIterator<Schedule> {
    for await (const page of this.listByPoolPagingPage(
      resourceGroupName,
      projectName,
      poolName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Lists schedules for a pool
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param poolName Name of the pool.
   * @param options The options parameters.
   */
  private _listByPool(
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: SchedulesListByPoolOptionalParams,
  ): Promise<SchedulesListByPoolResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, poolName, options },
      listByPoolOperationSpec,
    );
  }

  /**
   * Gets a schedule resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param poolName Name of the pool.
   * @param scheduleName The name of the schedule that uniquely identifies it.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    options?: SchedulesGetOptionalParams,
  ): Promise<SchedulesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, poolName, scheduleName, options },
      getOperationSpec,
    );
  }

  /**
   * Creates or updates a Schedule.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param poolName Name of the pool.
   * @param scheduleName The name of the schedule that uniquely identifies it.
   * @param body Represents a scheduled task
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    body: Schedule,
    options?: SchedulesCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<SchedulesCreateOrUpdateResponse>,
      SchedulesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<SchedulesCreateOrUpdateResponse> => {
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
      args: {
        resourceGroupName,
        projectName,
        poolName,
        scheduleName,
        body,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      SchedulesCreateOrUpdateResponse,
      OperationState<SchedulesCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a Schedule.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param poolName Name of the pool.
   * @param scheduleName The name of the schedule that uniquely identifies it.
   * @param body Represents a scheduled task
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    body: Schedule,
    options?: SchedulesCreateOrUpdateOptionalParams,
  ): Promise<SchedulesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      projectName,
      poolName,
      scheduleName,
      body,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Partially updates a Scheduled.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param poolName Name of the pool.
   * @param scheduleName The name of the schedule that uniquely identifies it.
   * @param body Represents a scheduled task.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    body: ScheduleUpdate,
    options?: SchedulesUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<SchedulesUpdateResponse>,
      SchedulesUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<SchedulesUpdateResponse> => {
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
      args: {
        resourceGroupName,
        projectName,
        poolName,
        scheduleName,
        body,
        options,
      },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      SchedulesUpdateResponse,
      OperationState<SchedulesUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Partially updates a Scheduled.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param poolName Name of the pool.
   * @param scheduleName The name of the schedule that uniquely identifies it.
   * @param body Represents a scheduled task.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    body: ScheduleUpdate,
    options?: SchedulesUpdateOptionalParams,
  ): Promise<SchedulesUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      projectName,
      poolName,
      scheduleName,
      body,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes a Scheduled.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param poolName Name of the pool.
   * @param scheduleName The name of the schedule that uniquely identifies it.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    options?: SchedulesDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<SchedulesDeleteResponse>,
      SchedulesDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<SchedulesDeleteResponse> => {
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
      args: { resourceGroupName, projectName, poolName, scheduleName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      SchedulesDeleteResponse,
      OperationState<SchedulesDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes a Scheduled.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param poolName Name of the pool.
   * @param scheduleName The name of the schedule that uniquely identifies it.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    options?: SchedulesDeleteOptionalParams,
  ): Promise<SchedulesDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      projectName,
      poolName,
      scheduleName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByPoolNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param poolName Name of the pool.
   * @param nextLink The nextLink from the previous successful call to the ListByPool method.
   * @param options The options parameters.
   */
  private _listByPoolNext(
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    nextLink: string,
    options?: SchedulesListByPoolNextOptionalParams,
  ): Promise<SchedulesListByPoolNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, poolName, nextLink, options },
      listByPoolNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByPoolOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}/schedules",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ScheduleListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName,
    Parameters.poolName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Schedule,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName,
    Parameters.poolName,
    Parameters.scheduleName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Schedule,
    },
    201: {
      bodyMapper: Mappers.Schedule,
    },
    202: {
      bodyMapper: Mappers.Schedule,
    },
    204: {
      bodyMapper: Mappers.Schedule,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.body16,
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName,
    Parameters.poolName,
    Parameters.scheduleName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Schedule,
    },
    201: {
      bodyMapper: Mappers.Schedule,
    },
    202: {
      bodyMapper: Mappers.Schedule,
    },
    204: {
      bodyMapper: Mappers.Schedule,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.body17,
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName,
    Parameters.poolName,
    Parameters.scheduleName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.SchedulesDeleteHeaders,
    },
    201: {
      headersMapper: Mappers.SchedulesDeleteHeaders,
    },
    202: {
      headersMapper: Mappers.SchedulesDeleteHeaders,
    },
    204: {
      headersMapper: Mappers.SchedulesDeleteHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName,
    Parameters.poolName,
    Parameters.scheduleName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByPoolNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ScheduleListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.projectName,
    Parameters.poolName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
