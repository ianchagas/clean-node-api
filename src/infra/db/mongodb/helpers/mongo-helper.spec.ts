import { MongoHelper as sut } from "./mongo-helper";

describe("MongoHelper", () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test("Should reconnect if mongodb is down", async () => {
    let accountConnection = await sut.getCollection("accounts");
    expect(accountConnection).toBeTruthy();

    await sut.disconnect();

    accountConnection = await sut.getCollection("accounts");
    expect(accountConnection).toBeTruthy();
  });
});
