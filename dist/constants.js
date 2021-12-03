"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_PASSWORD = exports.TEST_EMAIL = exports.TEST_USERNAME = exports.LOCAL_DB_URL = exports.IS_PROD = void 0;
exports.IS_PROD = process.env.NODE_ENV === "production";
exports.LOCAL_DB_URL = "mongodb://localhost/rest-cats-test";
exports.TEST_USERNAME = "test-user";
exports.TEST_EMAIL = "test@email.com";
exports.TEST_PASSWORD = "test password";
//# sourceMappingURL=constants.js.map