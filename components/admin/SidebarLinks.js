import React from "react";
import { sidebarLinks } from "../../utils/admin/data";
import SidebarLink from "./SidebarLink";
import { useRouter } from "next/router";

function SidebarLinks() {
  const router = useRouter();
  const isActive = () => {
    return router.push('/');
  };

  return (
    <nav>
      {sidebarLinks.map((link) => (
        <SidebarLink key={link} link={link} isActive={()=>isActive()}/>
      ))}
    </nav>
  );
}

export default SidebarLinks;
