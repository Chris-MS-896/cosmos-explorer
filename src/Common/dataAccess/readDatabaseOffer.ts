import * as DataModels from "../../Contracts/DataModels";
import { AuthType } from "../../AuthType";
import { DefaultAccountExperienceType } from "../../DefaultAccountExperienceType";
import { HttpHeaders } from "../Constants";
import { RequestOptions } from "@azure/cosmos/dist-esm";
import { client } from "../CosmosClient";
import { getSqlDatabaseThroughput } from "../../Utils/arm/generatedClients/2020-04-01/sqlResources";
import { getMongoDBDatabaseThroughput } from "../../Utils/arm/generatedClients/2020-04-01/mongoDBResources";
import { getCassandraKeyspaceThroughput } from "../../Utils/arm/generatedClients/2020-04-01/cassandraResources";
import { getGremlinDatabaseThroughput } from "../../Utils/arm/generatedClients/2020-04-01/gremlinResources";
import { logConsoleProgress, logConsoleError } from "../../Utils/NotificationConsoleUtils";
import { logError } from "../Logger";
import { readOffers } from "./readOffers";
import { sendNotificationForError } from "./sendNotificationForError";
import { userContext } from "../../UserContext";

export const readDatabaseOffer = async (
  params: DataModels.ReadDatabaseOfferParams
): Promise<DataModels.OfferWithHeaders> => {
  const clearMessage = logConsoleProgress(`Querying offer for database ${params.databaseId}`);
  let offerId = params.offerId;
  if (!offerId) {
    if (
      window.authType === AuthType.AAD &&
      !userContext.useSDKOperations &&
      userContext.defaultExperience !== DefaultAccountExperienceType.Table
    ) {
      try {
        offerId = await getDatabaseOfferIdWithARM(params.databaseId);
      } catch (error) {
        clearMessage();
        if (error.code !== "NotFound") {
          throw new error();
        }
        return undefined;
      }
    } else {
      offerId = await getDatabaseOfferIdWithSDK(params.databaseResourceId);
      if (!offerId) {
        clearMessage();
        return undefined;
      }
    }
  }

  const options: RequestOptions = {
    initialHeaders: {
      [HttpHeaders.populateCollectionThroughputInfo]: true
    }
  };

  try {
    const response = await client()
      .offer(offerId)
      .read(options);
    return (
      response && {
        ...response.resource,
        headers: response.headers
      }
    );
  } catch (error) {
    logConsoleError(`Error while querying offer for database ${params.databaseId}:\n ${JSON.stringify(error)}`);
    logError(JSON.stringify(error), "ReadDatabaseOffer", error.code);
    sendNotificationForError(error);
    throw error;
  } finally {
    clearMessage();
  }
};

const getDatabaseOfferIdWithARM = async (databaseId: string): Promise<string> => {
  let rpResponse;
  const subscriptionId = userContext.subscriptionId;
  const resourceGroup = userContext.resourceGroup;
  const accountName = userContext.databaseAccount.name;
  const defaultExperience = userContext.defaultExperience;
  switch (defaultExperience) {
    case DefaultAccountExperienceType.DocumentDB:
      rpResponse = await getSqlDatabaseThroughput(subscriptionId, resourceGroup, accountName, databaseId);
      break;
    case DefaultAccountExperienceType.MongoDB:
      rpResponse = await getMongoDBDatabaseThroughput(subscriptionId, resourceGroup, accountName, databaseId);
      break;
    case DefaultAccountExperienceType.Cassandra:
      rpResponse = await getCassandraKeyspaceThroughput(subscriptionId, resourceGroup, accountName, databaseId);
      break;
    case DefaultAccountExperienceType.Graph:
      rpResponse = await getGremlinDatabaseThroughput(subscriptionId, resourceGroup, accountName, databaseId);
      break;
    default:
      throw new Error(`Unsupported default experience type: ${defaultExperience}`);
  }

  return rpResponse?.name;
};

const getDatabaseOfferIdWithSDK = async (databaseResourceId: string): Promise<string> => {
  const offers = await readOffers();
  const offer = offers.find(offer => offer.resource === databaseResourceId);
  return offer?.id;
};
