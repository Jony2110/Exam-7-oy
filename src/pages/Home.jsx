import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetchCountries from "../hooks/useFetchCountries";

function Home() {
  const {
    data,
    loading,
    currentPage,
    totalPages,
    handleSearchChange,
    handleRegionChange,
    handleNext,
    handlePrevious,
    handlePageClick,
  } = useFetchCountries(12);

  const navigate = useNavigate();

  const handleAbout = (slug) => {
    navigate(`/about/${slug}`);
  };

  return (
    <div className="bg-customLight min-h-screen font-nunito dark:bg-customDarkMain">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 gap-4">
          <label className="input flex items-center gap-2 w-full md:w-[30rem] h-14 rounded-md shadow-xl pl-8 dark:bg-customDark dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-[1.13rem] w-[1.13rem] opacity-70 mr-6"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              onChange={handleSearchChange}
              type="text"
              className="grow text-sm font-normal dark:text-white"
              placeholder="Search for a country…"
            />
          </label>
          <select
            onChange={handleRegionChange}
            className="w-full md:w-[12.5rem] h-14 pl-6 pr-6 text-sm font-normal rounded-md dark:bg-customDark dark:text-white"
          >
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-10 justify-center md:justify-between mt-12">
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            data.length > 0 &&
            data.map((country, index) => (
              <div
                onClick={() => handleAbout(country.name.slug)}
                className="w-[16.69rem] h-[21rem] text-sm font-normal dark:text-white rounded-md shadow-lg dark:bg-customDark cursor-pointer"
                key={index}
              >
                <img
                  className="w-[16.69rem] h-[10rem] rounded-t-md"
                  src={country.flags.png}
                  alt={country.name.common}
                />
                <h2 className="mt-6 font-extrabold text-[1.13rem] text-black ml-6 dark:text-white">
                  {country.name.common}
                </h2>
                <div className="mt-4 flex flex-col gap-2 ml-6 dark:text-white">
                  <p className="text-black dark:text-white font-semibold text-[0.88rem]">
                    Population:{" "}
                    <span className="font-light text-[0.88rem]">
                      {country.population}
                    </span>
                  </p>
                  <p className="text-black dark:text-white font-semibold text-[0.88rem]">
                    Region:{" "}
                    <span className="font-light text-[0.88rem]">
                      {country.region}
                    </span>
                  </p>
                  <p className="text-black dark:text-white font-semibold text-[0.88rem]">
                    Capital:{" "}
                    <span className="font-light text-[0.88rem]">
                      {country.capital}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center mt-12">
          <div className="btn-group">
            <button
              onClick={handlePrevious}
              className="btn"
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                className={`btn ${currentPage === index + 1 ? "btn-active" : ""}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              className="btn"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
