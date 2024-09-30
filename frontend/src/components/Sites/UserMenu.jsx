import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserMenuCategoryItem from "../UserMenuCategoyItem";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const UserMenu = () => {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [restaurantData, setRestaurantData] = useState({});
  const [categories, setCategories] = useState([]);

  const fetchMenuData = () => {
    axios
      .get(`http://192.168.0.17:3000/items/${name}`)
      .then((res) => {
        // setData(res.data.data);
        setCategories(res.data.categories);

        const recivedData = res.data.data;

        setData(recivedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRestaurantData = () => {
    axios
      .get(`http://192.168.0.17:3000/restaurant/` + name)
      .then((res) => {
        console.log(res.data);
        setRestaurantData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchRestaurantData();
    fetchMenuData();
  }, []);

  return (
    <>
      <div className="bg-[url('../bg-dash.jpg')] relative min-h-screen bg-center bg-cover items-center">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/20 to-black  "></div>
        {restaurantData ? (
          <div className="container mx-auto pt-10 flex flex-col items-center">
            <div className="text-3xl mb-5">
              <h1>{restaurantData.name}</h1>
              <div className="border-b border-slate-100 mx-3"></div>
            </div>
            <div className="flex items-center space-x-1 pb-1">
              <span>
                <WatchLaterOutlinedIcon />
              </span>
              <span>{restaurantData.working_hours}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>
                <LocationOnOutlinedIcon />
              </span>
              <span>{restaurantData.addres}</span>
            </div>
          </div>
        ) : (
          <div className="pt-10">
            <h2 className="text-center text-3xl">eMenu</h2>
          </div>
        )}

        {/* border divider */}
        <div className="border-b-4 mt-4"></div>

        <div className="flex flex-col items-center space-y-2 pt-10">
          {categories.map((item, index) => {
            return (
              <UserMenuCategoryItem
                data={data.filter((data_item) => data_item.category === item)}
                key={index}
                item={item}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserMenu;
