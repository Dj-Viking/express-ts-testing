import request from "supertest";
import mongoose from "mongoose";
import User from "../models/User";
import createServer from "../app";
import { LOCAL_DB_URL } from "../constants";

const { EXPIRED_TOKEN } = process.env;

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
let newUserId: string | null = null;
let newUserToken: string | null = null;

describe("testing some crud stuff on users", () => {
  //try to create user without username email or password
  test("POST /user request to create user without username", async () => {
    const noUsername = await request(app).post("/user").send({
      username: "",
      email: "kdjfkdjfkj",
      password: "kdjfdjfj",
    });
    expect(noUsername.statusCode).toBe(400);
    expect(JSON.parse(noUsername.text).error).toBe("username is required.");
  });
  test("POST /user request to create user without email", async () => {
    const noEmail = await request(app).post("/user").send({
      username: "ksdjfkdf",
      email: "",
      password: "a;kdjfjkdfj",
    });
    expect(noEmail.statusCode).toBe(400);
    expect(JSON.parse(noEmail.text).error).toBe("email is required.");
  });
  test("POST /user request to create user without password", async () => {
    const noPassword = await request(app).post("/user").send({
      username: "ksdjfdj",
      email: "klsjdfj",
      password: "",
    });
    expect(noPassword.statusCode).toBe(400);
    expect(JSON.parse(noPassword.text).error).toBe("password is required.");
  });
  //create a user
  test("POST /user create a user", async () => {
    const createRes = await request(app).post("/user").send({
      username: "123123",
      email: "123123",
      password: "adf",
    });
    console.log(
      "\x1b[33m",
      "create2 response \n",
      JSON.stringify(createRes, null, 2),
      "\x1b[00m"
    );
    expect(createRes.statusCode).toBe(201);
    expect(typeof JSON.parse(createRes.text).user._id).toBe("string");
    newUserId = JSON.parse(createRes.text).user._id;
  });
  // test not found user
  test("GET /user/:id with a bogus object id", async () => {
    console.log("previous id", newUserId);
    const invalidId = newUserId?.replace(newUserId[1], "f");
    console.log("created invalid id", invalidId);
    const notFound = await request(app).get(`/user/${invalidId}`);
    expect(notFound.statusCode).toBe(404);
    expect(JSON.parse(notFound.text).message).toBe("user not found");
  });
  // get that user we just made make sure they were made and the get user route works
  test("GET /user/:id the user we just created in the previous test", async () => {
    console.log("what is user id here", newUserId);
    const getUserRes = await request(app).get(`/user/${newUserId}`);
    console.log(
      "\x1b[33m",
      "create response \n",
      JSON.stringify(getUserRes, null, 2),
      "\x1b[00m"
    );
    expect(getUserRes.statusCode).toBe(200);
  });
  test("delete the user we just made with the mongo client", async () => {
    await User.findOneAndDelete({ _id: newUserId });
  });
  //create a user and verify their token exists and it's new
  test("POST /user create a user and verify they recieved a token", async () => {
    const createRes2 = await request(app).post("/user").send({
      username: "123123",
      email: "123123",
      password: "adf",
    });
    console.log(
      "\x1b[33m",
      "create response \n",
      JSON.stringify(createRes2, null, 2),
      "\x1b[00m"
    );
    expect(createRes2.statusCode).toBe(201);
    expect(typeof JSON.parse(createRes2.text).user._id).toBe("string");
    newUserId = JSON.parse(createRes2.text).user._id;
    expect(typeof JSON.parse(createRes2.text).user.token).toBe("string");
    newUserToken = JSON.parse(createRes2.text).user.token;
  });
  // update user route test
  test("PUT /user/:id update the user we just made and needs a token to do so", async () => {
    const updateRes = await request(app)
      .put(`/user/${newUserId}`)
      .set({ authorization: `Bearer ajkls;dfjnas;kldfj` })
      .send({
        username: "updated username",
        email: "updated email",
      });
    console.log(
      "\x1b[33m",
      "update res with malformed token \n",
      JSON.stringify(updateRes, null, 2),
      "\x1b[00m"
    );
    expect(updateRes.statusCode).toBe(403);
    expect(JSON.parse(updateRes.text).error.message).toBe("jwt malformed");
  });
  test("put /user/:id update user with an expired token should get expired error", async () => {
    const updateRes = await request(app)
      .put(`/user/${newUserId}`)
      .set({
        authorization: `Bearer ${EXPIRED_TOKEN}`,
      })
      .send({ username: "updated username", email: "updated email" });
    console.log(
      "\x1b[33m",
      "update res with expired token \n",
      JSON.stringify(updateRes, null, 2),
      "\x1b[00m"
    );
    expect(updateRes.statusCode).toBe(403);
    expect(JSON.parse(updateRes.text).error.message).toBe("jwt expired");
  });
  test("PUT /user/:id update the user we just made with a valid token", async () => {
    const updateRes = await request(app)
      .put(`/user/${newUserId}`)
      .set({ authorization: `Bearer ${newUserToken}` })
      .send({ username: "updated username", email: "updated email" });
    console.log(
      "\x1b[33m",
      "update response with valid token \n",
      JSON.stringify(updateRes, null, 2),
      "\x1b[00m"
    );
    expect(updateRes.statusCode).toBe(200);
    expect(JSON.parse(updateRes.text).user.username).toBe("updated username");
    expect(JSON.parse(updateRes.text).user.email).toBe("updated email");
  });
  test("delete the user we just made with the mongo client", async () => {
    await User.findOneAndDelete({ _id: newUserId });
  });
});
