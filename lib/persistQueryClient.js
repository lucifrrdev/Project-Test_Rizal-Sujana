import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { get, set, del } from "idb-keyval";

export function setupPersistQueryClient(queryClient) {
  const persister = {
    persistClient: async (client) => {
      await set("tanstack-query-cache", client);
    },
    restoreClient: async () => {
      return await get("tanstack-query-cache");
    },
    removeClient: async () => {
      await del("tanstack-query-cache");
    }
  };

  persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60 * 24, // disk cache 24 jam
  });
}
