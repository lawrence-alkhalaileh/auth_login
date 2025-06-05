import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import { useFormik } from "formik";
import { registerValidation } from "../helpers/validate";
import { convertToBase64 } from "../helpers/convert";

export function Register() {
  const [file, setFile] = useState<string | undefined>("");
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setFile(base64);
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[rgba(255,255,255,0.55)] border-4 border-gray-100 shrink-0 h-[95%] w-[45%] rounded-3xl py-10 px-10 min-w-max backdrop-blur-[7.1px] shadow-[0_4px_30px_#4747470b]">
          <div className="flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-3 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>
          <form className="py-2" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center -mt-4">
              <label htmlFor="profile">
                <img
                  className="mb-5 border-4 border-gray-100 w-[160px] rounded-full shadow-lg cursor-pointer hover:border-gray-200"
                  src={file || avatar}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
                className="hidden"
              />
            </div>
            <div className="flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className="border-0 px-6 py-5 rounded-xl w-[85%] shadow-sm text-lg focus:outline-none"
                type="text"
                placeholder="Email"
                required
              />
              <input
                {...formik.getFieldProps("username")}
                className="border-0 px-6 py-5 rounded-xl w-[85%] shadow-sm text-lg focus:outline-none"
                type="email"
                placeholder="Username"
                required
              />
              <input
                {...formik.getFieldProps("password")}
                className="border-0 px-6 py-5 rounded-xl w-[85%] shadow-sm text-lg focus:outline-none"
                type="password"
                placeholder="Password"
                required
              />
              <button
                className="border bg-indigo-500 w-[85%] py-5 rounded-lg text-gray-100 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
                type="submit"
              >
                Register
              </button>
            </div>

            <div className="text-center py-5">
              <span className="text-gray-500">
                Already has an account
                <Link className="text-red-500 mx-2" to="/">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
