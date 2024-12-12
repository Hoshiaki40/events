import { BoltCircleOutlineIcon, Home2OutlineIcon } from "../icons";

export const SidebarLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
  >
    {icon}
    <span className="ml-2">{label}</span>
  </a>
);

export const Sidebar = () => (
  <aside className="w-64 hidden md:block h-full  border-r bg-background">
    <div className="p-4">
      <h2 className="text-2xl font-semibold">ACME</h2>
    </div>
    <nav className="mt-6">
      <SidebarLink
        href="#"
        icon={<Home2OutlineIcon className="w-5 h-5" />}
        label="Dashboard"
      />
      <SidebarLink
        href="#"
        icon={<BoltCircleOutlineIcon className="w-5 h-5" />}
        label="Projects"
      />
    </nav>
  </aside>
);
