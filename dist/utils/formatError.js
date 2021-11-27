"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCreateUserError = void 0;
function formatCreateUserError(options) {
    const { username, email, password } = options;
    switch (true) {
        case !!username: {
            return username.toString().replace(/`/g, "").replace(/Path/, "").trim();
        }
        case !!password: {
            return password.toString().replace(/`/g, "").replace(/Path/, "").trim();
        }
        case !!email: {
            return email.toString().replace(/`/g, "").replace(/Path/, "").trim();
        }
    }
}
exports.formatCreateUserError = formatCreateUserError;
//# sourceMappingURL=formatError.js.map