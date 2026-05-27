import { Pool } from 'pg';

const connectionString = "postgresql://neondb_owner:npg_R5X9eZhPwBIj@ep-polished-math-aq6n46kz-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const pool = new Pool({
  connectionString,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);