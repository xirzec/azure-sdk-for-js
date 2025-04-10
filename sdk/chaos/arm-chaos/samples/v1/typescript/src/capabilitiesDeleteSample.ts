/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete a Capability that extends a Target resource.
 *
 * @summary Delete a Capability that extends a Target resource.
 * x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/DeleteCapability.json
 */
async function deleteACapabilityThatExtendsAVirtualMachineTargetResource() {
  const subscriptionId =
    process.env["CHAOS_SUBSCRIPTION_ID"] ||
    "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const resourceGroupName = process.env["CHAOS_RESOURCE_GROUP"] || "exampleRG";
  const parentProviderNamespace = "Microsoft.Compute";
  const parentResourceType = "virtualMachines";
  const parentResourceName = "exampleVM";
  const targetName = "Microsoft-VirtualMachine";
  const capabilityName = "Shutdown-1.0";
  const credential = new DefaultAzureCredential();
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.capabilities.delete(
    resourceGroupName,
    parentProviderNamespace,
    parentResourceType,
    parentResourceName,
    targetName,
    capabilityName,
  );
  console.log(result);
}

async function main() {
  deleteACapabilityThatExtendsAVirtualMachineTargetResource();
}

main().catch(console.error);
