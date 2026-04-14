import React from "react";

const categories = [
  { id: "discover", title: "Discover", icon: "i-bi:compass" },
  { id: "arcade", title: "Arcade", icon: "i-bi:controller" },
  { id: "create", title: "Create", icon: "i-bi:brush" },
  { id: "work", title: "Work", icon: "i-bi:briefcase" },
  { id: "play", title: "Play", icon: "i-bi:controller" },
  { id: "develop", title: "Develop", icon: "i-bi:code-slash" }
];

export default function AppStore() {
  const { dark } = useStore((state: any) => ({ dark: state.dark }));
  const [active, setActive] = React.useState("discover");
  const [downloading, setDownloading] = React.useState<number[]>([]);

  const handleDownload = (id: number) => {
    if (downloading.includes(id)) return;
    setDownloading((prev) => [...prev, id]);
    setTimeout(() => {
      setDownloading((prev) => prev.filter((appId) => appId !== id));
      window.alert("App installed successfully! (Simulated)");
    }, 2000);
  };

  return (
    <div
      className={`w-full h-full flex ${dark ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-800"} select-none`}
    >
      {/* Sidebar */}
      <div
        className={`w-48 flex-shrink-0 border-r ${dark ? "border-gray-700 bg-gray-900/50" : "border-gray-200 bg-gray-100/50"} p-3 flex flex-col`}
      >
        <div className="relative mb-4 mt-2">
          <span className="i-bi:search absolute left-2 top-1.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className={`w-full pl-8 pr-3 py-1 rounded-md text-sm outline-none border focus:border-blue-400 ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
          />
        </div>
        <div className="flex flex-col space-y-1">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex items-center space-x-2 px-2 py-1.5 rounded-md cursor-pointer transition ${active === cat.id ? (dark ? "bg-blue-600 text-white" : "bg-blue-500 text-white") : dark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
            >
              <span className={cat.icon} />
              <span className="text-sm">{cat.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">
          {categories.find((c) => c.id === active)?.title}
        </h1>

        {/* Hero Banner */}
        <div className="w-full h-48 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 flex flex-col justify-end shadow-lg mb-8 relative overflow-hidden cursor-pointer hover:opacity-95 transition">
          <div className="absolute top-0 right-0 p-4 opacity-30">
            <span className="i-bi:apple text-8xl" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
            Featured App
          </span>
          <h2 className="text-2xl font-bold">macOS Monterey</h2>
          <p className="text-sm opacity-90 mt-1">Supercharge your Mac.</p>
        </div>

        {/* Top Free Apps */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Top Free Apps</h3>
          <span className="text-blue-500 text-sm cursor-pointer hover:underline">
            See All
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: 1,
              name: "Xcode",
              dev: "Apple",
              desc: "Developer Tools",
              img: "i-bi:hammer",
              color: "bg-blue-600"
            },
            {
              id: 2,
              name: "Keynote",
              dev: "Apple",
              desc: "Productivity",
              img: "i-bi:easel",
              color: "bg-blue-500"
            },
            {
              id: 3,
              name: "Pages",
              dev: "Apple",
              desc: "Productivity",
              img: "i-bi:file-earmark-text",
              color: "bg-orange-500"
            },
            {
              id: 4,
              name: "Numbers",
              dev: "Apple",
              desc: "Productivity",
              img: "i-bi:bar-chart",
              color: "bg-green-500"
            }
          ].map((app) => (
            <div
              key={app.id}
              className={`flex items-center space-x-3 p-3 rounded-lg ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"} cursor-pointer transition`}
            >
              <div
                className={`w-12 h-12 rounded-lg ${app.color} flex items-center justify-center text-white shadow`}
              >
                <span className={`${app.img} text-2xl`} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{app.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{app.desc}</div>
              </div>
              <button
                onClick={() => handleDownload(app.id)}
                className={`w-16 h-7 rounded-full text-sm font-semibold flex items-center justify-center ${dark ? "bg-gray-700 text-blue-400" : "bg-gray-200 text-blue-600"} hover:opacity-80 transition`}
              >
                {downloading.includes(app.id) ? (
                  <span className="i-bi:arrow-clockwise animate-spin text-lg" />
                ) : (
                  "GET"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
