/* 
  AUTOGENERATED FILE
  Do not manually edit
  Run "npm run generateARMClients" to regenerate
*/

import * as Types from "./types";

/* Lists the Cassandra keyspaces under an existing Azure Cosmos DB database account. */
export async function listCassandraKeyspaces(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string
): Promise<Types.CassandraKeyspaceListResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/cassandraKeyspaces`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "get" }).then(response => response.json());
}

/* Gets the Cassandra keyspaces under an existing Azure Cosmos DB database account with the provided name. */
export async function getCassandraKeyspace(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string
): Promise<Types.CassandraKeyspaceGetResults> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/cassandraKeyspaces/${keyspaceName}`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "get" }).then(response => response.json());
}

/* Create or update an Azure Cosmos DB Cassandra keyspace */
export async function createUpdateCassandraKeyspace(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  body: Types.CassandraKeyspaceCreateUpdateParameters
): Promise<Types.CassandraKeyspaceGetResults | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/cassandraKeyspaces/${keyspaceName}`;
  return window
    .fetch(this.baseUrl + this.basePath + path, { method: "put", body: JSON.stringify(body) })
    .then(response => response.json());
}

/* Deletes an existing Azure Cosmos DB Cassandra keyspace. */
export async function deleteCassandraKeyspace(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string
): Promise<void | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/cassandraKeyspaces/${keyspaceName}`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "delete" }).then(response => response.json());
}

/* Gets the RUs per second of the Cassandra Keyspace under an existing Azure Cosmos DB database account with the provided name. */
export async function getCassandraKeyspaceThroughput(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string
): Promise<Types.ThroughputSettingsGetResults> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/cassandraKeyspaces/${keyspaceName}/throughputSettings/default`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "get" }).then(response => response.json());
}

/* Update RUs per second of an Azure Cosmos DB Cassandra Keyspace */
export async function updateCassandraKeyspaceThroughput(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  body: Types.ThroughputSettingsUpdateParameters
): Promise<Types.ThroughputSettingsGetResults | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/cassandraKeyspaces/${keyspaceName}/throughputSettings/default`;
  return window
    .fetch(this.baseUrl + this.basePath + path, { method: "put", body: JSON.stringify(body) })
    .then(response => response.json());
}

/* Lists the Cassandra table under an existing Azure Cosmos DB database account. */
export async function listCassandraTables(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string
): Promise<Types.CassandraTableListResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/cassandraKeyspaces/${keyspaceName}/tables`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "get" }).then(response => response.json());
}

/* Gets the Cassandra table under an existing Azure Cosmos DB database account. */
export async function getCassandraTable(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string
): Promise<Types.CassandraTableGetResults> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/cassandraKeyspaces/${keyspaceName}/tables/${tableName}`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "get" }).then(response => response.json());
}

/* Create or update an Azure Cosmos DB Cassandra Table */
export async function createUpdateCassandraTable(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  body: Types.CassandraTableCreateUpdateParameters
): Promise<Types.CassandraTableGetResults | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/cassandraKeyspaces/${keyspaceName}/tables/${tableName}`;
  return window
    .fetch(this.baseUrl + this.basePath + path, { method: "put", body: JSON.stringify(body) })
    .then(response => response.json());
}

/* Deletes an existing Azure Cosmos DB Cassandra table. */
export async function deleteCassandraTable(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string
): Promise<void | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/cassandraKeyspaces/${keyspaceName}/tables/${tableName}`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "delete" }).then(response => response.json());
}

/* Gets the RUs per second of the Cassandra table under an existing Azure Cosmos DB database account with the provided name. */
export async function getCassandraTableThroughput(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string
): Promise<Types.ThroughputSettingsGetResults> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/cassandraKeyspaces/${keyspaceName}/tables/${tableName}/throughputSettings/default`;
  return window.fetch(this.baseUrl + this.basePath + path, { method: "get" }).then(response => response.json());
}

/* Update RUs per second of an Azure Cosmos DB Cassandra table */
export async function updateCassandraTableThroughput(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  body: Types.ThroughputSettingsUpdateParameters
): Promise<Types.ThroughputSettingsGetResults | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/cassandraKeyspaces/${keyspaceName}/tables/${tableName}/throughputSettings/default`;
  return window
    .fetch(this.baseUrl + this.basePath + path, { method: "put", body: JSON.stringify(body) })
    .then(response => response.json());
}