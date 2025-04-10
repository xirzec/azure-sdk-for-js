// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetPropertiesResponse,
  GetStatisticsResponse,
  ServiceProperties,
  SetPropertiesOptions,
  SetPropertiesResponse,
} from "./generatedModels.js";
import type {
  InternalClientPipelineOptions,
  OperationOptions,
  ServiceClientOptions,
} from "@azure/core-client";
import type {
  ListTableItemsOptions,
  TableItem,
  TableQueryOptions,
  TableServiceClientOptions,
} from "./models.js";
import type { NamedKeyCredential, SASCredential, TokenCredential } from "@azure/core-auth";
import { isNamedKeyCredential, isSASCredential, isTokenCredential } from "@azure/core-auth";
import { COSMOS_SCOPE, STORAGE_SCOPE, TablesLoggingAllowedHeaderNames } from "./utils/constants.js";
import type { Service, Table } from "./generated/index.js";
import {
  injectSecondaryEndpointHeader,
  tablesSecondaryEndpointPolicy,
} from "./secondaryEndpointPolicy.js";
import { parseXML, stringifyXML } from "@azure/core-xml";

import { GeneratedClient } from "./generated/generatedClient.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TableItemResultPage } from "./models.js";
import { apiVersionPolicy } from "./utils/apiVersionPolicy.js";
import { getClientParamsFromConnectionString } from "./utils/connectionString.js";
import { handleTableAlreadyExists } from "./utils/errorHelpers.js";
import { isCredential } from "./utils/isCredential.js";
import { logger } from "./logger.js";
import { setTokenChallengeAuthenticationPolicy } from "./utils/challengeAuthenticationUtils.js";
import { tablesNamedKeyCredentialPolicy } from "./tablesNamedCredentialPolicy.js";
import { tablesSASTokenPolicy } from "./tablesSASTokenPolicy.js";
import { tracingClient } from "./utils/tracing.js";
import { isCosmosEndpoint } from "./utils/isCosmosEndpoint.js";

/**
 * A TableServiceClient represents a Client to the Azure Tables service allowing you
 * to perform operations on the tables and the entities.
 */
export class TableServiceClient {
  /**
   * Table Account URL
   */
  public url: string;
  /**
   * Represents a pipeline for making a HTTP request to a URL.
   * Pipelines can have multiple policies to manage manipulating each request before and after it is made to the server.
   */
  public pipeline: Pipeline;
  private table: Table;
  private service: Service;

