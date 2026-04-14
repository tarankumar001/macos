const prefs = [
  { id: "wifi", title: "Wi-Fi", icon: "i-material-symbols:wifi", color: "bg-blue-500" },
  {
    id: "bluetooth",
    title: "Bluetooth",
    icon: "i-charm:bluetooth",
    color: "bg-blue-500"
  },
  { id: "network", title: "Network", icon: "i-bi:globe", color: "bg-blue-500" },
  {
    id: "notifications",
    title: "Notifications",
    icon: "i-bi:bell-fill",
    color: "bg-red-500"
  },
  { id: "sound", title: "Sound", icon: "i-bi:volume-up-fill", color: "bg-orange-500" },
  { id: "focus", title: "Focus", icon: "i-bi:moon-fill", color: "bg-indigo-500" },
  {
    id: "screentime",
    title: "Screen Time",
    icon: "i-bi:hourglass-split",
    color: "bg-purple-500"
  },
  { id: "general", title: "General", icon: "i-bi:gear-fill", color: "bg-gray-500" },
  {
    id: "appearance",
    title: "Appearance",
    icon: "i-bi:palette-fill",
    color: "bg-blue-500"
  },
  {
    id: "accessibility",
    title: "Accessibility",
    icon: "i-bi:person-check-fill",
    color: "bg-blue-500"
  },
  {
    id: "controlcenter",
    title: "Control Center",
    icon: "i-bi:sliders",
    color: "bg-gray-500"
  },
  { id: "siri", title: "Siri & Spotlight", icon: "i-bi:mic-fill", color: "bg-blue-500" },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: "i-bi:shield-lock-fill",
    color: "bg-blue-500"
  },
  { id: "displays", title: "Displays", icon: "i-bi:display", color: "bg-blue-500" },
  { id: "battery", title: "Battery", icon: "i-bi:battery-half", color: "bg-green-500" }
];

export default function SystemPreferences() {
  const { dark, wifi, bluetooth } = useStore((state: any) => ({
    dark: state.dark,
    wifi: state.wifi,
    bluetooth: state.bluetooth
  }));
  const { toggleWIFI, toggleBluetooth, toggleDark, toggleFullScreen } = useStore(
    (state: any) => ({
      toggleWIFI: state.toggleWIFI,
      toggleBluetooth: state.toggleBluetooth,
      toggleDark: state.toggleDark,
      toggleFullScreen: state.toggleFullScreen
    })
  );

  const handlePrefClick = (id: string) => {
    switch (id) {
      case "wifi":
        toggleWIFI();
        break;
      case "bluetooth":
        toggleBluetooth();
        break;
      case "appearance":
        toggleDark();
        break;
      case "displays":
        toggleFullScreen();
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col ${dark ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-800"} p-5 select-none overflow-y-auto`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">System Preferences</h2>
        <div className="relative">
          <span className="i-bi:search absolute left-2 top-1.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className={`pl-8 pr-3 py-1 rounded-md text-sm outline-none border focus:border-blue-400 ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
          P
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-lg">P.Tarankumar</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Apple ID, iCloud, Media & Purchases
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-x-4 gap-y-6">
        {prefs.map((pref) => {
          let isActive = false;
          if (pref.id === "wifi") isActive = wifi;
          if (pref.id === "bluetooth") isActive = bluetooth;
          if (pref.id === "appearance") isActive = dark;

          return (
            <div
              key={pref.id}
              className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition"
              onClick={() => handlePrefClick(pref.id)}
            >
              <div
                className={`w-12 h-12 rounded-lg ${pref.color} flex items-center justify-center shadow focus:outline-none relative`}
              >
                <span className={`${pref.icon} text-white text-2xl`} />
                {["wifi", "bluetooth", "appearance"].includes(pref.id) && (
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${dark ? "border-gray-800" : "border-white"} ${isActive ? "bg-green-400" : "bg-gray-400"}`}
                  />
                )}
              </div>
              <span className="text-xs text-center leading-tight mt-1">{pref.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
