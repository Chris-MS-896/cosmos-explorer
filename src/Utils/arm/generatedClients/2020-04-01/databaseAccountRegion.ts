/* 
  AUTOGENERATED FILE
  Do not manually edit
  Run "npm run generateARMClients" to regenerate
*/

import { armRequest } from "../../request";
import * as Types from "./types";
import { configContext } from "../../../../ConfigContext";
const apiVersion = "2020-04-01";

/* Retrieves the metrics determined by the given filter for the given database account and region. */
export async function listMetrics(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  region: string
): Promise<Types.MetricListResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/region/${region}/metrics`;
  return armRequest({ host: configContext.ARM_ENDPOINT, path, method: "GET", apiVersion });
}