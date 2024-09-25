import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownMenu from "../DropdownMenu";
import SearchBar from "../SearchBar";
import IndividualDashboardItem from "../IndividualDashboardItem";
import DrinkIconList from "../DrinkIconList";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchDashboardData(currentPage);
  }, [currentPage]);

  const fetchDashboardData = (page) => {
    const token = localStorage.getItem("token");
    axios
      .get("http://192.168.0.17:3000/dashboard?page=" + page || 1, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(console.log("Running"));
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete item?");
    if (confirmed) {
      axios
        .delete("http://192.168.0.17:3000/items/" + id + 1, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          setData((prevValue) => prevValue.filter((item) => item.id !== id));
        });
    }
  };

  const handlePageChange = (newPage) => {
    const dataLength = data.length;
    if (dataLength === 0) {
      setCurrentPage((prevpage) => prevpage - 1);
    } else {
      if (newPage === "plus") {
        setCurrentPage((prevpage) => prevpage + 1);
      } else {
        setCurrentPage((prevpage) => prevpage - 1);
      }
    }
  };

  return (
    <>
      <div className="bg-bgdash bg-center bg-cover  overflow-scroll min-h-screen relative pb-10">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/20 to-black  "></div>

        <div className="flex flex-col items-center  pt-10 mb-12">
          <DrinkIconList />
          <h1 className=" opacity-75 text-2xl font-bold">Administracija</h1>
        </div>

        <DropdownMenu />
        <SearchBar />
        {/* border divider */}
        <div className="border-b-4 mb-4"></div>

        {/* items display */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4   relative ">
          {data.map((item, index) => {
            return (
              <IndividualDashboardItem
                handleDelete={handleDelete}
                item={item}
                key={index}
              />
            );
          })}
        </div>
        {/* pagination
         */}

        <div className="flex justify-center space-x-3 mt-10 relative items-center">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange("minus")}>
              <NavigateBeforeIcon fontSize="large" />
            </button>
          )}
          <div>{currentPage}</div>
          <button onClick={() => handlePageChange("plus")}>
            <NavigateNextIcon fontSize="large" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
