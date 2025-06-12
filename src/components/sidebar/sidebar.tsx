"use client";

import { useState } from "react";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

// this is the side bar component with navigation's
const SideBar = () => {
  // show if side bar is open or hidden
  const [isOpen, setIsOpen] = useState(false);

  // router from next
  const router = useRouter();

  // this returns the navigation links for tabs
  const renderNavigationButtons = () => (
    <>
      {/* Navigate on click */}
      <Button onClick={() => router.push("/overview")}>OverView</Button>
      <Button onClick={() => router.push("/task")}>Task</Button>
      <Button onClick={() => router.push("/message")}>message</Button>
    </>
  );

  return (
    <>
      {/* hidden in mobile */}
      <div className="hidden sm:block">
        <div className="flex flex-col gap-2 p-2 h-screen bg-white sm:max-w-[300px] sm:min-w-[200px] md:max-w-[500px] md:min-w-[300px]">
          {renderNavigationButtons()}
        </div>
      </div>

      {/* Hamburger Icon — only visible on small screens */}
      <div className="sm:hidden relative w-10">
        {/* Hamburger Icon */}
        <div className="absolute z-50 left-2 w-12 h-10">
          <Image
            src="/menu.svg" // Use absolute path
            alt="Menu"
            width={40}
            height={40}
            unoptimized
            className="w-10 h-10 p-2 rounded hover:bg-secondary-100 active:bg-white cursor-pointer"
            onClick={() => setIsOpen((s) => !s)}
          />
        </div>

        {/* Sidebar – only show if isOpen is true */}
        {isOpen && (
          <div className="absolute top-0 left-0 z-40 h-screen w-64 flex flex-col gap-2 border-2 bg-white rounded-sm pt-16 p-2">
            {renderNavigationButtons()}
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
