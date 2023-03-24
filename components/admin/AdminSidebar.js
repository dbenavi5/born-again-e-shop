import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { sidebarLinks } from "../../utils/admin/data";
import { Tooltip } from "@mui/material";

export default function AdminSidebar() {
  const activeMenu = true;

  //   const activeLink =
  //     "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-sm text-white m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-200 m-2";
  return (
    <aside className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <a
              href="/admin/dashboard"
              onClick={() => {}}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900"
            >
              <SiShopware className="text-2xl" />
              Admin Panel
            </a>
            <Tooltip title='Menu'>
              <button
                type="button"
                className="text-xl text-black rounded-full p-3 hover:bg-gray-200 mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>
          <div className="mt-10">
            {sidebarLinks.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 mt-4 text-sm uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <a
                    key={link.name}
                    href={`/${link.link}`}
                    onClick={() => {}}
                    // className={() => (activeMenu ? activeLink : normalLink)}
                    className={normalLink}
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
