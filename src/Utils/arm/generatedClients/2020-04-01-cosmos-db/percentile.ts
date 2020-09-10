/* 
  AUTOGENERATED FILE
  Do not manually edit
  Run "npm run generateARMClients" to regenerate
*/

import { armRequest } from "../../request";
import * as Types from "./types";
import { configContext } from "../../../../ConfigContext";
const apiVersion = "2020-04-01";

/* Retrieves the metrics determined by the given filter for the given database account. This url is only for PBS and Replication Latency data */
export async function listMetrics(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string
): Promise<Types.PercentileMetricListResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/percentile/metrics`;
  return armRequest({ host: configContext.ARM_ENDPOINT, path, method: "GET", apiVersion });
}