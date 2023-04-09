function insertion(value) {
  let returnVal;

  if (value === null) return "NULL";

  if (value instanceof Date) return value;

  switch (typeof value) {
    case "string":
      returnVal = "'" + value + "'";
      break;
    case "number":
      returnVal = value;
      break;
    case "undefined":
      returnVal = "NULL";
      break;
    case "object":
      returnVal = value;
      break;

    default:
      console.warn("Value is not right");
      break;
  }

  return returnVal;
}

module.exports = insertion;
