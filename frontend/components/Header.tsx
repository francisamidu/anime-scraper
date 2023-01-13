import { Button, Input } from "@material-tailwind/react";
import React from "react";
import shared from "../shared.json";
import Image from "next/image";

const Header = () => {
  return (
    <header className="min-h-[96vh] flex flex-row items-center">
      <div className="md:max-w-xl md:mx-auto">
        <div className="w-2/5">
          <Image src="/image.jpg" className="w-full" alt="Image here" />
        </div>
        <div className="w-3/5 h-screen p-7 flex flex-col justify-center">
          <h1 className="my-2 text-white text-2xl font-bold">{shared.name}</h1>
          <h2 className="my-2 text-blue-gray-100">{shared.description}</h2>
          <form>
            <div className="flex flex-row">
              <Input placeholder="Enter your email address" className="w-3/5" />
              <Button color="green">Subscribe Now</Button>
            </div>
            <span className="text-green-600 w-max">
              You have subscribed! Check your email for the confirmation
            </span>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
