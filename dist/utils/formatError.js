"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCreateUserError = void 0;
function formatCreateUserError(errorsObj) {
    const { username, email, password } = errorsObj;
    switch (true) {
        case !!username: {
            return username.message
                .toString()
                .replace(/`/g, "")
                .replace(/Path/, "")
                .trim();
        }
        case !!password: {
            return password.message
                .toString()
                .replace(/`/g, "")
                .replace(/Path/, "")
                .trim();
        }
        case !!email: {
            return email.message
                .toString()
                .replace(/`/g, "")
                .replace(/Path/, "")
                .trim();
        }
    }
}
exports.formatCreateUserError = formatCreateUserError;
//# sourceMappingURL=formatError.js.map