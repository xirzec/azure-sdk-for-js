/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  ProactiveDetectionConfigurationsListOptionalParams,
  ProactiveDetectionConfigurationsListResponse,
  ProactiveDetectionConfigurationsGetOptionalParams,
  ProactiveDetectionConfigurationsGetResponse,
  ApplicationInsightsComponentProactiveDetectionConfiguration,
  ProactiveDetectionConfigurationsUpdateOptionalParams,
  ProactiveDetectionConfigurationsUpdateResponse,
} from "../models/index.js";

/** Interface representing a ProactiveDetectionConfigurations. */
export interface ProactiveDetectionConfigurations {
  /**
   * Gets a list of ProactiveDetection configurations of an Application Insights component.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the Application Insights component resource.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    resourceName: string,
    options?: ProactiveDetectionConfigurationsListOptionalParams,
  ): Promise<ProactiveDetectionConfigurationsListResponse>;
  /**
   * Get the ProactiveDetection configuration for this configuration id.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the Application Insights component resource.
   * @param configurationId The ProactiveDetection configuration ID. This is unique within a Application
   *                        Insights component.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    configurationId: string,
    options?: ProactiveDetectionConfigurationsGetOptionalParams,
  ): Promise<ProactiveDetectionConfigurationsGetResponse>;
  /**
   * Update the ProactiveDetection configuration for this configuration id.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the Application Insights component resource.
   * @param configurationId The ProactiveDetection configuration ID. This is unique within a Application
   *                        Insights component.
   * @param proactiveDetectionProperties Properties that need to be specified to update the
   *                                     ProactiveDetection configuration.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    resourceName: string,
    configurationId: string,
    proactiveDetectionProperties: ApplicationInsightsComponentProactiveDetectionConfiguration,
    options?: ProactiveDetectionConfigurationsUpdateOptionalParams,
  ): Promise<ProactiveDetectionConfigurationsUpdateResponse>;
}
