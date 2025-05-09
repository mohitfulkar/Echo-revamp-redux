import { Outlet } from "react-router-dom"; // Import Outlet for nested routes
import UserNavbar from "../../components/user/UserNavbar";
import { RiNumbersLine } from "react-icons/ri";
import { IoPersonAddOutline, IoPersonOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";

const AdminLayout = ({ children }) => {
  const menuItems = [
    {
      label: "Add Panelist",
      icon: <IoPersonAddOutline />,
      route: `/add-panelist`,
    },
    {
      label: "Active Panelists",
      icon: <IoPersonOutline />,
      route: `/panelist-history`,
    },
    {
      label: "Active Polls",
      icon: <RiNumbersLine />,
      route: `/admin/poll-info`,
    },
    {
      label: "User Info",
      icon: <IoIosInformationCircleOutline />,
      route: `/admin/user-info`,
    },
  ];

  return (
    <>
      <UserNavbar user_type="admin" navbarItem={menuItems} />
      {children || <Outlet />}
    </>
  );
};

export default AdminLayout;
