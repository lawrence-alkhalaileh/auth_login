import otpGenerator from "otp-generator";

export async function generateOTP(req, res) {
  const code = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  req.app.locals.OTP = code;
  res.status(201).send({ code });
}
