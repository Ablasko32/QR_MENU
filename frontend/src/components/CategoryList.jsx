import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryItem from "./CategoryItem";

const categories = ["beer", "coffe", "cocktails"];

const CategoryList = () => {
  const [data, setData] = useState({});

  // Effect for fetching data from APi
  useEffect(() => {
    axios
      .get(`http://192.168.0.17:3000/items`)
      .then((res) => {
        const recivedData = res.data;
        // filtering data to object where category is key
        const groupedData = categories.reduce((accumulator, category) => {
          accumulator[category] = recivedData.filter(
            (item) => item.category === category
          );
          return accumulator;
        }, {});
        setData(groupedData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Fetching data");
      });
  }, []);

  return (
    <>
      <div className="lg:max-w-4xl mx-auto pt-10   bg-bg2 bg-center bg-cover relative ">
        <div className="flex flex-col space-y-3 px-8 py-4">
          {categories.map((category, index) => {
            return (
              <CategoryItem
                key={index}
                list={data[category]}
                title={category.charAt(0).toUpperCase() + category.slice(1)}
                img={`${category}-img.jpg`}
              />
            );
          })}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10"></div>
      </div>
    </>
  );
};

export default CategoryList;
