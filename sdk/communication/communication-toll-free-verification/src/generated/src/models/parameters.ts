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
  CampaignBrief as CampaignBriefMapper,
  CampaignBriefAttachment as CampaignBriefAttachmentMapper,
} from "../models/mappers.js";

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/merge-patch+json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String",
    },
  },
};

export const body: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: CampaignBriefMapper,
};

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

export const endpoint: OperationURLParameter = {
  parameterPath: "endpoint",
  mapper: {
    serializedName: "endpoint",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};

export const countryCode: OperationURLParameter = {
  parameterPath: "countryCode",
  mapper: {
    serializedName: "countryCode",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const campaignBriefId: OperationURLParameter = {
  parameterPath: "campaignBriefId",
  mapper: {
    serializedName: "campaignBriefId",
    required: true,
    type: {
      name: "Uuid",
    },
  },
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2023-01-10-preview1",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String",
    },
  },
};

export const skip: OperationQueryParameter = {
  parameterPath: ["options", "skip"],
  mapper: {
    defaultValue: 0,
    serializedName: "skip",
    type: {
      name: "Number",
    },
  },
};

export const top: OperationQueryParameter = {
  parameterPath: ["options", "top"],
  mapper: {
    defaultValue: 100,
    serializedName: "top",
    type: {
      name: "Number",
    },
  },
};

export const contentType1: OperationParameter = {
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

export const id: OperationParameter = {
  parameterPath: "id",
  mapper: CampaignBriefAttachmentMapper,
};

export const typeParam: OperationParameter = {
  parameterPath: "typeParam",
  mapper: CampaignBriefAttachmentMapper,
};

export const fileName: OperationParameter = {
  parameterPath: "fileName",
  mapper: CampaignBriefAttachmentMapper,
};

export const fileSizeInBytes: OperationParameter = {
  parameterPath: ["options", "fileSizeInBytes"],
  mapper: CampaignBriefAttachmentMapper,
};

export const fileType: OperationParameter = {
  parameterPath: "fileType",
  mapper: CampaignBriefAttachmentMapper,
};

export const fileContentBase64: OperationParameter = {
  parameterPath: "fileContentBase64",
  mapper: CampaignBriefAttachmentMapper,
};

export const attachmentId: OperationURLParameter = {
  parameterPath: "attachmentId",
  mapper: {
    serializedName: "attachmentId",
    required: true,
    type: {
      name: "Uuid",
    },
  },
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
