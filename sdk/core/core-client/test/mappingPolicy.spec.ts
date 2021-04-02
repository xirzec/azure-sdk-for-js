// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { createSerializer, MapperTypeNames } from "../src";
import { serializeHeaders } from "../src/mappingPolicy";
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
});
