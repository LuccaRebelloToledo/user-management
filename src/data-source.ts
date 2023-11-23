import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  entities: [
    `${__dirname}/**/modules/**/infra/typeorm/entities/*.{ts, js}`
  ],
  migrations: [
    `${__dirname}/**/shared/infra/http/typeorm/migrations/*.{ts, js}`
  ],
})