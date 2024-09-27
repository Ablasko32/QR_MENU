import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownMenu from "../DropdownMenu";
import SearchBar from "../SearchBar";
import IndividualDashboardItem from "../IndividualDashboardItem";
import DrinkIconList from "../DrinkIconList";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [reRender, setRerender] = useState(false);

  useEffect(() => {
    console.log("effect");

    fetchDashboardData(currentPage);
  }, [currentPage, searchTerm, reRender]);

  const fetchDashboardData = (page) => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://192.168.0.17:3000/dashboard?page=${page}&searchTerm=${searchTerm}&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
        .delete("http://192.168.0.17:3000/items/" + id, {
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
    if (newPage === "plus") {
      setCurrentPage((prevpage) => prevpage + 1);
    } else {
      setCurrentPage((prevpage) => prevpage - 1);
    }
  };

  // search
  const handleSearchInput = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <>
      <div className="bg-[url('../bg-dash.jpg')] bg-center bg-cover  overflow-scroll min-h-screen relative pb-10">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/20 to-black  "></div>

        <div className="flex flex-col items-center  pt-10 mb-12">
          <DrinkIconList />
          <h1 className=" opacity-75 text-2xl font-bold">
            Administracija {category}
          </h1>
          <a href="/category" className="absolute top-4 left-4">
            <ArrowBackIcon />
          </a>
        </div>

        <DropdownMenu
          reRender={reRender}
          handleRender={setRerender}
          category={category}
        />

        {/* border divider */}
        <div className="border-b-4 mb-4"></div>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearchInput} />
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
          {data.length !== 0 && (
            <button onClick={() => handlePageChange("plus")}>
              <NavigateNextIcon fontSize="large" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
