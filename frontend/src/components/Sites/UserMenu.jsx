import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserMenuCategoryItem from "../UserMenuCategoyItem";

const UserMenu = () => {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchMenuData = () => {
    axios
      .get(`http://192.168.0.17:3000/items/${name}`)
      .then((res) => {
        // setData(res.data.data);
        setCategories(res.data.categories);

        const recivedData = res.data.data;

        console.log(recivedData);

        setData(recivedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  return (
    <>
      <div className="bg-[url('../bg-dash.jpg')] relative min-h-screen bg-center bg-cover items-center">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/20 to-black  "></div>

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
