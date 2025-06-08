export async function createResetSession(req, res) {
  // res.json("createResetSession route");
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).send({ msg: "Access granted!" });
  }
  return res.status(404).send({ error: "Session expired!" });
}
