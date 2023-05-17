/**
 * https://nextjs.org/docs/basic-features/environment-variables
 * Support for prefix provided
 */
const prefix = '';

class CoreConstants {
  get environment() {
    return process.env[`${prefix}_ENVIRONMENT`];
  }

  get domain() {
    return process.env[`${prefix}_DOMAIN`];
  }
}

module.exports = new CoreConstants();
