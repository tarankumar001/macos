import React from "react";

interface AppleMenuProps {
  logout: () => void;
  shut: (e: React.MouseEvent<HTMLLIElement>) => void;
  restart: (e: React.MouseEvent<HTMLLIElement>) => void;
  sleep: (e: React.MouseEvent<HTMLLIElement>) => void;
  toggleAppleMenu: () => void;
  btnRef: React.RefObject<HTMLDivElement>;
  closeAllApps: () => void;
  openApp: (id: string) => void;
  recentApps: string[];
  setRecentApps: (apps: string[]) => void;
}

export default function AppleMenu({
  logout,
  shut,
  restart,
  sleep,
  toggleAppleMenu,
  btnRef,
  closeAllApps,
  openApp,
  recentApps,
  setRecentApps
}: AppleMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [showRecent, setShowRecent] = useState(false);

  useClickOutside(ref, toggleAppleMenu, [btnRef]);

  return (
    <div className="menu-box left-2 w-56" ref={ref}>
      <MenuItemGroup>
        <MenuItem
          onClick={() => {
            openApp("about");
            toggleAppleMenu();
          }}
        >
          About This Mac
        </MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem
          onClick={() => {
            openApp("system-preferences");
            toggleAppleMenu();
          }}
        >
          System Preferences...
        </MenuItem>
        <MenuItem
          onClick={() => {
            openApp("app-store");
            toggleAppleMenu();
          }}
        >
          App Store...
        </MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <div
          className="relative"
          onMouseEnter={() => setShowRecent(true)}
          onMouseLeave={() => setShowRecent(false)}
        >
          <MenuItem>
            <div className="flex justify-between w-full items-center">
              <span>Recent Items</span>
              <span className="i-bi:chevron-right text-c-500" />
            </div>
          </MenuItem>

          {showRecent && (
            <div className="absolute left-full top-0 ml-1 w-48 text-c-black bg-c-200/90 border border-menu rounded-lg shadow-menu">
              <MenuItemGroup border={false}>
                {recentApps.length > 0 ? (
                  recentApps.map((app) => (
                    <MenuItem
                      key={app}
                      onClick={() => {
                        openApp(app);
                        toggleAppleMenu();
                      }}
                    >
                      {app === "bear"
                        ? "Finder"
                        : app.charAt(0).toUpperCase() + app.slice(1)}
                    </MenuItem>
                  ))
                ) : (
                  <div className="px-5 py-1 text-gray-500 text-sm cursor-default">
                    None
                  </div>
                )}
                <div className="h-px bg-gray-500/50 my-1 mx-2" />
                <MenuItem
                  onClick={() => {
                    setRecentApps([]);
                    toggleAppleMenu();
                  }}
                >
                  Clear Menu
                </MenuItem>
              </MenuItemGroup>
            </div>
          )}
        </div>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem
          onClick={() => {
            closeAllApps();
            toggleAppleMenu();
          }}
        >
          Force Quit...
        </MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem
          onClick={(e) => {
            sleep(e);
            toggleAppleMenu();
          }}
        >
          Sleep
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            restart(e);
            toggleAppleMenu();
          }}
        >
          Restart...
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            shut(e);
            toggleAppleMenu();
          }}
        >
          Shut Down...
        </MenuItem>
      </MenuItemGroup>
      <MenuItemGroup border={false}>
        <MenuItem
          onClick={() => {
            logout();
            toggleAppleMenu();
          }}
        >
          Lock Screen
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            toggleAppleMenu();
          }}
        >
          Log Out Tarankumar...
        </MenuItem>
      </MenuItemGroup>
    </div>
  );
}
