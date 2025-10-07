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
};

export default Navbar;