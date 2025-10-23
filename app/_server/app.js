import { getEnvOrThrow } from '@kottster/common';
import { createApp, createIdentityProvider } from '@kottster/server';
import schema from '../../kottster-app.json';

const isProduction = process.env.NODE_ENV === 'production';

const SECRET_KEY = getEnvOrThrow('SECRET_KEY');
const JWT_SECRET_SALT = getEnvOrThrow('JWT_SECRET_SALT');
const ROOT_USER_PASSWORD = getEnvOrThrow('ROOT_USER_PASSWORD');
/* 
 * For security, consider moving the secret data to environment variables.
 * See https://kottster.app/docs/deploying#before-you-deploy
 */
export const app = createApp({
  schema,
  secretKey: isProduction 
    ? SECRET_KEY
    : '<your-secret-key>',

  
  /*
   * The identity provider configuration.
   * See https://kottster.app/docs/app-configuration/identity-provider
   */
  identityProvider: createIdentityProvider('sqlite', {
    fileName: 'app.db',

    passwordHashAlgorithm: 'bcrypt',
   jwtSecretSalt: isProduction 
      ? JWT_SECRET_SALT
      : '<your-jwt-secret-salt>', 
    
    /* The root admin user credentials */
    rootUsername: 'admin',
    rootPassword: isProduction 
      ? ROOT_USER_PASSWORD
      : 'adminpass', 
  }),
});