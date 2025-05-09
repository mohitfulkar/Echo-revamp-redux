import { Outlet, useParams } from "react-router-dom"; // Import Outlet for nested routes
import UserNavbar from "../../components/user/UserNavbar";
import { FaHome, FaRegNewspaper } from "react-icons/fa";

const UserLayout = ({ children }) => {
  const { id } = useParams();
  const menuItems = [
    {
      label: "Home",
      icon: <FaHome />,
      route: `/user/${id}`,
    },
    {
      label: "Panelists",
      icon: <FaRegNewspaper />,
      route: "/user/panelist-history",
    },
    // {
    //   label: "News",
    //   icon: <FaRegNewspaper />,
    //   route: "/news",
    // },

    // {
    //   label: "Blogs",
    //   icon: <RiBloggerLine />,
    //   route: "/blogs",
    // },
  ];

  return (
    <>
      <UserNavbar user_type="user" navbarItem={menuItems} />
      {children || <Outlet />}
    </>
  );
};

export default UserLayout;
