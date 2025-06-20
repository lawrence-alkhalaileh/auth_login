export async function verifyOPT(req, res) {
  try {
    const { code } = req.query;
    const { OTP } = req.app.locals;
    if (parseInt(OTP) === parseInt(code)) {
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(201).send({ msg: "Verify Successfully!" });
    }
    return res.status(404).send({ error: "Invalid OTP" });
  } catch (error) {
    return res.status(500).send(error);
  }
}
