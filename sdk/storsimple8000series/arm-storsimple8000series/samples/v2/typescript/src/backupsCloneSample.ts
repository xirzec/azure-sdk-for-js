/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  CloneRequest,
  StorSimple8000SeriesManagementClient
} from "@azure/arm-storsimple8000series";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Clones the backup element as a new volume.
 *
 * @summary Clones the backup element as a new volume.
 * x-ms-original-file: specification/storsimple8000series/resource-manager/Microsoft.StorSimple/stable/2017-06-01/examples/BackupsClone.json
 */
async function backupsClone(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "Device05ForSDKTest";
  const backupName = "880e1774-94a8-4f3e-85e6-a61e6b94a8b7";
  const backupElementName =
    "7e115577-4a3b-4921-bfd4-ee5a1b9bcbb5_0000000000000000";
  const resourceGroupName = "ResourceGroupForSDKTest";
  const managerName = "ManagerForSDKTest1";
  const parameters: CloneRequest = {
    backupElement: {
      elementId:
        "/subscriptions/4385cf00-2d3a-425a-832f-f4285b1c9dce/resourceGroups/ResourceGroupForSDKTest/providers/Microsoft.StorSimple/managers/ManagerForSDKTest1/devices/Device05ForSDKTest/backups/880e1774-94a8-4f3e-85e6-a61e6b94a8b7/elements/7e115577-4a3b-4921-bfd4-ee5a1b9bcbb5_0000000000000000",
      elementName: "7e115577-4a3b-4921-bfd4-ee5a1b9bcbb5_0000000000000000",
      elementType: "managers/devices/backups/elements",
      sizeInBytes: 10737418240,
      volumeContainerId:
        "/subscriptions/4385cf00-2d3a-425a-832f-f4285b1c9dce/resourceGroups/ResourceGroupForSDKTest/providers/Microsoft.StorSimple/managers/ManagerForSDKTest1/devices/Device05ForSDKTest/volumeContainers/volumeContainerForSDKTest",
      volumeName: "Clonedvolume1",
      volumeType: "Tiered"
    },
    targetAccessControlRecordIds: [
      "/subscriptions/4385cf00-2d3a-425a-832f-f4285b1c9dce/resourceGroups/ResourceGroupForSDKTest/providers/Microsoft.StorSimple/managers/ManagerForSDKTest1/accessControlRecords/ACR2"
    ],
    targetDeviceId:
      "/subscriptions/4385cf00-2d3a-425a-832f-f4285b1c9dce/resourceGroups/ResourceGroupForSDKTest/providers/Microsoft.StorSimple/managers/ManagerForSDKTest1/devices/Device05ForSDKTest",
    targetVolumeName: "ClonedClonedvolume1"
  };
  const credential = new DefaultAzureCredential();
  const client = new StorSimple8000SeriesManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.backups.beginCloneAndWait(
    deviceName,
    backupName,
    backupElementName,
    resourceGroupName,
    managerName,
    parameters
  );
  console.log(result);
}

backupsClone().catch(console.error);
