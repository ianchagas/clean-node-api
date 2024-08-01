import { Collection, MongoClient } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient | null,
  uri: null as string | null,
  dbName: null as string | null,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
    this.dbName = "clean-node-api";
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
  },

  async isConnected(): Promise<boolean> {
    return (
      this.client && this.client.topology && this.client.topology.isConnected()
    );
  },

  async getCollection(name: string): Promise<Collection> {
    const isConnected = await this.isConnected();

    if (!isConnected) {
      await this.connect(this.uri);
    }

    return this.client.db(this.dbName).collection(name);
  },

  map(collectionResult: any, insertedData: any): any {
    return {
      id: collectionResult.insertedId.toString(),
      ...insertedData,
    };
  },
};
