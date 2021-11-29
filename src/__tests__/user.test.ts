import request from "supertest";
import mongoose from "mongoose";
import User from "../models/User";
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
let newUserId: string | null = null;

describe("testing some crud stuff on users", () => {
  //create a user
  test("POST /user create a user", async () => {
    const createRes = await request(app).post("/user").send({
      username: "123123",
      email: "123123",
      password: "adf",
    });
    console.log(
      "\x1b[33m",
      "create response \n",
      JSON.stringify(createRes, null, 2),
      "\x1b[00m"
    );
    expect(createRes.statusCode).toBe(201);
    expect(typeof JSON.parse(createRes.text).user._id).toBe("string");
    newUserId = JSON.parse(createRes.text).user._id;
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
  // update user route test
  test("PUT /user/:id update the user we just made", async () => {
    const updateRes = await request(app).put(`/user/${newUserId}`).send({
      username: "updated username",
      email: "updated email",
    });
    console.log(
      "\x1b[33m",
      "update response \n",
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
