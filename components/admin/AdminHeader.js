import { AiOutlineMenu } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect } from "react";

const NavButton = ({ title, placement, icon, customFunc, color, dotColor}) => (
  <Tooltip title={title} placement={placement}>
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-slate-300 dark:hover:bg-zinc-800"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </Tooltip>
);

function AdminHeader() {
  const {
    activeMenu,
    setActiveMenu,
    // isClicked,
    // setIsClicked,
    // handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 ml-6 mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        placement="right-end"
        icon={<AiOutlineMenu color="#3b82f6" />}
      />
    </div>
  );
}

export default AdminHeader;
