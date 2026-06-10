import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // CLI (migrate/seed/studio) cần kết nối trực tiếp, không qua pooler
    url: env("DATABASE_URL_UNPOOLED"),
  },
});
