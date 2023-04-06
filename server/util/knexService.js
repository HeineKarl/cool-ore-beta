const knex = require("./knex");

class knexService {
  constructor(table) {
    this.table = table;
  }
  debug() {
    console.log({ table: this.table });
  }
  parseBool(value) {
    console.log("Parse Bool Function".cyan);
    if (typeof value !== "number")
      return console.error(`Value "${value}" must be a type of Number`?.red);

    if (value < 0 || value > 1)
      return console.error(
        `parseBool: Value "${value}" must be only 0 or 1`?.red
      );

    return value == 1 ? true : false;
  }
  getData() {
    console.log("Get Data Function".cyan);
    return knex(this.table).select("*");
  }
  getDataById(id) {
    console.log("Get Data By Id Function".cyan);
    return knex(this.table).select("*").where("id", id);
  }
  verifyData(where, value) {
    console.log("Verify Data Function".cyan);
    return knex(this.table).select("*").where(where, value);
  }
  insertData(data) {
    console.log("Insert Data Function".cyan);
    if (typeof data !== "object")
      return console.error({ data: "Must be an Object" });

    return knex(this.table).insert(data);
  }
  updateData(id, data) {
    console.log("Update Data Function".cyan);

    if (typeof data !== "object")
      return console.error({ data: "Must be an Object" });

    return knex(this.table).where("id", id).update(data);
  }
  deleteData(id) {
    console.log("Delete Data Function".cyan);
    return knex(this.table).where("id", id).del();
  }
}

module.exports = knexService;
