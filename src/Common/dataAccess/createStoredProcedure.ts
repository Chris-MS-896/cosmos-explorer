import { Resource, StoredProcedureDefinition } from "@azure/cosmos";
import { logConsoleError, logConsoleProgress } from "../../Utils/NotificationConsoleUtils";
import { client } from "../CosmosClient";
import { logError } from "../Logger";
import { sendNotificationForError } from "./sendNotificationForError";

export async function createStoredProcedure(
  databaseId: string,
  collectionId: string,
  storedProcedure: StoredProcedureDefinition
): Promise<StoredProcedureDefinition & Resource> {
  let createdStoredProcedure: StoredProcedureDefinition & Resource;
  const clearMessage = logConsoleProgress(`Creating stored procedure ${storedProcedure.id}`);
  try {
    const response = await client()
      .database(databaseId)
      .container(collectionId)
      .scripts.storedProcedures.create(storedProcedure);
    createdStoredProcedure = response.resource;
  } catch (error) {
    logConsoleError(`Error while creating stored procedure ${storedProcedure.id}:\n ${JSON.stringify(error)}`);
    logError(JSON.stringify(error), "CreateStoredProcedure", error.code);
    sendNotificationForError(error);
  }

  clearMessage();
  return createdStoredProcedure;
}
