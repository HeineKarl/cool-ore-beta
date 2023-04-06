const knex = require("knex");
const path = require("path");

const connectedKnex = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "../db/list.sqlite3"),
  },
  useNullAsDefault: true,
});

module.exports = connectedKnex;
