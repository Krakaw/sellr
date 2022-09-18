import * as dotenv from 'dotenv';
dotenv.config();

const env = Object.assign({}, process.env);
export default {
  pg: {
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    db: env.POSTGRES_DB,
    host: env.POSTGRES_HOST || '127.0.0.1',
    port: parseInt(env.POSTGRES_PORT || '5432'),
  },
};
