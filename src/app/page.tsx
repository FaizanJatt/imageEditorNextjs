"use client"; // This is a client component

import Image from "next/image";
import slideImg from "../assets/slide.jpg";
import eyeIcon from "../assets/EyeIcon.svg";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [passwordState, setPasswordState] = useState<"password" | "text">(
    "password"
  );
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [actionState, setActionState] = useState<"register" | "login">("login");
  const [emailText, setEmailText] = useState<string>("");
  const [showRegisteredText, setShowRegisteredText] = useState<boolean>(false);
  const [passwordText, setPasswordText] = useState<string>("");
  const [confirmPasswordText, setConfirmPasswordText] = useState<string>("");

  const passwordStateToggleHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setPasswordState((prev) => {
      if (prev === "password") return "text";
      else {
        return "password";
      }
    });
  };

  const isLoginActionState = () => {
    if (actionState === "login") {
      return "bg-blue-500 text-white ";
    } else return "text-blue-500 border-2 border-solid border-blue-500";
  };
  const isRegisterActionState = () => {
    if (actionState === "register") {
      return "bg-blue-500 text-white ";
    } else return "text-blue-500 border-2 border-solid border-blue-500";
  };

  const setHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "password") {
      setPasswordText(event.target.value);
    } else if (event.target.name === "email") {
      setEmailText(event.target.value);
    } else if (event.target.name === "confirmPassword") {
      setConfirmPasswordText(event.target.value);
    }
  };
  const registerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (actionState === "login") {
      setActionState("register");
    } else if (
      isValidEmail() &&
      passwordText.length > 1 &&
      passwordText === confirmPasswordText
    ) {
      setFormErrors((prev) => {
        return { ...prev, email: false, password: false };
      });
      setPasswordText("");
      setConfirmPasswordText("");
      setEmailText("");
      setActionState("login");
      setShowRegisteredText(true);
      setTimeout(() => {
        setShowRegisteredText(false);
      }, 3000);
    } else {
      setFormErrors((prev) => {
        return {
          ...prev,
          password: passwordText.length < 1,
          confirmPassword: confirmPasswordText !== passwordText,
        };
      });
    }
  };
  const loginHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (actionState === "register") {
      setActionState("login");
    } else if (isValidEmail() && passwordText.length > 1) {
      router.push("http://localhost:3000/authorized");
      setFormErrors((prev) => {
        return { ...prev, email: false, password: false };
      });
    } else {
      setFormErrors((prev) => {
        return { ...prev, password: true };
      });
    }
  };
  function isValidEmail() {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailText)) {
      setFormErrors((prev) => {
        return { ...prev, email: false };
      });
      return true;
    } else {
      setFormErrors((prev) => {
        return { ...prev, email: true };
      });
      return false;
    }
  }

  return (
    <main className="flex min-h-screen  bg-white">
      <div className="z-10 justify-center items-center  flex flex-row w-full ">
        <div className="text-black flex w-1/2 justify-center items-center flex-col">
          <div className="text-gray-500 font-mono h-32">
            <p>START YOUR PERSONAL PHOTO EXPERIENCE</p>
            {showRegisteredText && (
              <p className="text-center font-mono text-green-700 mt-5">
                Successfully Registered
              </p>
            )}
          </div>
          <form>
            <div className="flex flex-col">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="font-semibold text-sm font-mono text-black">
                    Email
                  </label>
                </div>
                <input
                  type="email"
                  name="email"
                  className={`rounded-3xl font-mono mb-2 text-xs h-9 w-80 pl-5 border-gray-300 border-solid border-2 ${
                    formErrors.email && "border-red-300"
                  }`}
                  placeholder="Enter Email "
                  value={emailText}
                  onChange={setHandler}
                />
              </div>
              <div>
                <div className="mb-2 font-mono">
                  <label className="font-semibold font-mono text-sm text-black">
                    Password
                  </label>
                </div>
                <div className="flex-row">
                  <input
                    type={passwordState}
                    name="password"
                    onChange={setHandler}
                    className={`rounded-3xl font-mono h-9 w-80 pl-5 text-xs border-gray-300 border-solid border-2 mb-3 pr-7 ${
                      formErrors.password && "border-red-300"
                    }`}
                    placeholder="Enter Password"
                    value={passwordText}
                  />
                  <button
                    className="justify-center items-center -left-7 -bottom-1 relative"
                    onClick={passwordStateToggleHandler}
                  >
                    <Image
                      src={eyeIcon}
                      alt="Eye Icon"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
              {actionState === "register" && (
                <div>
                  <div className="mb-2 font-mono">
                    <label className="font-semibold font-mono text-sm text-black">
                      Confirm Password
                    </label>
                  </div>
                  <div className="flex-row">
                    <input
                      type={passwordState}
                      name="confirmPassword"
                      onChange={setHandler}
                      className={`rounded-3xl font-mono h-9 w-80 pl-5 text-xs border-gray-300 border-solid border-2 mb-3 pr-7 ${
                        formErrors.confirmPassword && "border-red-300"
                      }`}
                      placeholder="Confirm Password"
                      value={confirmPasswordText}
                    />
                    <button
                      className="justify-center items-center -left-7 -bottom-1 relative"
                      onClick={passwordStateToggleHandler}
                    >
                      <Image
                        src={eyeIcon}
                        alt="Eye Icon"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              )}

              <div className="font-mono mt-5 w-80 gap-2 justify-center items-center flex-row flex">
                <button
                  onClick={registerHandler}
                  className={`text-xs w-1/2 h-9  rounded-3xl  font-medium ${isRegisterActionState()}`}
                >
                  Register
                </button>
                <button
                  className={` text-xs w-1/2 h-9 rounded-3xl font-medium ${isLoginActionState()}`}
                  onClick={loginHandler}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className=" shadow-md h-full flex justify-center items-center w-1/2   ">
          <Image
            className="h-full"
            src={slideImg}
            alt="Picture of a jelly fish"
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </div>
      </div>
    </main>
  );
}
