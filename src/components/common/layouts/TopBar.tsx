import { Menu, Text } from "@mantine/core";
import { IconBell, IconUser } from "@tabler/icons-react";
import { useUserStore } from "../../../stores/tokenStore";

const TopBar = () => {
  const { userProfile, setUserProfile } = useUserStore();

  const handleLogout = () => {
    setUserProfile(null);
  };
  return (
    <div className="flex justify-between items-center  text-black p-4 border-b shadow-lg">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold tracking-wide">
          {userProfile?.role}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Menu>
          <Menu.Target>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 relative">
              <IconBell className="w-6 h-6" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
          </Menu.Target>
          <Menu.Dropdown className="mt-2">
            <Menu.Item className="hover:bg-gray-100">
              <div className="py-2">
                <Text size="sm">Notification 1</Text>
              </div>
            </Menu.Item>
            <Menu.Item className="hover:bg-gray-100">
              <div className="py-2">
                <Text size="sm">Notification 2</Text>
              </div>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Menu>
          <Menu.Target>
            <div className="flex items-center space-x-3 p-2 hover:bg-white/10 rounded-full transition-colors duration-200 cursor-pointer">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <IconUser className="w-5 h-5" />
              </div>
              <span className="font-medium">{userProfile?.name}</span>
            </div>
          </Menu.Target>
          <Menu.Dropdown className="mt-2">
            <Menu.Item className="hover:bg-gray-100">
              <Text size="sm">Profile</Text>
            </Menu.Item>
            <Menu.Item className="hover:bg-gray-100" onClick={handleLogout}>
              <Text size="sm" color="red">
                Logout
              </Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default TopBar;
