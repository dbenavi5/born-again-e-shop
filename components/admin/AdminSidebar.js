import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { sidebarLinks } from "../../utils/admin/data";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/ContextProvider";

export default function AdminSidebar() {
  const router = useRouter();
  const currPath = router.pathname;
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSidebar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  return (
    <aside className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link href="/admin/dashboard" onClick={handleCloseSidebar}>
              <a className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-zinc-300 text-slate-900">
                <SiShopware className="text-2xl" />
                <span>Admin Panel</span>
              </a>
            </Link>
            <Tooltip title="Close">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                className="text-xl text-blue-500 rounded-full p-3 dark:hover:bg-zinc-800 mt-4 mr-2 block md:hidden cursor-pointer hover:bg-slate-300"
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>
          <div className="mt-10 ml-4">
            {sidebarLinks.map((item) => (
              <div key={item.title}>
                <p className="text-slate-900 dark:text-zinc-300 mt-4 text-sm uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <Link key={link.name} href={`/${link.link}`}>
                    <p
                      className={
                        currPath === `/${link.link}`
                          ? "activeLink"
                          : "normalLink"
                      }
                      onClick={handleCloseSidebar}
                    >
                      {link.icon}
                      <span className="capitalize">{link.name}</span>
                    </p>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
