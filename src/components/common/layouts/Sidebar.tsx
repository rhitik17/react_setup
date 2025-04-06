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
    <div className="bg-[#6a00f4] text-white w-64 h-[90vh] p-4">
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className="flex items-center p-2 hover:bg-gray-700"
          >
            <IconHome className="mr-2" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/predict-disease"
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
            to="/appointments"
            className="flex items-center p-2 hover:bg-gray-700"
          >
            <IconCalendar className="mr-2" /> Appointments
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/chat"
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
