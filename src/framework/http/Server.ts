import express, { Application } from "express";
import { ExchangeCurrencyController } from "../../adapters/controllers/ExchangeCurrencyController";
import { container } from "../ioc/Container";

export class Server {
  static port = 3000; //TODO
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
