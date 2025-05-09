import React from "react";
import "../../constants/style.css";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const UserDrawer = ({ isVisible, setIsVisible, menuItems }) => {
  return (
    <div className={`drawer ${isVisible ? "open" : ""}`}>
      {/* Cross Icon Container */}
      <div className="flex justify-end p-2">
        <RxCross1
          className="cursor-pointer pt-2 text-3xl mr-1"
          onClick={() => setIsVisible(false)}
        />
      </div>

      {/* Menu Items */}
      <div className="inner text-center">
        <ul className="flex flex-col space-y-8">
          {menuItems.map(({ label, icon, route }) => (
            <li key={label} className="">
              <Link to={route} className="menu-item space-x-2 pl-10">
                {icon}
                <p className="p">{label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDrawer;
