import React from "react";
import { Navbar } from "@material-tailwind/react";
import Link from "next/link";
import shared from "../shared.json";
import Button from "./Button";
import { Button as MButton } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { NavProps } from "../types";

const Nav = ({ loggedIn }: NavProps) => {
  const router = useRouter();
  const redirectToSignup = () => {
    router.push("/signup");
  };
  const redirectToSignin = () => {
    router.push("/signin");
  };
  return (
    <Navbar
      className="py-2 bg-white border-b border-b-gray-100 rounded-none fixed top-0 left-0 z-10"
      fullWidth
    >
      <div className="md:max-w-screen-lg md:mx-auto flex flex-row items-center justify-between">
        <Link
          href="/"
          className="text-midnight-300 uppercase text-sm font-bold"
        >
          {shared.name}
        </Link>
        <div>
          <MButton
            className="bg-white text-blue-gray-500 mr-2 shadow-none border-none hover:shadow-none hover:text-midnight-300"
            onClick={redirectToSignup}
          >
            Signup
          </MButton>
          {loggedIn ? (
            <Button text="Signout" />
          ) : (
            <Button text="Login" onClick={redirectToSignin} />
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default Nav;
