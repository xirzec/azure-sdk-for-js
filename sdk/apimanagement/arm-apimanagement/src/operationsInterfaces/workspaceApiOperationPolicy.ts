/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  PolicyContract,
  WorkspaceApiOperationPolicyListByOperationOptionalParams,
  PolicyIdName,
  WorkspaceApiOperationPolicyGetEntityTagOptionalParams,
  WorkspaceApiOperationPolicyGetEntityTagResponse,
  WorkspaceApiOperationPolicyGetOptionalParams,
  WorkspaceApiOperationPolicyGetResponse,
  WorkspaceApiOperationPolicyCreateOrUpdateOptionalParams,
  WorkspaceApiOperationPolicyCreateOrUpdateResponse,
  WorkspaceApiOperationPolicyDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a WorkspaceApiOperationPolicy. */
export interface WorkspaceApiOperationPolicy {
  /**
   * Get the list of policy configuration at the API Operation level.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param workspaceId Workspace identifier. Must be unique in the current API Management service
   *                    instance.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param operationId Operation identifier within an API. Must be unique in the current API Management
   *                    service instance.
   * @param options The options parameters.
   */
  listByOperation(
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    options?: WorkspaceApiOperationPolicyListByOperationOptionalParams,
  ): PagedAsyncIterableIterator<PolicyContract>;
  /**
   * Gets the entity state (Etag) version of the API operation policy specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param workspaceId Workspace identifier. Must be unique in the current API Management service
   *                    instance.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param operationId Operation identifier within an API. Must be unique in the current API Management
   *                    service instance.
   * @param policyId The identifier of the Policy.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    policyId: PolicyIdName,
    options?: WorkspaceApiOperationPolicyGetEntityTagOptionalParams,
  ): Promise<WorkspaceApiOperationPolicyGetEntityTagResponse>;
  /**
   * Get the policy configuration at the API Operation level.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param workspaceId Workspace identifier. Must be unique in the current API Management service
   *                    instance.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param operationId Operation identifier within an API. Must be unique in the current API Management
   *                    service instance.
   * @param policyId The identifier of the Policy.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    policyId: PolicyIdName,
    options?: WorkspaceApiOperationPolicyGetOptionalParams,
  ): Promise<WorkspaceApiOperationPolicyGetResponse>;
  /**
   * Creates or updates policy configuration for the API Operation level.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param workspaceId Workspace identifier. Must be unique in the current API Management service
   *                    instance.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param operationId Operation identifier within an API. Must be unique in the current API Management
   *                    service instance.
   * @param policyId The identifier of the Policy.
   * @param parameters The policy contents to apply.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    policyId: PolicyIdName,
    parameters: PolicyContract,
    options?: WorkspaceApiOperationPolicyCreateOrUpdateOptionalParams,
  ): Promise<WorkspaceApiOperationPolicyCreateOrUpdateResponse>;
  /**
   * Deletes the policy configuration at the Api Operation.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param workspaceId Workspace identifier. Must be unique in the current API Management service
   *                    instance.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param operationId Operation identifier within an API. Must be unique in the current API Management
   *                    service instance.
   * @param policyId The identifier of the Policy.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    policyId: PolicyIdName,
    ifMatch: string,
    options?: WorkspaceApiOperationPolicyDeleteOptionalParams,
  ): Promise<void>;
}
