import request from "supertest";
import mongoose from "mongoose";
import { User } from "../models";
import createServer from "../app";
import {
  LOCAL_DB_URL,
  TEST_EMAIL,
  TEST_PASSWORD,
  TEST_USERNAME,
} from "../constants";
import { signToken } from "../utils/signToken";
import { verifyTokenAsync } from "../utils/verifyTokenAsync";
import { IJwtData } from "types";
// eslint-disable-next-line
const uuid = require("uuid");

const { EXPIRED_TOKEN, INVALID_SIGNATURE } = process.env;

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
      username: TEST_USERNAME,
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    // console.log(
    //   "\x1b[33m",
    //   "create new user response \n",
    //   JSON.stringify(createRes, null, 2),
    //   "\x1b[00m"
    // );
    const parsed = JSON.parse(createRes.text);
    expect(createRes.statusCode).toBe(201);
    expect(typeof parsed.user._id).toBe("string");
    newUserId = parsed.user._id;
    expect(typeof parsed.user.role).toBe("string");
    expect(typeof parsed.user.token).toBe("string");
    newUserToken = parsed.user.token;
    expect(parsed.user.role).toBe("user");
  });
  test("GET /user any user cannot query all users", async () => {
    const cannotGet = await request(app)
      .get("/user")
      .set({
        authorization: `Bearer ${newUserToken}`,
      });
    expect(cannotGet.statusCode).toBe(403);
  });
  // test not found user
  test("GET /user/:id with a bogus object id", async () => {
    // console.log("previous id", newUserId);
    const invalidId = newUserId?.replace(newUserId[1], "f");
    // console.log("created invalid id", invalidId);
    const notFound = await request(app)
      .get(`/user/${invalidId}`)
      .set({
        authorization: `Bearer ${newUserToken}`,
      });
    expect(notFound.statusCode).toBe(404);
    expect(JSON.parse(notFound.text).message).toBe("user not found");
  });
  test("GET /user/:id the user we just created in previous test without a token", async () => {
    const getUser = await request(app)
      .get(`/user/${newUserId}`)
      .set({ authorization: `Bearer kdfkdjf` });

    expect(getUser.statusCode).toBe(403);
  });
  test("GET /user test get all users as non admin should get 403", async () => {
    const forbidden = await request(app)
      .get("/user")
      .set({ authorization: `Bearer ${newUserToken}` });
    expect(forbidden.statusCode).toBe(403);
    expect(JSON.parse(forbidden.text).message).toBe("forbidden");
  });
  test("GET /user test get all users route only with an admin role", async () => {
    const adminUuid = uuid.v4();
    const adminToken = signToken({
      adminUuid,
    });
    expect(typeof adminToken).toBe("string");
    const verified = (await verifyTokenAsync(adminToken)) as IJwtData;
    expect(verified instanceof Error).toBe(false);
    expect(verified.role).toBe("admin");
    const getAllUsers = await request(app)
      .get("/user")
      .set({ authorization: `Bearer ${adminToken}` });
    expect(getAllUsers.statusCode).toBe(200);
    expect(JSON.parse(getAllUsers.text).users).toHaveLength(1);
  });
  // get that user we just made make sure they were made and the get user route works
  test("GET /user/:id the user we just created in the previous test", async () => {
    // console.log("what is user id here", newUserId);
    const getUserRes = await request(app)
      .get(`/user/${newUserId}`)
      .set({
        authorization: `Bearer ${newUserToken}`,
      });
    // console.log(
    //   "\x1b[33m",
    //   "create response \n",
    //   JSON.stringify(getUserRes, null, 2),
    //   "\x1b[00m"
    // );
    expect(getUserRes.statusCode).toBe(200);
  });
  test("delete the user we just made with the mongo client", async () => {
    await User.findOneAndDelete({ _id: newUserId });
  });
  //create a user and verify their token exists and it's new
  test("POST /user create a user and verify they recieved a token", async () => {
    const createRes2 = await request(app).post("/user").send({
      username: TEST_USERNAME,
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    // console.log(
    //   "\x1b[33m",
    //   "create response \n",
    //   JSON.stringify(createRes2, null, 2),
    //   "\x1b[00m"
    // );
    const parsed = JSON.parse(createRes2.text);
    expect(createRes2.statusCode).toBe(201);
    expect(typeof parsed.user._id).toBe("string");
    newUserId = parsed.user._id;
    expect(typeof parsed.user.token).toBe("string");
    expect(typeof parsed.user.role).toBe("string");
    newUserToken = parsed.user.token;
  });
  // update user route test
  test("PUT /user/:id update the user with blank token get 401 status code", async () => {
    const updateRes = await request(app)
      .put(`/user/${newUserId}`)
      .set({ authorization: `Bearer ` })
      .send({
        username: "updated username",
        email: "updated email",
      });
    // console.log(
    //   "\x1b[33m",
    //   "update res with malformed token \n",
    //   JSON.stringify(updateRes, null, 2),
    //   "\x1b[00m"
    // );
    expect(updateRes.statusCode).toBe(401);
    expect(JSON.parse(updateRes.text).error).toBe("not authenticated");
  });
  // update user route test
  test("PUT /user/:id update the user with malformed token get jwt malformed error", async () => {
    const updateRes = await request(app)
      .put(`/user/${newUserId}`)
      .set({ authorization: `Bearer ajkls;dfjnas;kldfj` })
      .send({
        username: "updated username",
        email: "updated email",
      });
    // console.log(
    //   "\x1b[33m",
    //   "update res with malformed token \n",
    //   JSON.stringify(updateRes, null, 2),
    //   "\x1b[00m"
    // );
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
    // console.log(
    //   "\x1b[33m",
    //   "update res with expired token \n",
    //   JSON.stringify(updateRes, null, 2),
    //   "\x1b[00m"
    // );
    expect(updateRes.statusCode).toBe(403);
    expect(JSON.parse(updateRes.text).error.message).toBe("jwt expired");
  });
  test("PUT /user/:id update user with a token that has an invalid token and return error response", async () => {
    const updateRes = await request(app)
      .put(`/user/${newUserId}`)
      .set({ authorization: `Bearer ${INVALID_SIGNATURE}` })
      .send({ username: "updated username", email: "updated email" });
    // console.log(
    //   "\x1b[33m",
    //   "update response with a token with an invalid token \n",
    //   JSON.stringify(updateRes, null, 2),
    //   "\x1b[00m"
    // );
    expect(updateRes.statusCode).toBe(403);
    expect(JSON.parse(updateRes.text).error.message).toBe("invalid signature");
  });
  test("PUT /user/:id update the user just made when id in params doesn't match the id of the requestor should 403", async () => {
    const updateRes = await request(app)
      .put(`/user/jdfkj`)
      .set({ authorization: `Bearer ${newUserToken}` })
      .send({ username: "updated username", email: "updated email" });

    expect(updateRes.statusCode).toBe(403);
  });
  test("PUT /user/:id any user should not be able to update their role from user to admin", async () => {
    const updateRes = await request(app)
      .put(`/user/${newUserId}`)
      .set({ authorization: `Bearer ${newUserToken}` })
      .send({
        username: "updated username",
        email: "updated email",
        role: "admin",
      });
    expect(updateRes.statusCode).toBe(403);
  });
  test("PUT /user/:id update the user we just made with a valid token", async () => {
    const updateRes = await request(app)
      .put(`/user/${newUserId}`)
      .set({ authorization: `Bearer ${newUserToken}` })
      .send({
        username: "updated username",
        email: "updated email",
      });
    // console.log(
    //   "\x1b[33m",
    //   "update response with valid token \n",
    //   JSON.stringify(updateRes, null, 2),
    //   "\x1b[00m"
    // );
    expect(updateRes.statusCode).toBe(200);
    expect(JSON.parse(updateRes.text).user.username).toBe("updated username");
    expect(JSON.parse(updateRes.text).user.email).toBe("updated email");
  });
  // login test
  test("POST /user/login test the login route without a password or email and get 422", async () => {
    const noLogin = await request(app).post("/user/login");
    expect(noLogin.statusCode).toBe(422);
    expect(JSON.parse(noLogin.text).error).toBe("unprocessable entity");
  });
  test("POST /user/login test the login route and we also return a new token", async () => {
    const loginRes = await request(app).post("/user/login").send({
      email: "updated email",
      password: TEST_PASSWORD,
    });
    // console.log(
    //   "\x1b[33m",
    //   "login response \n",
    //   JSON.stringify(loginRes, null, 2),
    //   "\x1b[00m"
    // );
    expect(loginRes.statusCode).toBe(200);
    const parsed = JSON.parse(loginRes.text);
    expect(typeof parsed.user.token).toBe("string");
  });
  // TODO: test the user forgot and user change password functions
  // test("POST /user/forgot")
  // login test incorrect credentials error
  test("POST /user/login test with garbage email the login errors appear", async () => {
    const badCreds = await request(app).post("/user/login").send({
      email: "kdjfkdjf",
      password: TEST_PASSWORD,
    });
    expect(badCreds.statusCode).toBe(400);
    expect(JSON.parse(badCreds.text).error).toBe("incorrect credentials");
  });
  test("POST /user/login test with garbage email the login errors appear", async () => {
    const badCreds = await request(app).post("/user/login").send({
      email: "updated email",
      password: "ksdjfkdjfkj",
    });
    expect(badCreds.statusCode).toBe(400);
    expect(JSON.parse(badCreds.text).error).toBe("incorrect credentials");
  });
  test("delete the user we just made with the mongoose client", async () => {
    await User.findOneAndDelete({ _id: newUserId });
  });
});
