export function formatCreateUserError(options: {
  username: any;
  email: any;
  password: any;
}): string | void {
  const { username, email, password } = options;
  // console.log("what is typeof email", typeof email /* object */, email.toString());
  // console.log("which input is defined", username, "\n", email, "\n", password);
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
