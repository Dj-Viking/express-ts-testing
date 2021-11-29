import request from "supertest";
import mongoose from "mongoose";
import createServer from "../app";
import { LOCAL_DB_URL } from "../constants";

beforeEach((done) => {
  mongoose.connect(LOCAL_DB_URL, {}, () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});
const app = createServer();

describe("test the hello route", () => {
  test("should get 200 status code", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
  });
  test("we should get <h1>Hello 123123</h1> text as html from the response", async () => {
    const res = await request(app).get("/hello");
    expect(res.text).toBe("<h1>Hello 123123</h1>");
  });
});
