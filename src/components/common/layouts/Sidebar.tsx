import { NavLink } from "react-router-dom";
import {
  IconHome,
  IconStethoscope,
  IconCalendar,
  IconMessageCircle,
  IconHistory,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

const Sidebar = () => {
  return (
    <div className=" text-black shadow-lg border border-gray-300  w-64 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className="flex items-center p-2 hover:bg-white  hover:scale-105 transition-all ease-in-out duration-300"
          >
            <IconHome className="mr-2" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/predict"
            className="flex items-center p-2 hover:bg-gray-700"
          >
            <IconStethoscope className="mr-2" /> Predict Disease
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors"
            className="flex items-center p-2 hover:bg-gray-700"
          >
            <IconStethoscope className="mr-2" /> Doctors
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/consultation"
            className="flex items-center p-2 hover:bg-gray-700"
          >
            <IconCalendar className="mr-2" /> Consultation
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/chats"
            className="flex items-center p-2 hover:bg-gray-700"
          >
            <IconMessageCircle className="mr-2" /> Chat
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/medical-history"
            className="flex items-center p-2 hover:bg-gray-700"
          >
            <IconHistory className="mr-2" /> Medical History
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className="flex items-center p-2 hover:bg-gray-700"
          >
            <IconSettings className="mr-2" /> Settings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            className="flex items-center p-2 hover:bg-gray-700"
          >
            <IconLogout className="mr-2" /> Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
