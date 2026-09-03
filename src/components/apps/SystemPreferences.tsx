import React, { useState } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

const categories = [
  { id: "wifi", title: "Wi-Fi", icon: "i-material-symbols:wifi", color: "bg-blue-500" },
  {
    id: "bluetooth",
    title: "Bluetooth",
    icon: "i-charm:bluetooth",
    color: "bg-blue-500"
  },
  {
    id: "airdrop",
    title: "AirDrop",
    icon: "i-material-symbols:rss-feed-rounded",
    color: "bg-blue-500"
  },
  { id: "general", title: "General", icon: "i-bi:gear-fill", color: "bg-gray-500" },
  {
    id: "appearance",
    title: "Appearance",
    icon: "i-bi:palette-fill",
    color: "bg-blue-500"
  },
  {
    id: "desktop-dock",
    title: "Desktop & Dock",
    icon: "i-bi:layout-split",
    color: "bg-gray-500"
  },
  { id: "displays", title: "Displays", icon: "i-bi:display", color: "bg-blue-500" },
  { id: "sound", title: "Sound", icon: "i-bi:volume-up-fill", color: "bg-orange-500" },
  { id: "battery", title: "Battery", icon: "i-bi:battery-half", color: "bg-green-500" },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: "i-bi:shield-lock-fill",
    color: "bg-blue-500"
  }
];

