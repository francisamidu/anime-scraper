import { Button, Input } from "@material-tailwind/react";
import React from "react";
import shared from "../shared.json";

const Header = () => {
  return (
    <header className="header min-h-[96vh]">
      <div className="overlay w-full h-screen p-7 flex flex-col justify-center">
        <h1 className="my-2 text-white text-2xl font-bold">{shared.name}</h1>
        <h2 className="my-2 text-blue-gray-100">{shared.description}</h2>
        <form>
          <div className="flex flex-row">
            <Input placeholder="Subscribe to animescraper" />
            <Button color="green">Subscribe</Button>
          </div>
          <span className="text-green-600">
            You have subscribed! Check your email for the confirmatio
          </span>
        </form>
      </div>
    </header>
  );
};

export default Header;