  /**
   * Creates a new instance of the TableServiceClient class.
   *
   * @param url - The URL of the service account that is the target of the desired operation., such as "https://myaccount.table.core.windows.net".
   * @param credential - NamedKeyCredential | SASCredential used to authenticate requests. Only Supported for Node
   * @param options - Options to configure the HTTP pipeline.
   *
   * ### Example using an account name/key:
   *
   * ```ts snippet:ReadmeSampleCreateClient_NamedKeyCredential
   * import { AzureNamedKeyCredential, TableServiceClient } from "@azure/data-tables";
   *
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   *
   * const credential = new AzureNamedKeyCredential(account, accountKey);
   * const serviceClient = new TableServiceClient(
   *   `https://${account}.table.core.windows.net`,
   *   credential,
   * );
   * ```
   */
  constructor(url: string, credential: NamedKeyCredential, options?: TableServiceClientOptions);
  /**
   * Creates a new instance of the TableServiceClient class.
   *
   * @param url - The URL of the service account that is the target of the desired operation., such as "https://myaccount.table.core.windows.net".
   * @param credential - SASCredential used to authenticate requests
   * @param options - Options to configure the HTTP pipeline.
   *
   * ### Example using a SAS Token.
   *
   * ```ts snippet:ReadmeSampleCreateClient_SASToken
   * import { TableServiceClient, AzureSASCredential } from "@azure/data-tables";
   *
   * const account = "<account name>";
   * const sas = "<service Shared Access Signature Token>";
   *
   * const serviceClientWithSAS = new TableServiceClient(
   *   `https://${account}.table.core.windows.net`,
   *   new AzureSASCredential(sas),
   * );
   * ```
   */
  constructor(url: string, credential: SASCredential, options?: TableServiceClientOptions);
  /**
   * Creates a new instance of the TableServiceClient class.
   *
   * @param url - The URL of the service account that is the target of the desired operation., such as "https://myaccount.table.core.windows.net".
   * @param credential - Azure Active Directory credential used to authenticate requests
   * @param options - Options to configure the HTTP pipeline.
   *
   * ### Example using an Azure Active Directory credential:
   *
   * ```ts snippet:ReadmeSampleCreateClient_TokenCredential
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { TableServiceClient } from "@azure/data-tables";
   *
   * const credential = new DefaultAzureCredential();
   * const account = "<account name>";
   *
   * const clientWithAAD = new TableServiceClient(
   *   `https://${account}.table.core.windows.net`,
   *   credential,
   * );
   * ```
   */
  constructor(url: string, credential: TokenCredential, options?: TableServiceClientOptions);
  /**
   * Creates a new instance of the TableServiceClient class.
   *
   * @param url - The URL of the service account that is the target of the desired operation., such as
   *              "https://myaccount.table.core.windows.net". You can append a SAS,
   *              such as "https://myaccount.table.core.windows.net?sasString".
   * @param options - Options to configure the HTTP pipeline.
   * Example appending a SAS token:
   *
   * ```ts snippet:ReadmeSampleCreateClient_SASTokenURL
   * import { TableServiceClient } from "@azure/data-tables";
   *
   * const account = "<account name>";
   * const sasToken = "<SAS token>";
   * const tableName = "<tableName>";
   *
   * const serviceClientWithSASURL = new TableServiceClient(
   *   `https://${account}.table.core.windows.net?${sasToken}`,
   * );
   * ```
   */
  constructor(url: string, options?: TableServiceClientOptions);
  constructor(
    url: string,
    credentialOrOptions?:
      | NamedKeyCredential
      | SASCredential
      | TokenCredential
      | TableServiceClientOptions,
    options?: TableServiceClientOptions,
  ) {
    this.url = url;
    const isCosmos = isCosmosEndpoint(this.url);
    const credential = isCredential(credentialOrOptions) ? credentialOrOptions : undefined;
    const clientOptions =
      (!isCredential(credentialOrOptions) ? credentialOrOptions : options) || {};

    const internalPipelineOptions: ServiceClientOptions & InternalClientPipelineOptions = {
      ...clientOptions,
      endpoint: clientOptions.endpoint || this.url,
      loggingOptions: {
        logger: logger.info,
        additionalAllowedHeaderNames: [...TablesLoggingAllowedHeaderNames],
      },
      deserializationOptions: {
        parseXML,
      },
      serializationOptions: {
        stringifyXML,
      },
    };
    const client = new GeneratedClient(this.url, internalPipelineOptions);
    client.pipeline.addPolicy(tablesSecondaryEndpointPolicy);

    if (isNamedKeyCredential(credential)) {
      client.pipeline.addPolicy(tablesNamedKeyCredentialPolicy(credential));
    } else if (isSASCredential(credential)) {
      client.pipeline.addPolicy(tablesSASTokenPolicy(credential));
    }

    if (isTokenCredential(credential)) {
      const scope = isCosmos ? COSMOS_SCOPE : STORAGE_SCOPE;
      setTokenChallengeAuthenticationPolicy(client.pipeline, credential, scope);
    }

    if (options?.version) {
      client.pipeline.addPolicy(apiVersionPolicy(options.version));
    }

    this.pipeline = client.pipeline;
    this.table = client.table;
    this.service = client.service;
  }

  /**
   * Retrieves statistics related to replication for the Table service. It is only available on the
   * secondary location endpoint when read-access geo-redundant replication is enabled for the account.
   * @param options - The options parameters.
   */
  public async getStatistics(options: OperationOptions = {}): Promise<GetStatisticsResponse> {
    return tracingClient.withSpan("TableServiceClient.getStatistics", options, (updatedOptions) =>
      this.service.getStatistics(injectSecondaryEndpointHeader(updatedOptions)),
    );
  }

  /**
   * Gets the properties of an account's Table service, including properties for Analytics and CORS
   * (Cross-Origin Resource Sharing) rules.
   * @param options - The options parameters.
   */
  public getProperties(options: OperationOptions = {}): Promise<GetPropertiesResponse> {
    return tracingClient.withSpan("TableServiceClient.getProperties", options, (updatedOptions) =>
      this.service.getProperties(updatedOptions),
    );
  }

