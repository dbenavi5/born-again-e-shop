import React from "react";
import { sidebarLinks } from "../../utils/admin/data";
import SidebarLink from "./SidebarLink";
import { useRouter } from "next/router";

function SidebarLinks() {
  const pathname = useRouter();
  const isActive = (path) => {
    return pathname?.split("/").pop() === path;
  };

  return (
    <nav>
      {sidebarLinks.map((link) => (
        <SidebarLink key={link} link={link} isActive={isActive(link)} />
      ))}
    </nav>
  );
}

export default SidebarLinks;
