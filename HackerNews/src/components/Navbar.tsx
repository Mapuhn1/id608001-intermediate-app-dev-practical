import { NavLink } from "react-router";
import {
  Flame,
  TrendingUp,
  Award,
  MessageSquare,
  Eye,
  Briefcase,
  Trophy,
  Heart,
} from "lucide-react";

const Navbar = () => {
  const navItems = [
    { to: "/stories?type=top", label: "Top", icon: Flame },
    { to: "/stories?type=new", label: "New", icon: TrendingUp },
    { to: "/stories?type=best", label: "Best", icon: Award },
    { to: "/stories?type=ask", label: "Ask", icon: MessageSquare },
    { to: "/stories?type=show", label: "Show", icon: Eye },
    { to: "/stories?type=job", label: "Jobs", icon: Briefcase },
  ];

  const sideItems = [
    { to: "/leaders", label: "Leaders", icon: Trophy },
    { to: "/favourites", label: "Favourites", icon: Heart },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 mr-8">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-300 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span>
              HN Stories
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto flex-1 scrollbar-hide">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  ` px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2  ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-pink-300  text-white"
                      : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                  }`
                }
              >
                  <>
                    <Icon/>
                    <span>{label}</span>
                  </>
              </NavLink>
            ))}
          </div> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;