import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { useStateContext } from "../../context/ContextProvider";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { Store } from "../../utils/Store";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Menu } from "@headlessui/react";

const NavButton = ({ title, placement, icon, customFunc, color, dotColor }) => (
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
  const { dispatch } = useContext(Store);
  // const { cart } = state;
  // const [cartItemsCount, setCartItemsCount] = useState(0);

  const { status, data: session } = useSession();

  const {
    activeMenu,
    setActiveMenu,
    // isClicked,
    // setIsClicked,
    // handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  // useEffect(() => {
  //   setCartItemsCount(cart.cartItems.reduce((acc, i) => acc + i.quantity, 0));
  // }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
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
      <div className="flex">
        <NavButton
          title="Chat"
          // customFunc={() => handleClick("chat")}
          icon={<BsChatLeft />}
          color="#6b7280"
          dotColor="#60a5fa"
        />
        <NavButton
          title="Notifications"
          // customFunc={() => handleClick("notification")}
          icon={<RiNotification3Line />}
          color="#6b7280"
          dotColor="#60a5fa"
        />
        <Tooltip title="Profile">
          {status === "loading" ? (
            "Loading..."
          ) : session.user.isAdmin ? (
            <Menu
              as="div"
              className="flex relative justify-center items-center"
            >
              Hi,&nbsp;
              <span className="text-blue-500">{session.user.name}</span>
              <Menu.Button className="flex">
                <MdKeyboardArrowDown className="text-gray-400 text-14 hover:bg-zinc-700 rounded-full" />
              </Menu.Button>
              <Menu.Items className="inline-block absolute right-3 top-10 origin-top-right w-38 bg-zinc-700 rounded-md shadow-lg p-2 w-28 text-center hover:border hover:border-zinc-500">
                <Menu.Item>
                  <a
                    className="last:text-blue-500"
                    href="#"
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href="/login">
              <a className="p-2 hover:text-indigo-500">Login</a>
            </Link>
          )}
        </Tooltip>
      </div>
    </div>
  );
}

export default AdminHeader;
