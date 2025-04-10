/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  Network,
  ReplicationNetworksListByReplicationFabricsOptionalParams,
  ReplicationNetworksListOptionalParams,
  ReplicationNetworksGetOptionalParams,
  ReplicationNetworksGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ReplicationNetworks. */
export interface ReplicationNetworks {
  /**
   * Lists the networks available for a fabric.
   * @param resourceName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param fabricName Fabric name.
   * @param options The options parameters.
   */
  listByReplicationFabrics(
    resourceName: string,
    resourceGroupName: string,
    fabricName: string,
    options?: ReplicationNetworksListByReplicationFabricsOptionalParams,
  ): PagedAsyncIterableIterator<Network>;
  /**
   * Lists the networks available in a vault.
   * @param resourceName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param options The options parameters.
   */
  list(
    resourceName: string,
    resourceGroupName: string,
    options?: ReplicationNetworksListOptionalParams,
  ): PagedAsyncIterableIterator<Network>;
  /**
   * Gets the details of a network.
   * @param resourceName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param fabricName Server Id.
   * @param networkName Primary network name.
   * @param options The options parameters.
   */
  get(
    resourceName: string,
    resourceGroupName: string,
    fabricName: string,
    networkName: string,
    options?: ReplicationNetworksGetOptionalParams,
  ): Promise<ReplicationNetworksGetResponse>;
}
