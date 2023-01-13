import { Button, Input } from "@material-tailwind/react";
import React from "react";
import shared from "../shared.json";
import Image from "next/image";

const Header = () => {
  return (
    <header className="min-h-[94vh] p-5">
      <div className="md:max-w-screen-xl md:mx-auto flex flex-row items-center">
        <div className="w-2/5">
          <Image
            src="/image.jpg"
            className="rounded"
            alt="Image here"
            width="500"
            height="500"
          />
        </div>
        <div className="w-3/5 h-screen p-7 flex flex-col justify-center">
          <h1 className="my-2 text-blue-gray-700 text-2xl font-bold">
            {shared.name}
          </h1>
          <h2 className="my-3 text-blue-gray-600">{shared.description}</h2>
          <form>
            <div className="flex flex-row items-center">
              <input
                placeholder="Enter your email address"
                className="w-3/5 p-2 rounded-lg border-blue-gray-50 border-[1px] mr-2"
              />
              <Button color="green" className="!w-max">
                Subscribe Now
              </Button>
            </div>
            <span className="text-green-600 mt-2">
              You have subscribed! Check your email for the confirmation
            </span>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
