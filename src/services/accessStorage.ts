import { currentData } from "../db";
import { StorageData } from "../utils/types";

export const liveStorage = () => {
  let historicLength = 0;
  const data: StorageData = currentData;
  return {
    read: (id?: string) => {
      if (id) return [currentData?.entries?.[id]];

      return currentData.entries;
    },
    write: (entry: string, id?: string) => {
      const randomlyGeneratedUUID = id ?? `${historicLength + 1}`;
      data.entries[randomlyGeneratedUUID] = entry;
      if (id && !currentData?.entries?.[id]) {
        throw new Error("Could not find entry.");
      }
      return { id: randomlyGeneratedUUID, entry };
    },
    delete: (id: string) => {
      if (!currentData?.entries?.[id]) {
        throw new Error("Could not find entry.");
      }
      delete currentData.entries[id];
    },
  };
};

const storageService = liveStorage();

export { storageService };
