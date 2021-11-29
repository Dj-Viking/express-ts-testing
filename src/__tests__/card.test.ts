import request from "supertest";
import mongoose from "mongoose";
import Card from "../models/Card";
import { ICreateCardPayload } from "../types";
import createServer from "../app";
import { LOCAL_DB_URL } from "../constants";

beforeEach((done) => {
  mongoose.connect(LOCAL_DB_URL, {}, () => done());
});

afterEach((done) => {
  // mongoose.connection.db.dropDatabase(() => {
  //   mongoose.connection.close(() => done());
  // });
  mongoose.connection.close(() => done());
});
const app = createServer();
let newCardId: string | null = null;

describe("card CRUD stuff", () => {
  //create card
  test("POST /card create a new card", async () => {
    const createCardRes = await request(app)
      .post("/card")
      .send({
        frontsideText: "привет",
        frontsideLanguage: "Русский",
        frontsidePicture: "kdfjdjkfd",
        backsideText: "hello",
        backsideLanguage: "English",
        backsidePicture: "ksdjfdkj",
      } as ICreateCardPayload);
    console.log(
      "\x1b[33m",
      "create response \n",
      JSON.stringify(createCardRes, null, 2),
      "\x1b[00m"
    );
    expect(createCardRes.statusCode).toBe(201);
    expect(typeof JSON.parse(createCardRes.text).card._id).toBe("string");
    newCardId = JSON.parse(createCardRes.text).card._id;
  });
  //delete card
  test("delete the card we just made", async () => {
    await Card.findOneAndDelete({ _id: newCardId });
  });
});
