import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fetchCabinsFromNotion, listDatabases } from "./notion";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/notion/databases", async (_req, res) => {
    try {
      const databases = await listDatabases();
      res.json(databases);
    } catch (error: any) {
      console.error("Error listing Notion databases:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/cabins", async (_req, res) => {
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!databaseId) {
      return res.status(500).json({ error: "NOTION_DATABASE_ID not configured" });
    }
    try {
      const cabins = await fetchCabinsFromNotion(databaseId);
      res.json(cabins);
    } catch (error: any) {
      console.error("Error fetching cabins from Notion:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  return httpServer;
}
