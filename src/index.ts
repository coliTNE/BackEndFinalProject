// Needs
import config from "./config/index";
import server from "./services/server";

// Init

server.listen(config.port, () => {
  console.log(
    `Servidor express en funcionamiento http://localhost:${config.port}`
  );
});
