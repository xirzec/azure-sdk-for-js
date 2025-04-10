/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  Maintenance,
  MaintenancesListOptionalParams,
  MaintenancesReadOptionalParams,
  MaintenancesReadResponse,
  MaintenancesUpdateOptionalParams,
  MaintenancesUpdateResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Maintenances. */
export interface Maintenances {
  /**
   * List maintenances.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serverName The name of the server.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    serverName: string,
    options?: MaintenancesListOptionalParams,
  ): PagedAsyncIterableIterator<Maintenance>;
  /**
   * Read maintenance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serverName The name of the server.
   * @param maintenanceName The name of the maintenance.
   * @param options The options parameters.
   */
  read(
    resourceGroupName: string,
    serverName: string,
    maintenanceName: string,
    options?: MaintenancesReadOptionalParams,
  ): Promise<MaintenancesReadResponse>;
  /**
   * Update maintenances.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serverName The name of the server.
   * @param maintenanceName The name of the maintenance.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    serverName: string,
    maintenanceName: string,
    options?: MaintenancesUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<MaintenancesUpdateResponse>,
      MaintenancesUpdateResponse
    >
  >;
  /**
   * Update maintenances.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serverName The name of the server.
   * @param maintenanceName The name of the maintenance.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    serverName: string,
    maintenanceName: string,
    options?: MaintenancesUpdateOptionalParams,
  ): Promise<MaintenancesUpdateResponse>;
}
