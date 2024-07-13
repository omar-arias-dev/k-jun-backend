export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  whiteList: (process.env.WHITE_LIST.split(",")) || ["http://localhost:3000", ],
  database: {
    uri: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
  },
  swagger: {
    path: process.env.SWAGGER_PATH,
  },
  acronym: process.env.ACRONYM,
});