  /**
   * Sets properties for an account's Table service endpoint, including properties for Analytics and CORS
   * (Cross-Origin Resource Sharing) rules.
   * @param properties - The Table Service properties.
   * @param options - The options parameters.
   */
  public setProperties(
    properties: ServiceProperties,
    options: SetPropertiesOptions = {},
  ): Promise<SetPropertiesResponse> {
    return tracingClient.withSpan("TableServiceClient.setProperties", options, (updatedOptions) =>
      this.service.setProperties(properties, updatedOptions),
    );
  }

  /**
   * Creates a new table under the given account.
   * @param name - The name of the table.
   * @param options - The options parameters.
   */
  public createTable(name: string, options: OperationOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "TableServiceClient.createTable",
      options,
      async (updatedOptions) => {
        try {
          await this.table.create({ name }, updatedOptions);
        } catch (e: any) {
          handleTableAlreadyExists(e, { ...updatedOptions, logger, tableName: name });
        }
      },
    );
  }

  /**
   * Operation permanently deletes the specified table.
   * @param name - The name of the table.
   * @param options - The options parameters.
   */
  public deleteTable(name: string, options: OperationOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "TableServiceClient.deleteTable",
      options,
      async (updatedOptions) => {
        try {
          await this.table.delete(name, updatedOptions);
        } catch (e: any) {
          if (e.statusCode === 404) {
            logger.info("TableServiceClient.deleteTable: Table doesn't exist");
          } else {
            throw e;
          }
        }
      },
    );
  }

  /**
   * Queries tables under the given account.
   * @param options - The options parameters.
   */
  public listTables(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListTableItemsOptions,
  ): PagedAsyncIterableIterator<TableItem, TableItemResultPage> {
    const iter = this.listTablesAll(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings) => {
        const pageOptions: InternalListTablesOptions = {
          ...options,
          queryOptions: { ...options?.queryOptions, top: settings?.maxPageSize },
        };

        if (settings?.continuationToken) {
          pageOptions.continuationToken = settings.continuationToken;
        }

        return this.listTablesPage(pageOptions);
      },
    };
  }

  private async *listTablesAll(
    options?: InternalListTablesOptions,
  ): AsyncIterableIterator<TableItem> {
    const firstPage = await this._listTables(options);
    const { continuationToken } = firstPage;
    yield* firstPage;
    if (continuationToken) {
      const optionsWithContinuation: InternalListTablesOptions = {
        ...options,
        continuationToken,
      };
      for await (const page of this.listTablesPage(optionsWithContinuation)) {
        yield* page;
      }
    }
  }

  private async *listTablesPage(
    options: InternalListTablesOptions = {},
  ): AsyncIterableIterator<TableItemResultPage> {
    let result = await tracingClient.withSpan(
      "TableServiceClient.listTablesPage",
      options,
      (updatedOptions) => this._listTables(updatedOptions),
    );

    yield result;

    while (result.continuationToken) {
      const optionsWithContinuation: InternalListTablesOptions = {
        ...options,
        continuationToken: result.continuationToken,
      };
      result = await tracingClient.withSpan(
        "TableServiceClient.listTablesPage",
        optionsWithContinuation,
        async (updatedOptions, span) => {
          span.setAttribute("continuationToken", updatedOptions.continuationToken);
          return this._listTables(updatedOptions);
        },
      );
      yield result;
    }
  }

  private async _listTables(options: InternalListTablesOptions = {}): Promise<TableItemResultPage> {
    const { continuationToken: nextTableName, ...listOptions } = options;
    const { xMsContinuationNextTableName: continuationToken, value = [] } = await this.table.query({
      ...listOptions,
      nextTableName,
    });
    return Object.assign([...value], { continuationToken });
  }

  /**
   *
   * Creates an instance of TableServiceClient from connection string.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                           [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                           Account connection string example -
   *                           `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                           SAS connection string example -
   *                           `BlobEndpoint=https://myaccount.table.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param options - Options to configure the HTTP pipeline.
   * @returns A new TableServiceClient from the given connection string.
   */
  public static fromConnectionString(
    connectionString: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: TableServiceClientOptions,
  ): TableServiceClient {
    const {
      url,
      options: clientOptions,
      credential,
    } = getClientParamsFromConnectionString(connectionString, options);

    if (credential) {
      return new TableServiceClient(url, credential, clientOptions);
    } else {
      return new TableServiceClient(url, clientOptions);
    }
  }
}

type InternalListTablesOptions = ListTableItemsOptions & {
  queryOptions?: TableQueryOptions & { top?: number };
  /**
   * A table query continuation token from a previous call.
   */
  continuationToken?: string;
};
