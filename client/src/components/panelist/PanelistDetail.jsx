import React, { useEffect } from "react";
import "../../constants/style.css";
import { useDispatch, useSelector } from "react-redux";

import { FaInstagram } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { getPanelists } from "../../app/features/panelist/panelistSlices";
import { getPhotoUrl } from "../../service/imageService";

const PanelistDetail = () => {
  const dispatch = useDispatch();
  const { panelists } = useSelector((state) => state.panelist);
  const items = panelists.data;

  useEffect(() => {
    dispatch(getPanelists());
  }, [dispatch]);
  return (
    <div className="flex flex-wrap gap-6 justify-center bg-blue-200 p-6">
      {items &&
        items.map((item) => (
          <div
            key={item._id}
            className="w-80 bg-blue-300 p-4 rounded-lg shadow-lg"
          >
            <div className="flex flex-col items-center space-y-3 text-center">
              <img
                className="profile-pic"
                src={getPhotoUrl(item.photo)}
                alt={item.fullName}
              />
              <div className="flex space-x-3 text-lg">
                <a href={item.instagram} target="_blank">
                  <FaInstagram />
                </a>
                <a href={item.facebook} target="_blank">
                  <CiFacebook />
                </a>
                <a href={item.x} target="_blank">
                  <FaXTwitter />
                </a>
              </div>
              <div className="w-full  space-y-3">
                <p className="font-bold text-lg">{item.fullName}</p>
              </div>
              <div className="w-full ">
                <label className="label">Service/Designation</label>
                <p className="value  ">{item.service}</p>
              </div>
              <div className="w-full ">
                <div>
                  <p className="font-semibold mb-2 bg-blue-200">Contact</p>
                  <div>
                    <label className="label">Phone No.</label>
                    <p className="value  ">{item.phone}</p>
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <p className="value">{item.email}</p>
                  </div>
                </div>
              </div>
              <div className="main-content w-full ">
                <p className="font-semibold mb-2 bg-blue-200">
                  Contributions & Interests
                </p>
                <div>
                  <label className="label">Contributions</label>
                  <p className="value">{item.contribution}</p>
                </div>
                <div>
                  <label className="label">Topics of Interest </label>
                  <p className="value">{item.topicOfInterest}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PanelistDetail;
