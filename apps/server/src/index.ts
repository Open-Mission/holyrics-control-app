import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import dotenv from "dotenv";
import Fastify from "fastify";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type { HealthStatus } from "@holyrics-control/shared";

import { holyricsRoutes } from "./modules/holyrics/index.js";

dotenv.config();

const app = Fastify({
  logger: true
});

const port = Number(process.env.APP_PORT ?? 3000);
const host = process.env.APP_HOST ?? "0.0.0.0";
const currentDir = dirname(fileURLToPath(import.meta.url));
const webDistPath = join(currentDir, "../../web/dist");

await app.register(cors, {
  origin: true
});

await app.register(fastifyStatic, {
  root: webDistPath
});

await app.register(holyricsRoutes, {
  prefix: "/api/holyrics"
});

app.get<{ Reply: HealthStatus }>("/api/health", async () => {
  return { status: "ok" };
});

app.setNotFoundHandler((request, reply) => {
  if (request.url.startsWith("/api/")) {
    return reply.code(404).send({ error: "Not found" });
  }

  return reply.sendFile("index.html");
});

await app.listen({ port, host });
