import React from "react";
import shared from "../shared.json";

const Header = () => {
  return (
    <header className="header p-4 min-h-[96vh] flex flex-col justify-center">
      <div className="overlay w-full h-full">
        <h1 className="my-2 text-white text-center text-2xl font-bold">
          {shared.name}
        </h1>
        <h2 className="my-2 text-blue-gray-100 text-center">
          {shared.description}
        </h2>
      </div>
    </header>
  );
};

export default Header;
