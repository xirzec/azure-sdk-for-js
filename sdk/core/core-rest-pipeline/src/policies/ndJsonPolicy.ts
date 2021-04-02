// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";

/**
 * The programmatic identifier of the ndJsonPolicy.
 */
export const ndJsonPolicyName = "ndJsonPolicy";

/**
 * ndJsonPolicy is a policy used to control keep alive settings for every request.
 * Insert after 'mappingPolicy'. Not compatible with 'serializationPolicy'
 */
export function ndJsonPolicy(): PipelinePolicy {
  return {
    name: ndJsonPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const body = request.body;
      if (Array.isArray(body)) {
        request.body = body.map((item) => JSON.stringify(item) + "\n").join("");
      }
      return next(request);
    }
  };
}
