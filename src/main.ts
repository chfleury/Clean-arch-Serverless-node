import { Server } from "./framework/http/Server";

(async () => {
  const app = new Server();

  app.server.listen(Server.port, () => {
    console.log(`Server Running at http://localhost:${Server.port}`);
  });
})();
