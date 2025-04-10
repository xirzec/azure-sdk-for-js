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
  Archive,
  ArchivesListOptionalParams,
  ArchivesGetOptionalParams,
  ArchivesGetResponse,
  ArchivesCreateOptionalParams,
  ArchivesCreateResponse,
  ArchivesDeleteOptionalParams,
  ArchivesDeleteResponse,
  ArchiveUpdateParameters,
  ArchivesUpdateOptionalParams,
  ArchivesUpdateResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Archives. */
export interface Archives {
  /**
   * Lists all archives for the specified container registry and package type.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param packageType The type of the package resource.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    options?: ArchivesListOptionalParams,
  ): PagedAsyncIterableIterator<Archive>;
  /**
   * Gets the properties of the archive.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param packageType The type of the package resource.
   * @param archiveName The name of the archive resource.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    options?: ArchivesGetOptionalParams,
  ): Promise<ArchivesGetResponse>;
  /**
   * Creates a archive for a container registry with the specified parameters.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param packageType The type of the package resource.
   * @param archiveName The name of the archive resource.
   * @param archiveCreateParameters The parameters for creating a archive.
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveCreateParameters: Archive,
    options?: ArchivesCreateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ArchivesCreateResponse>,
      ArchivesCreateResponse
    >
  >;
  /**
   * Creates a archive for a container registry with the specified parameters.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param packageType The type of the package resource.
   * @param archiveName The name of the archive resource.
   * @param archiveCreateParameters The parameters for creating a archive.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveCreateParameters: Archive,
    options?: ArchivesCreateOptionalParams,
  ): Promise<ArchivesCreateResponse>;
  /**
   * Deletes a archive from a container registry.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param packageType The type of the package resource.
   * @param archiveName The name of the archive resource.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    options?: ArchivesDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ArchivesDeleteResponse>,
      ArchivesDeleteResponse
    >
  >;
  /**
   * Deletes a archive from a container registry.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param packageType The type of the package resource.
   * @param archiveName The name of the archive resource.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    options?: ArchivesDeleteOptionalParams,
  ): Promise<ArchivesDeleteResponse>;
  /**
   * Updates a archive for a container registry with the specified parameters.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param packageType The type of the package resource.
   * @param archiveName The name of the archive resource.
   * @param archiveUpdateParameters The parameters for updating a archive.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveUpdateParameters: ArchiveUpdateParameters,
    options?: ArchivesUpdateOptionalParams,
  ): Promise<ArchivesUpdateResponse>;
}
