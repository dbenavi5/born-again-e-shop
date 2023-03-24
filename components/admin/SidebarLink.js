import Link from "next/link";

function SidebarLink({ link, isActive }) {
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-sm text-white m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-200 m-2";
  return (
    <Link
      href={`/admin/${link}`}
      className={`${isActive ? activeLink : normalLink}`}
    >
      {link}
    </Link>
  );
}

export default SidebarLink;
