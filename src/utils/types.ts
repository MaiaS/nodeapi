export type PutRecordRequest = {
  id: string;
  entry: string;
};

export type EntryRequest = {
  entry: string;
};

export type StorageData = {
  entries: Record<string, string>;
};
