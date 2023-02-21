/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  DeletedBackupInstanceResource,
  DeletedBackupInstancesListOptionalParams,
  DeletedBackupInstancesGetOptionalParams,
  DeletedBackupInstancesGetResponse,
  DeletedBackupInstancesUndeleteOptionalParams
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a DeletedBackupInstances. */
export interface DeletedBackupInstances {
  /**
   * Gets deleted backup instances belonging to a backup vault
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The name of the backup vault.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    vaultName: string,
    options?: DeletedBackupInstancesListOptionalParams
  ): PagedAsyncIterableIterator<DeletedBackupInstanceResource>;
  /**
   * Gets a deleted backup instance with name in a backup vault
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The name of the backup vault.
   * @param backupInstanceName The name of the deleted backup instance
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    options?: DeletedBackupInstancesGetOptionalParams
  ): Promise<DeletedBackupInstancesGetResponse>;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The name of the backup vault.
   * @param backupInstanceName The name of the deleted backup instance
   * @param options The options parameters.
   */
  beginUndelete(
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    options?: DeletedBackupInstancesUndeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The name of the backup vault.
   * @param backupInstanceName The name of the deleted backup instance
   * @param options The options parameters.
   */
  beginUndeleteAndWait(
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    options?: DeletedBackupInstancesUndeleteOptionalParams
  ): Promise<void>;
}