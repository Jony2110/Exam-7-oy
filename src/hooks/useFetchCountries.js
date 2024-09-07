import { useState, useEffect, useMemo } from "react";
import http from "../utils/axios";
import { toast } from "react-toastify";

const useFetchCountries = (limit = 12) => {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  const currentPage = useMemo(() => Math.floor(skip / limit) + 1, [skip, limit]);

  useEffect(() => {
    fetchData(skip, searchQuery, regionFilter);
  }, [skip, searchQuery, regionFilter]);

  const fetchData = async (skipValue, search = "", region = "") => {
    setLoading(true);
    try {
      const response = await http.get(
        `?limit=${limit}&skip=${skipValue}&search=${search}&region=${region}`
      );
      setData(response.data.data);
      setTotalPages(Math.ceil(response.data.total / limit));
      toast.info("Davlatlar malumotlari keldi", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSkip(0);
    setSearchQuery(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSkip(0);
    setRegionFilter(event.target.value);
  };

  const handleNext = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const handlePrevious = () => {
    if (skip >= limit) {
      setSkip((prevSkip) => prevSkip - limit);
    }
  };

  const handlePageClick = (page) => {
    setSkip((page - 1) * limit);
  };

  return {
    data,
    loading,
    currentPage,
    totalPages,
    searchQuery,
    regionFilter,
    handleSearchChange,
    handleRegionChange,
    handleNext,
    handlePrevious,
    handlePageClick,
  };
};

export default useFetchCountries;
