export function formatCreateUserError(errorsObj: {
  username: any;
  email: any;
  password: any;
}): string | void {
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
