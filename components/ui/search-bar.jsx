"use client";

import { cn } from "@/lib/utils";
import { IoMdSearch } from "react-icons/io";

export default function SearchBar({ isScrolled, mobile,t }) {
  return (
    <div className="flex flex-1 transition-all duration-300 rounded-md h-full p-px bg-linear-to-r from-primary to-blue-800">
      <div className="flex p-2 bg-card text-[#1b1b1b] flex-1  gap-2 w-full relative px-4 py-2 h-full  items-center transform duration-200 ease-in-out rounded-md overflow-x-clip">
        <IoMdSearch
          className={cn(" h-5 w-5  duration-300 z-10 text-[#1b1b1b]")}
        />
        <input
          id="search-item"
          type="text"
          placeholder={t('placeholder-search')}
          className={cn(
            "w-full text-sm outline-none transition-all duration-300 placeholder:italic",
            "focus:ring-0 ",
            "placeholder:text-[#1b1b1baa]"
          )}
        />
        {!mobile && (
          <div
            className={cn(
              "flex items-center gap-1 transition-all duration-300 text-muted-foreground"
            )}
          >
            <kbd
              className={cn(
                "px-1.5 py-0 bg-gray-100 rounded-md text-tiny "
              )}
            >
              <span className="text-[#1b1b1b]">Ctrl</span>
            </kbd>
            <span className="text-[#1b1b1b] text-tiny">+</span>
            <kbd
              className={cn("px-1.5 py-0.5 bg-gray-100 rounded-md text-tiny")}
            >
              <span className="text-[#1b1b1b]">F</span>
            </kbd>
          </div>
        )}
      </div>
    </div>
  );
}
