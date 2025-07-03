import { useState, useEffect } from "react";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helpers/helper";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  console.log(username);

  useEffect(() => {
    if (!username) return;

    const request = async () => {
      const response = await generateOTP(username);
      if (response) {
        toast.success("OTP has been sent to your email");
      } else {
        toast.error("Problem while generating OTP!");
      }
    };

    request();
  }, [username]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status } = await verifyOTP(username, Number(OTP));

      if (status === 201) {
        toast.success("Verify Successfully!");
        return navigate("/reset");
      }
    } catch (err) {
      console.log(err);
      return toast.error("Wrong OTP! Check email again!");
    }
  };

  const resendOTP = () => {
    toast.promise(generateOTP(username), {
      loading: "Sending...",
      success: <b>OTP has been sent to your email!</b>,
      error: <b>Could not send it!</b>,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[rgba(255,255,255,0.55)] border-4 border-gray-100 shrink-0 h-3/4 w-1/4 rounded-3xl py-20 px-7 min-w-max backdrop-blur-[7.1px] shadow-[0_4px_30px_#4747470b]">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>
          <form className="pt-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>

                <input
                  className="border-0 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none"
                  type="text"
                  placeholder="OTP"
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>

              <button
                className="border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-100 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
                type="submit"
              >
                Recover
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get OTP?
                <button
                  className="text-red-500 mx-2"
                  type="button"
                  onClick={resendOTP}
                >
                  Resend
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
