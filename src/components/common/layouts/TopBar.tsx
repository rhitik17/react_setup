import { Menu } from "@mantine/core";
import { IconBell, IconUser } from "@tabler/icons-react";
import { useUserStore } from "../../../stores/tokenStore";

const TopBar = () => {
  const { userProfile, setUserProfile } = useUserStore();

  const handleLogout = () => {
    setUserProfile(null);
  };
  return (
    <div className="flex justify-between items-center bg-[#6a00f4] text-white p-4 border-b">
      <h1 className="text-xl">Dashboard</h1>
      <div className="flex items-center">
        <Menu>
          <Menu.Target>
            <button className="p-2 hover:bg-gray-700 rounded">
              <IconBell />
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Notification 1</Menu.Item>
            <Menu.Item>Notification 2</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu>
          <Menu.Target>
            <button className="p-2 hover:bg-gray-700 rounded">
              <IconUser />
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default TopBar;
