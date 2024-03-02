export default function readConfig() {
  return {
    port: mandatory(Number(process.env.PORT), "PORT is required"),
    dbName: mandatory(process.env.DB_NAME, "DB_NAME is required"),
    dbPort: mandatory(Number(process.env.DB_PORT), "DB_PORT is mandatory"),
    dbHostname: mandatory(process.env.DB_HOSTNAME, "DB_HOSTNAME is mandatory"),
    dbUser: mandatory(process.env.DB_USER, "DB_USER is mandatory"),
    dbPassword: mandatory(process.env.DB_PASSWORD, "DB_PASSWORD is mandatory"),
    jwtSecret: mandatory(process.env.JWT_SECRET, "JWT_SECRET is mandatory"),
    userTokenValiditySeconds: mandatory(Number(process.env.USER_TOKEN_VALIDILITY_SECONDS), "USER_TOKEN_VALIDILITY_SECONDS is mandatory")
  };
}

function mandatory<T>(value: T | undefined, errorMsg: string): T {
  if (value === undefined) {
    throw new Error(errorMsg);
  } else {
    return value;
  }
}
