import React, { useState } from "react";
import { useGlobalContext } from "../context/context";
import {
  AiFillMail,
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCheck,
} from "react-icons/ai";
import { BsKeyFill } from "react-icons/bs";
function SignIn() {
  const {
    isSigninOpen,
    setIsSigninOpen,
    toggleSignin,
    remember,
    setRemember,
    toggleRemember,
    isTimerOpen,
    setIsTimerOpen,
    bgColor,
  } = useGlobalContext();
  const [showPass, setShowPass] = useState(false);
  return (
    <div
      className={`sign-in absolute top-[calc(50%-40%)] left-[calc(50%-40%)] flex justify-center ${bgColor} w-[80%] h-[70%] lg:h-[80%] rounded-lg duration-500 text-white text-base md:text-3xl ${
        isSigninOpen ? "opacity-1 z-50" : "opacity-0 -z-10"
      } `}
    >
      <div className="h-full w-full md:w-[80%] p-10 flex flex-col items-start justify-center gap-10 rounded-xl ">
        <div className="sign-in-title font-bold">
          Sign In
        </div>
        <div className="sign-up-text flex items-end">
          Don’t have an account?
          <div className="sign-up-btn  ml-2 cursor-pointer animate-[colorChange_2.5s_infinite]">
            Sign up
          </div>
        </div>
        <form
          action="submit"
          className="flex flex-col w-full  gap-10 text-lg"
        >
          <div className="input-field  relative w-full flex items-center ">
            <AiFillMail className="absolute left-5 text-xl md:text-2xl  lg:text-3xl" />
            <input
              className="bg-[#5c5c5c]/50 h-12 md:h-16 w-full border-[1px] border-[#ffffff] rounded-md pl-12 md:text-3xl "
              placeholder="this.is.a.mail@mail"
              type="email"
              required
            />
          </div>
          <div className="input-field relative w-full flex items-center">
            <BsKeyFill className="absolute left-5 text-xl md:text-2xl  lg:text-3xl" />
            <input
              className="bg-[#5c5c5c]/50 h-12 md:h-16 w-full border-[1px] border-[#ffffff] rounded-md pl-12 md:text-3xl"
              placeholder="************"
              type={showPass ? "text" : "password"}
              required
            />
            <div
              className="visibility-toggler absolute right-5 text-xl lg:text-2xl"
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              {showPass ? (
                <AiFillEye className={``} />
              ) : (
                <AiFillEyeInvisible className="" />
              )}
            </div>
          </div>
          <div className="remember-container flex capitalize">
            <button
              type="button"
              onClick={toggleRemember}
              className="remember-credential mr-3 rounded-sm w-[28px] aspect-square grid place-items-center bg-[#464cda] border-[1px] border-[#ffffff]"
            >
              {remember ? (
                <AiOutlineCheck className="" />
              ) : (
                ""
              )}
            </button>
            remember
          </div>
          <button
            type="button"
            className="sign-in-btn bg-[#464cda] rounded-md h-12"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
