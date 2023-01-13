import { Button } from "@material-tailwind/react";
import React from "react";
import shared from "../shared.json";
import Image from "next/image";

const tags = ["animes", "reviews", "videos", "new releases"];
const Header = () => {
  return (
    <header className="min-h-[90vh] flex flex-row justify-center items-center">
      <div className="md:max-w-screen-xl md:mx-auto flex flex-row flex-start p-5">
        <div className="w-1/2">
          <Image
            src="/image.jpg"
            className="rounded-md w-full"
            alt="Image here"
            width="670"
            height="670"
          />
        </div>
        <div className="w-1/2 ml-5 flex flex-col">
          <div className="flex flex-row items-center">
            {tags.map((tag, index) =>
              tags.length - index !== 1 ? (
                <>
                  <span
                    className="uppercase text-xs font-bold text-midnight-500"
                    key={index}
                  >
                    {tag}
                  </span>
                  <span className="mx-3 text-midnight-500">-</span>
                </>
              ) : (
                <span
                  className="uppercase text-xs font-bold text-midnight-500"
                  key={index}
                >
                  {tag}
                </span>
              )
            )}
          </div>
          <h1 className="my-2 text-midnight-500 text-5xl font-bold">
            {shared.name}
          </h1>
          <h2 className="my-3 text-blue-gray-600">{shared.description}</h2>
          <form>
            <div className="flex flex-row items-center mb-2">
              <input
                placeholder="Enter your email address"
                className="w-3/5 p-2 rounded-lg border-blue-gray-50 border-[1px] mr-2"
              />
              <Button color="green" className="!w-max !bg-midnight-500">
                Subscribe Now
              </Button>
            </div>
            <span className="text-midnight-500">
              You have subscribed! Check your email for the confirmation
            </span>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
