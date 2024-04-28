import express, { Application } from "express";
import dotenv from "dotenv";

import { ExchangeCurrencyController } from "../../adapters/controllers/ExchangeCurrencyController";
import { container } from "../ioc/Container";

dotenv.config();

export class Server {
  static port = process.env["PORT"] ?? 3000;
  public readonly server: Application;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    const contoller = container.get(ExchangeCurrencyController);

    this.server.post("/exchange", async (req, res) => {
      const response = await contoller.run(req);

      res.json(response.data).status(response.status);
    });
  }

  middlewares() {
    this.server.use(express.json());
  }
}
