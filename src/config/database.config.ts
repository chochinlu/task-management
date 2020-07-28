export default () => ({
  host: process.env.DATABASE_HOST,
  db: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});
