import { Outlet, useParams } from "react-router-dom"; // Import Outlet for nested routes
import UserNavbar from "../../components/user/UserNavbar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";
import { RiNumbersLine } from "react-icons/ri";
import { IoPersonAddOutline } from "react-icons/io5";

const PanelistLayout = ({ children }) => {
  const { id } = useParams();

  const menuItems = [
    {
      label: "Create Poll",
      icon: <IoIosAddCircleOutline />,
      route: `/panelist/${id}/create-poll`,
    },
    {
      label: "Accept/Reject Poll",
      icon: <TiTickOutline />,
      route: `/panelist/${id}/poll-status`,
    },
    {
      label: "Vote Counts",
      icon: <RiNumbersLine />,
      route: `/panelist/${id}/vote-count`,
    },
    {
      label: "Add/Delete Panelists",
      icon: <IoPersonAddOutline />,
      route: `/panelist/${id}/add-panelist`,
    },
  ];

  return (
    <>
      <UserNavbar user_type="panelist" navbarItem={menuItems} />
      {children || <Outlet />}
    </>
  );
};

export default PanelistLayout;
