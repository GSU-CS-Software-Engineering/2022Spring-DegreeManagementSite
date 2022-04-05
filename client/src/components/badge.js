import React, { useState, useEffect, useCallback, useMemo } from "react";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { requestBadge, getBadge, getBadges } from "../redux/slices/badgeSlice";
import { Link } from "react-router-dom";
import BadgesService from "../services/badgeService";
import { http } from "../axios-config";
import axios from "axios";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const Badge = () => {

  const [badgesList, setBadgesList] = useState([]);
  const [user, setUser] = useState({});
  const [badges, setBadges] = useState({});
  const [length, setLength] = useState(0)

  async function getBadges(ids) {
    try {
      let res = await axios.post(
        `http://localhost:8080/badge/badges`,
        {
          ids: ids,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        console.log("Badges retrieved!");
        setBadgesList(res.data);
        setLength(badgesList.length)
      }
    } catch (err) {
      console.error(err);
    }
  }

   const getData = () => {
    let cookie = JSON.parse(Cookies.get("userCookie"))
    let bs = JSON.stringify(cookie.badges)
    // setUser(JSON.parse(Cookies.get("userCookie")));
    getBadges(JSON.parse(bs))
  };

  useEffect(() => {
   getData()
  },[]);

  let randomSize = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  let badgesx = badgesList.map((item) => {
    return (
      <div
        key={item._id}
        className=" h-16 border-2 border-stone-700 rounded-md"
      >
        <div className="flex flex-row items-center h-full p-2 space-x-5">
          <div className="w-12 bg-gray-300 h-12 rounded-full  overflow-clip ">
            <img
              src={`http://placekitten.com/${randomSize(45, 55)}/${randomSize(
                50,
                55
              )}`}
              className="w-full cover-full"
              alt=""
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="uppercase">{item.badgeName}</div>
            <div className="">{item.description}</div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="space-y-1">
      {badgesx}
    </div>
  );
};

export default Badge;
