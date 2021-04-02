// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import {
  createHttpHeaders,
  createPipelineRequest,
  ndJsonPolicy,
  PipelineResponse,
  SendRequest
} from "@azure/core-rest-pipeline";
import { createSerializer, MapperTypeNames } from "../src";
import { serializeHeaders, serializeRequestBody } from "../src/mappingPolicy";

describe("mappingPolicy", function() {
  describe("serializeHeaders()", () => {
    it("should respect customHeaders", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
      serializeHeaders(
        httpRequest,
        {
          options: {
            requestOptions: {
              customHeaders: {
                "content-type": "custom/type"
              }
            }
          }
        },
        {
          httpMethod: "POST",
          mediaType: "text",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.String
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(),
          headerParameters: [
            {
              parameterPath: ["options", "contentType"],
              mapper: {
                defaultValue: "text/plain",
                isConstant: true,
                serializedName: "Content-Type",
                type: {
                  name: "String"
                }
              }
            }
          ]
        }
      );
      assert.strictEqual(httpRequest.headers.get("Content-Type"), "custom/type");
    });
  });

  describe("serializeBody()", function() {
    it("should serialize a JSON Array request body compatibly with ndJsonPpolicy", async function() {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: [{ A: 1 }, { B: 2 }]
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.Sequence,
                element: {
                  type: {
                    name: MapperTypeNames.Composite,
                    modelProperties: {
                      A: { type: { name: "Number" }, serializedName: "a" },
                      B: { type: { name: "Number" }, serializedName: "b" }
                    }
                  }
                }
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer()
        }
      );
      assert.deepEqual(httpRequest.body as unknown, [{ a: 1 }, { b: 2 }]);

      const successResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request: httpRequest,
        status: 200
      };
      const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
      next.resolves(successResponse);
      const ndJson = ndJsonPolicy();
      const response = await ndJson.sendRequest(httpRequest, next);
      assert.strictEqual(response.request.body, `{"a":1}\n{"b":2}\n`);
    });
  });
});
