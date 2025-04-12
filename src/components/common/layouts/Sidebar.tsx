import { NavLink, useLocation } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { useUserStore } from "../../../stores/tokenStore";

const navItems = [
  { to: "/dashboard", icon: <Icons.Home className="mr-2" />, label: "Dashboard" },
  { to: "/predict", icon: <Icons.Stethescope className="mr-2" />, label: "Predict Disease" },
  { to: "/doctors", icon: <Icons.Stethescope className="mr-2" />, label: "Doctors" },
  { to: "/consultation", icon: <Icons.Calender className="mr-2" />, label: "Consultation" },
  { to: "/chats", icon: <Icons.MessageCircle className="mr-2" />, label: "Chat" },
  { to: "/medical-history", icon: <Icons.History className="mr-2" />, label: "Medical History" },
  { to: "/settings", icon: <Icons.Settings className="mr-2" />, label: "Settings" },
  { to: "/logout", icon: <Icons.LogOut className="mr-2" />, label: "Logout" },
];

const Sidebar = () => {

  const location = useLocation();
  const {userProfile} = useUserStore();

  return (
    <div className="h-screen w-3/12 bg-primary_bg   flex flex-col  ">
    {/* Logo / App Name */}
    <div className="p-6 ">
          <h1 className="text-2xl font-bold text-blue-600">{userProfile?.role}</h1>
        </div>
      <ul className="space-y-1">
        {navItems.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3  font-medium hover:bg-blue-100 transition-all${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600"
                }`
              }
            >
              {icon} {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
