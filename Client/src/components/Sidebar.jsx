import { NavLink } from "react-router";
import {
  EnvelopeIcon,
  ClockIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const links = [
    {
      name: "Generate",
      path: "/dashboard",
      icon: EnvelopeIcon,
    },
    {
      name: "History",
      path: "/dashboard/history",
      icon: ClockIcon,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Cog6ToothIcon,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/10 bg-slate-950 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex h-20 items-center border-b border-white/10 ${
          collapsed ? "justify-center" : "px-5"
        }`}
      >
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600">
            <EnvelopeIcon className="h-5 w-5 text-white" />
          </div>

          {!collapsed && (
            <span className="text-xl font-bold whitespace-nowrap">
              Mail<span className="text-red-400">Gen</span> AI
            </span>
          )}
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-3 py-6">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/dashboard"}
              title={collapsed ? link.name : undefined}
              className={({ isActive }) =>
                `flex items-center rounded-xl py-3 text-sm font-medium transition-all ${
                  collapsed ? "justify-center px-0" : "gap-3 px-4"
                } ${
                  isActive
                    ? "bg-red-500/10 text-red-400"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />

              {!collapsed && <span>{link.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`flex w-full items-center rounded-xl py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white ${
            collapsed ? "justify-center" : "gap-3 px-4"
          }`}
        >
          {collapsed ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeftIcon className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
