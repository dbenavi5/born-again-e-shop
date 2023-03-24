import { AiOutlineMenu } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";

const NavButton = ({ title, placement, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title} placement={placement}>
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
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
  return (
    <div className="flex justify-between p-2 relative">
      <NavButton
        title="Menu"
        placement="right-end"
        icon={<AiOutlineMenu color="blue" />}
      />
    </div>
  );
}

export default AdminHeader;
