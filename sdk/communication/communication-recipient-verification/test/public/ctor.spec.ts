// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import type { Context } from "mocha";
import { RecipientVerificationClient } from "../../src";
import { assert } from "chai";
import { createMockToken } from "./utils/recordedClient";

describe("RecipientVerificationClient - constructor", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("successfully instantiates with valid connection string", function () {
    const client = new RecipientVerificationClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, RecipientVerificationClient);
  });

  it("throws with invalid connection string", function () {
    assert.throws(() => {
      new RecipientVerificationClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", function () {
    const client = new RecipientVerificationClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, RecipientVerificationClient);
  });

  it("successfully instantiates with with endpoint and managed identity", function (this: Context) {
    const client = new RecipientVerificationClient(endpoint, createMockToken());
    assert.instanceOf(client, RecipientVerificationClient);
  });
});
