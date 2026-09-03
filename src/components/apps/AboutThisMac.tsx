import React from "react";
import user from "~/configs/user";

export default function AboutThisMac() {
  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 flex flex-col items-center justify-center select-none cursor-default">
      <img
        src={user.avatar}
        alt="Avatar"
        className="w-24 h-24 rounded-full mb-4 object-cover"
      />
      <h2 className="text-2xl font-bold mb-1">macOS Monterey</h2>
      <p className="text-sm mb-4">Version 12.4</p>

      <div className="w-64 text-xs flex flex-col space-y-1 mt-2">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600 dark:text-gray-300">
            Processor
          </span>
          <span>Apple M1</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600 dark:text-gray-300">Memory</span>
          <span>16 GB</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600 dark:text-gray-300">
            Startup Disk
          </span>
          <span>Macintosh HD</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600 dark:text-gray-300">Graphics</span>
          <span>Apple M1</span>
        </div>
      </div>

      <div className="mt-8 text-xs text-gray-400">™ and © 1983-2022 Apple Inc.</div>
    </div>
  );
}
