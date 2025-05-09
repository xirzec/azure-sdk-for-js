/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter,
} from "@azure/core-client";
import {
  WebApplicationFirewallPolicy as WebApplicationFirewallPolicyMapper,
  TagsObject as TagsObjectMapper,
  CheckNameAvailabilityInput as CheckNameAvailabilityInputMapper,
  FrontDoor as FrontDoorMapper,
  ValidateCustomDomainInput as ValidateCustomDomainInputMapper,
  CustomHttpsConfiguration as CustomHttpsConfigurationMapper,
  PurgeParameters as PurgeParametersMapper,
  RulesEngine as RulesEngineMapper,
  Profile as ProfileMapper,
  ProfileUpdateModel as ProfileUpdateModelMapper,
  Experiment as ExperimentMapper,
  ExperimentUpdateModel as ExperimentUpdateModelMapper,
} from "../models/mappers.js";

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String",
    },
  },
};

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};

export const resourceGroupName: OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z0-9_\\-\\(\\)\\.]*[^\\.]$"),
      MaxLength: 80,
      MinLength: 1,
    },
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const subscriptionId: OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    serializedName: "subscriptionId",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2024-02-01",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String",
    },
  },
};

export const policyName: OperationURLParameter = {
  parameterPath: "policyName",
  mapper: {
    constraints: {
      MaxLength: 128,
    },
    serializedName: "policyName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String",
    },
  },
};

export const parameters: OperationParameter = {
  parameterPath: "parameters",
  mapper: WebApplicationFirewallPolicyMapper,
};

export const parameters1: OperationParameter = {
  parameterPath: "parameters",
  mapper: TagsObjectMapper,
};

export const nextLink: OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};

export const checkFrontDoorNameAvailabilityInput: OperationParameter = {
  parameterPath: "checkFrontDoorNameAvailabilityInput",
  mapper: CheckNameAvailabilityInputMapper,
};

export const apiVersion1: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2021-06-01",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String",
    },
  },
};

export const frontDoorName: OperationURLParameter = {
  parameterPath: "frontDoorName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z0-9]+([-a-zA-Z0-9]?[a-zA-Z0-9])*$"),
      MaxLength: 64,
      MinLength: 5,
    },
    serializedName: "frontDoorName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const frontDoorParameters: OperationParameter = {
  parameterPath: "frontDoorParameters",
  mapper: FrontDoorMapper,
};

export const customDomainProperties: OperationParameter = {
  parameterPath: "customDomainProperties",
  mapper: ValidateCustomDomainInputMapper,
};

export const frontendEndpointName: OperationURLParameter = {
  parameterPath: "frontendEndpointName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z0-9]+(-*[a-zA-Z0-9])*$"),
      MaxLength: 255,
      MinLength: 1,
    },
    serializedName: "frontendEndpointName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const customHttpsConfiguration: OperationParameter = {
  parameterPath: "customHttpsConfiguration",
  mapper: CustomHttpsConfigurationMapper,
};

export const contentFilePaths: OperationParameter = {
  parameterPath: "contentFilePaths",
  mapper: PurgeParametersMapper,
};

export const rulesEngineName: OperationURLParameter = {
  parameterPath: "rulesEngineName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z0-9]+(-*[a-zA-Z0-9])*$"),
      MaxLength: 90,
      MinLength: 1,
    },
    serializedName: "rulesEngineName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const rulesEngineParameters: OperationParameter = {
  parameterPath: "rulesEngineParameters",
  mapper: RulesEngineMapper,
};

export const apiVersion2: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2019-11-01",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String",
    },
  },
};

export const profileName: OperationURLParameter = {
  parameterPath: "profileName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z0-9_\\-\\(\\)\\.]*[^\\.]$"),
    },
    serializedName: "profileName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters2: OperationParameter = {
  parameterPath: "parameters",
  mapper: ProfileMapper,
};

export const parameters3: OperationParameter = {
  parameterPath: "parameters",
  mapper: ProfileUpdateModelMapper,
};

export const experimentName: OperationURLParameter = {
  parameterPath: "experimentName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z0-9_\\-\\(\\)\\.]*[^\\.]$"),
    },
    serializedName: "experimentName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters4: OperationParameter = {
  parameterPath: "parameters",
  mapper: ExperimentMapper,
};

export const parameters5: OperationParameter = {
  parameterPath: "parameters",
  mapper: ExperimentUpdateModelMapper,
};

export const endDateTimeUTC: OperationQueryParameter = {
  parameterPath: ["options", "endDateTimeUTC"],
  mapper: {
    serializedName: "endDateTimeUTC",
    type: {
      name: "String",
    },
  },
};

export const country: OperationQueryParameter = {
  parameterPath: ["options", "country"],
  mapper: {
    serializedName: "country",
    type: {
      name: "String",
    },
  },
};

export const aggregationInterval: OperationQueryParameter = {
  parameterPath: "aggregationInterval",
  mapper: {
    serializedName: "aggregationInterval",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const startDateTimeUTC: OperationQueryParameter = {
  parameterPath: "startDateTimeUTC",
  mapper: {
    serializedName: "startDateTimeUTC",
    required: true,
    type: {
      name: "DateTime",
    },
  },
};

export const endDateTimeUTC1: OperationQueryParameter = {
  parameterPath: "endDateTimeUTC",
  mapper: {
    serializedName: "endDateTimeUTC",
    required: true,
    type: {
      name: "DateTime",
    },
  },
};

export const aggregationInterval1: OperationQueryParameter = {
  parameterPath: "aggregationInterval",
  mapper: {
    serializedName: "aggregationInterval",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const timeseriesType: OperationQueryParameter = {
  parameterPath: "timeseriesType",
  mapper: {
    serializedName: "timeseriesType",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const endpoint: OperationQueryParameter = {
  parameterPath: ["options", "endpoint"],
  mapper: {
    serializedName: "endpoint",
    type: {
      name: "String",
    },
  },
};
