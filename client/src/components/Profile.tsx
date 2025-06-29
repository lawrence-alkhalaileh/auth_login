import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import { useFormik } from "formik";
import { profileValidation } from "../helpers/validate";
import { convertToBase64 } from "../helpers/convert";
import useFetch from "../hooks/useFetch";
import { updateUser } from "../helpers/helper";
import toast from "react-hot-toast";

export function Profile() {
  const navigate = useNavigate();
  const [{ isLoading, apiData, serverError }] = useFetch("");
  const [file, setFile] = useState<string | undefined>("");

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      const updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Updating..",
        success: <b>Update Successfully</b>,
        error: <b>Could not Update!</b>,
      });
    },
  });

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setFile(base64);
  };

  const userLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (isLoading) return <h1 className="text-2xl font-bold">Loading ...</h1>;

  if (serverError) {
    <h1 className="text-2xl text-red-500">
      server error: {serverError.message}
    </h1>;
  }

  return (
    <div className="mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[rgba(255,255,255,0.55)] border-4 border-gray-100 shrink-0 h-[95%] w-[45%] rounded-3xl py-10 px-10 min-w-max backdrop-blur-[7.1px] shadow-[0_4px_30px_#4747470b]">
          <div className="flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-3 text-xl w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>
          <form className="py-2" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center -mt-4">
              <label htmlFor="profile">
                <img
                  className="w-40 cursor-pointer mb-5 border-4 border-gray-100 rounded-full shadow-lg hover:border-gray-200"
                  src={apiData?.profile || file || avatar}
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
              <div className="flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("lastName")}
                  className="border-0 px-6 py-5 rounded-xl w-[85%] shadow-sm text-lg focus:outline-none"
                  type="text"
                  placeholder="Last Name"
                />
                <input
                  {...formik.getFieldProps("firstName")}
                  className="border-0 px-6 py-5 rounded-xl w-[85%] shadow-sm text-lg focus:outline-none"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className="border-0 px-6 py-5 rounded-xl w-[85%] shadow-sm text-lg focus:outline-none"
                  type="text"
                  placeholder="Mobile Number"
                />
                <input
                  {...formik.getFieldProps("email")}
                  className="border-0 px-6 py-5 rounded-xl w-[85%] shadow-sm text-lg focus:outline-none"
                  type="text"
                  placeholder="Email"
                />
              </div>

              <div className="flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("address")}
                  className="border-0 px-6 py-5 rounded-xl w-full shadow-sm text-lg focus:outline-none"
                  type="text"
                  placeholder="Address"
                />
              </div>
              <button
                className="border bg-indigo-500 w-[76%] py-5 rounded-lg text-gray-100 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
                type="submit"
              >
                Update
              </button>
            </div>

            <div className="text-center py-5">
              <span className="text-gray-500">
                Come Back Later?
                <button className="text-red-500 mx-2" onClick={userLogOut}>
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
