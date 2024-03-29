import request from "supertest";
import app from "../config/app";

describe("SingUp Routes", () => {
  test("Should return an account on success", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "Ian",
        email: "ianchagassalgado@outlook.com",
        password: "1234",
        passwordConfirmation: "1234",
      })
      .expect(200);
  });
});
