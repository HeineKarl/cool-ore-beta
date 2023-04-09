const { Client } = require("pg");

// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "Pleuroceras8685",
//   database: "postgres",
// });

const client = new Client({
  host: "dpg-cgntmrgrddl9mmo5suk0-a",
  ssl: true,
  connectionString:
    "postgres://cooloredb_eway_user:d41varsWlMvlJLYg8NZ06BRMLybi6pER@dpg-cgntmrgrddl9mmo5suk0-a.singapore-postgres.render.com/cooloredb_eway",
  user: "cooloredb_eway_user",
  port: 5432,
  password: "d41varsWlMvlJLYg8NZ06BRMLybi6pER",
  database: "postgres",
});

module.exports = client;
