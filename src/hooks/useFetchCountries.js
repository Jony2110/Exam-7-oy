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
      toast.info("Davlat malumotlari keldi", {
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

  const handleAllData = () => {
    http.get(``).then(response => {
      setData(response.data.data);
      toast.info("250 ta davlat malumotlari keltirildi", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }).catch(err => {
      console.log(err);
    });
  };

  const handleSearchChange = (value) => {
     
    setSkip(0);
    setSearchQuery(value);
    if (value.length > 0) {
      toast.info("Qidirilgan davlatlar malumoti keldi", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleRegionChange = (event) => {
    setSkip(0);
    setRegionFilter(event.target.value);
    if (event.target.value.length > 0) {
      toast.info("Region boyicha filterlandi", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
    handleAllData
  };
};

export default useFetchCountries;
