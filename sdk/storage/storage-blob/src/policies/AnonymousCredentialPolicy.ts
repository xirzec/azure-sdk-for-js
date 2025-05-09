// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RequestPolicy,
  RequestPolicyOptionsLike as RequestPolicyOptions,
} from "@azure/core-http-compat";
import { CredentialPolicy } from "./CredentialPolicy.js";

/**
 * AnonymousCredentialPolicy is used with HTTP(S) requests that read public resources
 * or for use with Shared Access Signatures (SAS).
 */
export class AnonymousCredentialPolicy extends CredentialPolicy {
  /**
   * Creates an instance of AnonymousCredentialPolicy.
   * @param nextPolicy -
   * @param options -
   */
  // The base class has a protected constructor. Adding a public one to enable constructing of this class.
  /* eslint-disable-next-line @typescript-eslint/no-useless-constructor*/
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }
}
