import request from "supertest";
import mongoose from "mongoose";
import { Card } from "../models";
import {
  ICreateCardPayload,
  ICreateUserResponse,
  ILoginResponse,
} from "../types";
import createServer from "../app";
import {
  LOCAL_DB_URL,
  TEST_EMAIL,
  TEST_PASSWORD,
  TEST_USERNAME,
} from "../constants";
import { User } from "../models";

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
let newUserId: string | null = null;
let newUserToken: string | null = null;
let secondUserId: string | null = null;
let secondUserToken: string | null = null;

describe("card CRUD stuff", () => {
  //create a user that will add cards to their library
  test("POST /user create a new user to start adding cards to their library", async () => {
    const createRes = await request(app).post("/user").send({
      username: TEST_USERNAME,
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    // console.log(
    //   "\x1b[33m",
    //   "create response \n",
    //   JSON.stringify(createRes, null, 2),
    //   "\x1b[00m"
    // );
    expect(createRes.statusCode).toBe(201);
    expect(typeof JSON.parse(createRes.text).user._id).toBe("string");
    newUserId = JSON.parse(createRes.text).user._id;
    expect(typeof JSON.parse(createRes.text).user.token).toBe("string");
    newUserToken = JSON.parse(createRes.text).user.token;
  });
  //create card
  // TODO add the user ID to the card mongoose (set just as a string)
  test("POST /card create a new card", async () => {
    const createCardRes = await request(app)
      .post("/card")
      .set({
        authorization: `Bearer ${newUserToken}`,
      })
      .send({
        frontsideText: "привет",
        frontsideLanguage: "Русский",
        frontsidePicture: "front side picture text",
        backsideText: "hello",
        backsideLanguage: "English",
        backsidePicture: "ksdjfdkj",
      } as ICreateCardPayload);
    // console.log(
    //   "\x1b[33m",
    //   "create response \n",
    //   JSON.stringify(createCardRes, null, 2),
    //   "\x1b[00m"
    // );
    const parsedJSON = JSON.parse(createCardRes.text);
    expect(createCardRes.statusCode).toBe(201);
    expect(parsedJSON.cards).toHaveLength(1);
    expect(typeof parsedJSON.cards[0]).toBe("string");
    newCardId = parsedJSON.cards[0];
    const createdCard = await Card.findOne({ _id: newCardId as string });
    expect(typeof createdCard?.frontsidePicture).toBe("string");
    expect(createdCard?.frontsidePicture).toBe("front side picture text");
  });
  // checks edit card with bogus id will give correct error response
  test("PUT /card/:id update card with bogus id", async () => {
    // console.log("previous id", newCardId);
    const bogusId = newCardId?.replace(newCardId[1], "f");
    // console.log("bogus id", bogusId);
    const notFound = await request(app)
      .put(`/card/${bogusId}`)
      .set({ authorization: `Bearer ${newUserToken}` });
    expect(notFound.statusCode).toBe(404);
    expect(JSON.parse(notFound.text).message).toBe("card not found");
  });
  //edit card
  test("PUT /card/:id update a card by it's id", async () => {
    const updateCardRes = await request(app)
      .put(`/card/${newCardId}`)
      .set({ authorization: `Bearer ${newUserToken}` })
      .send({
        frontsideText: "updated front side text",
      });
    expect(updateCardRes.statusCode).toBe(200);
    expect(JSON.parse(updateCardRes.text).card.frontsideText).toBe(
      "updated front side text"
    );
  });
  test("POST /user/login see if we get an array of card objects instead of ids", async () => {
    const login = await request(app).post("/user/login").send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    const parsed = JSON.parse(login.text) as ILoginResponse;
    expect(login.statusCode).toBe(200);
    expect(parsed.user.cards).toHaveLength(1);
    expect(parsed.user.cards[0].backsideText).toBe("hello");
  });
  test("POST /user create a second user who will try and fail to edit a card that is not their own", async () => {
    const secondUser = await request(app).post("/user").send({
      username: "second user",
      email: "seconduser@email.com",
      password: "some password",
    });
    const parsed = JSON.parse(secondUser.text) as ICreateUserResponse;
    expect(secondUser.statusCode).toBe(201);
    expect(typeof parsed.user._id).toBe("string");
    secondUserId = parsed.user._id;
    expect(typeof parsed.user.token).toBe("string");
    secondUserToken = parsed.user.token as string;
  });
  test("PUT /card/:id test that a user can only update their own cards", async () => {
    const notOwnCard = await request(app)
      .put(`/card/${newCardId}`)
      .set({ authorization: `Bearer ${secondUserToken}` })
      .send({
        frontsideText: "shouldn't update here",
      });
    expect(notOwnCard.statusCode).toBe(403);
  });
  //delete card
  test("delete the card we just made", async () => {
    await Card.findOneAndDelete({ _id: newCardId as string });
  });
  //delete test user
  test("delete the users we just made", async () => {
    await User.findOneAndDelete({ _id: newUserId });
    await User.findOneAndDelete({ _id: secondUserId });
  });
});
