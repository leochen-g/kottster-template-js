"use strict";
const common = require("@kottster/common");
const server = require("@kottster/server");
const schema = {};
const isProduction = process.env.NODE_ENV === "production";
const SECRET_KEY = common.getEnvOrThrow("SECRET_KEY");
const JWT_SECRET_SALT = common.getEnvOrThrow("JWT_SECRET_SALT");
const ROOT_USER_PASSWORD = common.getEnvOrThrow("ROOT_USER_PASSWORD");
const app = server.createApp({
  schema,
  secretKey: isProduction ? SECRET_KEY : "<your-secret-key>",
  /*
   * The identity provider configuration.
   * See https://kottster.app/docs/app-configuration/identity-provider
   */
  identityProvider: server.createIdentityProvider("sqlite", {
    fileName: "app.db",
    passwordHashAlgorithm: "bcrypt",
    jwtSecretSalt: isProduction ? JWT_SECRET_SALT : "<your-jwt-secret-salt>",
    /* The root admin user credentials */
    rootUsername: "admin",
    rootPassword: isProduction ? ROOT_USER_PASSWORD : "adminpass"
  })
});
async function bootstrap() {
  await app.listen();
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
