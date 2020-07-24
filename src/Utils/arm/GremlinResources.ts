/* 
  AUTOGENERATED FILE
  Do not manually edit
  Run "npm run generateARMClients" to regenerate
*/

import * as Types from "./types";

/* Lists the Gremlin databases under an existing Azure Cosmos DB database account. */
export async function listGremlinDatabases(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string
): Promise<Types.GremlinDatabaseListResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/gremlinDatabases`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "get" }).then(response => response.json());
}

/* Gets the Gremlin databases under an existing Azure Cosmos DB database account with the provided name. */
export async function getGremlinDatabase(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  databaseName: string
): Promise<Types.GremlinDatabaseGetResults> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/gremlinDatabases/${databaseName}`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "get" }).then(response => response.json());
}

/* Create or update an Azure Cosmos DB Gremlin database */
export async function createUpdateGremlinDatabase(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  body: Types.GremlinDatabaseCreateUpdateParameters
): Promise<Types.GremlinDatabaseGetResults | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/gremlinDatabases/${databaseName}`;
  return window
    .fetch(this.baseUrl + this.basePath + path, { method: "put", body: JSON.stringify(body) })
    .then(response => response.json());
}

/* Deletes an existing Azure Cosmos DB Gremlin database. */
export async function deleteGremlinDatabase(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  databaseName: string
): Promise<void | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/gremlinDatabases/${databaseName}`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "delete" }).then(response => response.json());
}

/* Gets the RUs per second of the Gremlin database under an existing Azure Cosmos DB database account with the provided name. */
export async function getGremlinDatabaseThroughput(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  databaseName: string
): Promise<Types.ThroughputSettingsGetResults> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/gremlinDatabases/${databaseName}/throughputSettings/default`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "get" }).then(response => response.json());
}

/* Update RUs per second of an Azure Cosmos DB Gremlin database */
export async function updateGremlinDatabaseThroughput(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  body: Types.ThroughputSettingsUpdateParameters
): Promise<Types.ThroughputSettingsGetResults | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/gremlinDatabases/${databaseName}/throughputSettings/default`;
  return window
    .fetch(this.baseUrl + this.basePath + path, { method: "put", body: JSON.stringify(body) })
    .then(response => response.json());
}

/* Lists the Gremlin graph under an existing Azure Cosmos DB database account. */
export async function listGremlinGraphs(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  databaseName: string
): Promise<Types.GremlinGraphListResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/gremlinDatabases/${databaseName}/graphs`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "get" }).then(response => response.json());
}

/* Gets the Gremlin graph under an existing Azure Cosmos DB database account. */
export async function getGremlinGraph(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string
): Promise<Types.GremlinGraphGetResults> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/gremlinDatabases/${databaseName}/graphs/${graphName}`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "get" }).then(response => response.json());
}

/* Create or update an Azure Cosmos DB Gremlin graph */
export async function createUpdateGremlinGraph(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  body: Types.GremlinGraphCreateUpdateParameters
): Promise<Types.GremlinGraphGetResults | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/gremlinDatabases/${databaseName}/graphs/${graphName}`;
  return window
    .fetch(this.baseUrl + this.basePath + path, { method: "put", body: JSON.stringify(body) })
    .then(response => response.json());
}

/* Deletes an existing Azure Cosmos DB Gremlin graph. */
export async function deleteGremlinGraph(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string
): Promise<void | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/gremlinDatabases/${databaseName}/graphs/${graphName}`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "delete" }).then(response => response.json());
}

/* Gets the Gremlin graph throughput under an existing Azure Cosmos DB database account with the provided name. */
export async function getGremlinGraphThroughput(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string
): Promise<Types.ThroughputSettingsGetResults> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/gremlinDatabases/${databaseName}/graphs/${graphName}/throughputSettings/default`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "get" }).then(response => response.json());
}

/* Update RUs per second of an Azure Cosmos DB Gremlin graph */
export async function updateGremlinGraphThroughput(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  body: Types.ThroughputSettingsUpdateParameters
): Promise<Types.ThroughputSettingsGetResults | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/gremlinDatabases/${databaseName}/graphs/${graphName}/throughputSettings/default`;
  return window
    .fetch(this.baseUrl + this.basePath + path, { method: "put", body: JSON.stringify(body) })
    .then(response => response.json());
}