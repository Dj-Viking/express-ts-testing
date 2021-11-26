import request from "supertest";
import app from "../app";

describe("test the hello route", () => {
  test("should get some html from the route", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
  });
});
