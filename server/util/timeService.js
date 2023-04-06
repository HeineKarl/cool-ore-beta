function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function substractMinutes(date, minutes) {
  return new Date(date.getTime() - minutes * 60000);
}

function refreshTime(date, expiration) {
  if (typeof expiration !== "string") {
    return console.error(`Value ${expiration} must be a String`);
  }

  if (expiration == "1h") expiration = 60 / 2;

  return new Date(date.getTime() - expiration * 60000);
}

function nextWeek() {
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  return nextWeek;
}

module.exports = {
  addMinutes,
  substractMinutes,
  refreshTime,
  nextWeek,
};
