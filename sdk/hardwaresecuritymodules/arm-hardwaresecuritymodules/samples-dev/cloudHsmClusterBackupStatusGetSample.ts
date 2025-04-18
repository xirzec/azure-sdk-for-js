/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AzureHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the backup operation status of the specified Cloud HSM Cluster
 *
 * @summary Gets the backup operation status of the specified Cloud HSM Cluster
 * x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/preview/2024-06-30-preview/examples/CloudHsmCluster_Backup_Pending_MaximumSet_Gen.json
 */
async function cloudHsmClusterGetBackupStatusMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["HARDWARESECURITYMODULES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["HARDWARESECURITYMODULES_RESOURCE_GROUP"] || "rgcloudhsm";
  const cloudHsmClusterName = "chsm1";
  const jobId = "572a45927fc240e1ac075de27371680b";
  const credential = new DefaultAzureCredential();
  const client = new AzureHSMResourceProvider(credential, subscriptionId);
  const result = await client.cloudHsmClusterBackupStatus.get(
    resourceGroupName,
    cloudHsmClusterName,
    jobId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cloudHsmClusterGetBackupStatusMaximumSetGen();
}

main().catch(console.error);
