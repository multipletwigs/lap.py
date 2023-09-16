import { NavigationItemProps } from "./navigation";

const NavBarCopy: Record<string, NavigationItemProps> = {
  blog: {
    triggerName: "Thoughts",
    link: {
      href: "/thoughts",
      text: "Thoughts",
    },
  },
  projects: {
    triggerName: "Projects",
    link: {
      href: "/projects",
      text: "Projects",
    },
  },
  about: {
    triggerName: "About",
    link: {
      href: "/",
      text: "About",
    },
  },
};

export default NavBarCopy;
