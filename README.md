[![codecov](https://codecov.io/gh/Dj-Viking/express-ts-testing/branch/main/graph/badge.svg?token=LPOSO59XT1)](https://codecov.io/gh/Dj-Viking/express-ts-testing)

# Development
```sh
#this runs tsc in watch mode and nodemon concurrently
npm start
```

# Testing
```sh
# this will run all the tests and provide code coverage report in the /coverage directory
npm test
```

```sh
# to specify a single test file to run
npm test user.test.ts
```

# ENV
The start script and the test script are reading a hidden `env.txt` file to read in the environment variables
before the script starts running, this is to allow environment variables to be available without the use of `dotenv`
and `process.env.ENV_TXT` will be defined and then parsed by the utility function `readEnv()` which is a custom function made to set all the needed environment variables for the CI environment and the development environment.

If there is a better way to allow a test environment to use `dotenv` please let me know because I have not found a way to do this
besides reading in the file stored as the variable at the start of the npm script, especially when using `concurrently`
```sh
ENV_TXT=$(cat env.txt)
```
`readEnv()` then checks if process.env.ENV_TXT is defined (which it should be) and then parse out all the key-values separated by the \n character. and then chops off the `'` after splitting the keys and values by the `=` sign
probably over engineered but this works pretty well given that each env entry is written as:
```sh
SECRET='here is a secret'
KEY='here is another value'
```

`readEnv()` parses the file it becomes an object that copies into the process.env object
```ts
let entries = {} as Record<string, string>
entries = {
  "SECRET": "here is a secret",
  "KEY": "here is another value",
};

process.env = {
  ...process.env,
  ...entries
};
```