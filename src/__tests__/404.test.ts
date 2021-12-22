import request from "supertest";
import createServer from "../app";

const app = createServer();

describe("test the 404 route when fetching a route that doesn't exist", () => {
  test("/GET /randomroute to test the 404 route", async () => {
    const notFound = await request(app).get("/randomroute");
    expect(notFound.statusCode).toBe(404);
    expect(notFound.text).toBe("<h1>Page not found</h1>");
  });
});
