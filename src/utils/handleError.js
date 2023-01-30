function handleError(res, message = "Bad request", code = 403) {
  res.status(code).send({ error: message });
}
module.exports = { handleError };
