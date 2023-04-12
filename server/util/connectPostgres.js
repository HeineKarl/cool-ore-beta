const { Client } = require("pg");

// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "Pleuroceras8685",
//   database: "postgres",
// });
// postgres://cooloredb_eway_user:kaxOsU8Sd7vszQ9lVBCyZMnQohvQNbIc@dpg-cgpo3s0u9tun42tu9cf0-a.oregon-postgres.render.com/cooloredb_eway_d23b
const client = new Client({
  host: "dpg-cgpo3s0u9tun42tu9cf0-a",
  ssl: true,
  connectionString:
    "postgres://cooloredb_eway_user:kaxOsU8Sd7vszQ9lVBCyZMnQohvQNbIc@dpg-cgpo3s0u9tun42tu9cf0-a.oregon-postgres.render.com/cooloredb_eway_d23b",
  user: "cooloredb_eway_user",
  port: 5432,
  password: "kaxOsU8Sd7vszQ9lVBCyZMnQohvQNbIc",
  database: "postgres",
});

module.exports = client;