export default function SystemPreferences() {
  const [activeTab, setActiveTab] = useState("appearance");
  const batteryState = useBattery();

  const { dark, wifi, bluetooth, airdrop, volume, brightness, dockSize, dockMag } =
    useStore((state: any) => ({
      dark: state.dark,
      wifi: state.wifi,
      bluetooth: state.bluetooth,
      airdrop: state.airdrop,
      volume: state.volume,
      brightness: state.brightness,
      dockSize: state.dockSize,
      dockMag: state.dockMag
    }));

  const {
    toggleWIFI,
    toggleBluetooth,
    toggleAirdrop,
    toggleDark,
    toggleFullScreen,
    setVolume,
    setBrightness,
    setDockSize,
    setDockMag
  } = useStore((state: any) => ({
    toggleWIFI: state.toggleWIFI,
    toggleBluetooth: state.toggleBluetooth,
    toggleAirdrop: state.toggleAirdrop,
    toggleDark: state.toggleDark,
    toggleFullScreen: state.toggleFullScreen,
    setVolume: state.setVolume,
    setBrightness: state.setBrightness,
    setDockSize: state.setDockSize,
    setDockMag: state.setDockMag
  }));

  const renderContent = () => {
    switch (activeTab) {
      case "appearance":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Appearance</h2>
            <div className="flex space-x-6">
              <div
                className="flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => dark && toggleDark()}
              >
                <div
                  className={`w-36 h-24 rounded-lg bg-gray-200 border-4 ${!dark ? "border-blue-500" : "border-transparent"}`}
                />
                <span>Light</span>
              </div>
              <div
                className="flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => !dark && toggleDark()}
              >
                <div
                  className={`w-36 h-24 rounded-lg bg-gray-800 border-4 ${dark ? "border-blue-500" : "border-transparent"}`}
                />
                <span>Dark</span>
              </div>
            </div>
          </div>
        );
      case "desktop-dock":
        return (
          <div className="space-y-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Desktop & Dock</h2>
            <div>
              <div className="flex justify-between mb-2">
                <span>Size: {dockSize}</span>
              </div>
              <Slider
                min={20}
                max={80}
                value={dockSize}
                tooltip={false}
                onChange={setDockSize}
              />
            </div>
            <br />
            <div>
              <div className="flex justify-between mb-2">
                <span>Magnification: {dockMag}</span>
              </div>
              <Slider
                min={0}
                max={10}
                value={dockMag}
                tooltip={false}
                onChange={setDockMag}
              />
            </div>
          </div>
        );
      case "displays":
        return (
          <div className="space-y-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Displays</h2>
            <div>
              <div className="flex justify-between mb-2">
                <span>Brightness</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="i-bi:sun text-xl" />
                <div className="flex-1">
                  <Slider
                    min={1}
                    max={100}
                    value={brightness}
                    tooltip={false}
                    onChange={setBrightness}
                  />
                </div>
              </div>
            </div>
            <button
              className={`mt-4 px-4 py-2 rounded-md ${dark ? "bg-gray-700" : "bg-gray-200"}`}
              onClick={() => toggleFullScreen(true)}
            >
              Enter / Exit Fullscreen
            </button>
          </div>
        );
      case "sound":
        return (
          <div className="space-y-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Sound</h2>
            <div>
              <div className="flex justify-between mb-2">
                <span>Output Volume</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="i-bi:volume-up text-xl" />
                <div className="flex-1">
                  <Slider
                    min={1}
                    max={100}
                    value={volume}
                    tooltip={false}
                    onChange={setVolume}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "wifi":
        return (
          <div className="space-y-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Wi-Fi</h2>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-500/10">
              <span className="font-semibold">Wi-Fi Connection</span>
              <button
                onClick={toggleWIFI}
                className={`w-12 h-6 rounded-full transition-colors relative ${wifi ? "bg-green-500" : "bg-gray-400"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${wifi ? "translate-x-7" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>
        );
      case "bluetooth":
        return (
          <div className="space-y-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Bluetooth</h2>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-500/10">
              <span className="font-semibold">Bluetooth Connection</span>
              <button
                onClick={toggleBluetooth}
                className={`w-12 h-6 rounded-full transition-colors relative ${bluetooth ? "bg-blue-500" : "bg-gray-400"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${bluetooth ? "translate-x-7" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>
        );
      case "airdrop":
        return (
          <div className="space-y-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">AirDrop</h2>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-500/10">
              <div className="flex flex-col">
                <span className="font-semibold">AirDrop Visibility</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Allow others to send files to this Mac.
                </span>
              </div>
              <button
                onClick={toggleAirdrop}
                className={`w-12 h-6 rounded-full transition-colors relative ${airdrop ? "bg-blue-500" : "bg-gray-400"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${airdrop ? "translate-x-7" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>
        );
      case "general":
        return (
          <div className="space-y-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">General</h2>
            <div className="flex flex-col p-4 rounded-lg bg-gray-500/10 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-500/30">
                <span>About</span>
                <span className="i-bi:chevron-right text-c-500" />
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-500/30">
                <span>Software Update</span>
                <span className="i-bi:chevron-right text-c-500" />
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-500/30">
                <span>Storage</span>
                <span className="i-bi:chevron-right text-c-500" />
              </div>
              <div className="flex justify-between items-center">
                <span>AirDrop & Handoff</span>
                <span className="i-bi:chevron-right text-c-500" />
              </div>
            </div>
          </div>
        );
      case "battery":
        return (
          <div className="space-y-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Battery</h2>
            <div className="flex flex-col p-6 rounded-lg bg-gray-500/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">
                    {(batteryState.level * 100).toFixed()}%
                  </span>
                  <span
                    className={`text-sm ${batteryState.charging ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}`}
                  >
                    {batteryState.charging ? "Charging" : "Running on Battery"}
                  </span>
                </div>
                <span
                  className={`${batteryState.charging ? "i-bi:battery-charging text-green-500" : "i-bi:battery-half text-gray-500"} text-5xl`}
                />
              </div>
              <div className="h-px bg-gray-500/30 my-2" />
              <div className="flex justify-between items-center">
                <span>Low Power Mode</span>
                <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm hover:opacity-80">
                  Never
                </button>
              </div>
            </div>
          </div>
        );
      case "privacy":
        return (
          <div className="space-y-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Privacy & Security</h2>
            <div className="flex flex-col bg-gray-500/10 rounded-lg overflow-hidden">
              {[
                { title: "Location Services", status: "On" },
                { title: "Contacts", status: "2 Apps" },
                { title: "Calendars", status: "0 Apps" },
                { title: "Photos", status: "4 Apps" },
                { title: "Microphone", status: "1 App" },
                { title: "Camera", status: "2 Apps" }
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`flex justify-between p-3 ${i !== 5 ? "border-b border-gray-500/30" : ""}`}
                >
                  <span>{item.title}</span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 space-x-2">
                    <span className="text-sm">{item.status}</span>
                    <span className="i-bi:chevron-right" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="text-gray-500 mt-10">Select a category</div>;
    }
  };

  return (
    <div
      className={`w-full h-full flex ${dark ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-800"} select-none`}
    >
      {/* Sidebar */}
      <div
        className={`w-60 flex-shrink-0 border-r ${dark ? "border-gray-700 bg-gray-900/40" : "border-gray-200 bg-gray-200/40"} p-3 flex flex-col`}
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
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center space-x-3 px-2 py-1.5 rounded-md cursor-pointer transition ${activeTab === cat.id ? (dark ? "bg-blue-600 text-white" : "bg-blue-500 text-white") : dark ? "hover:bg-gray-700" : "hover:bg-gray-300"}`}
            >
              <div
                className={`w-6 h-6 rounded flex items-center justify-center ${cat.color}`}
              >
                <span className={`${cat.icon} text-white font-bold text-sm`} />
              </div>
              <span className="text-sm font-medium">{cat.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">{renderContent()}</div>
    </div>
  );
}
