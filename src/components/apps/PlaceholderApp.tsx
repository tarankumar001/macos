import React from "react";

export default function PlaceholderApp({ title = "App" }: { title?: string }) {
  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="text-center text-gray-500 dark:text-gray-400">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p>This feature is currently under development.</p>
      </div>
    </div>
  );
}
