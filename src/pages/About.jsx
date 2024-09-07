import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function About() {
  const { slug } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    http
      .get(`/${slug}`)
      .then((response) => {
        setCountry(response.data);
        toast.info("Tanlangan davlat malumotlari tolig keldi", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  function handleBorderClick(borderSlug) {
    navigate(`/about/${borderSlug}`);
  }

  function handleHome(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <div className="bg-customLight min-h-screen flex flex-col font-nunito relative dark:bg-customDarkMain">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        country && (
          <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full">
            <button
              onClick={handleHome}
              className="flex shadow-md dark:text-white w-full sm:w-[8.5rem] h-[2.50rem] rounded-md dark:bg-customDark items-center justify-center gap-[0.63rem] mt-10 sm:mt-[5rem]"
            >
              <span className="font-extrabold text-2xl">←</span>
              Back
            </button>
            <div className="flex flex-col sm:flex-row mt-10 sm:mt-[5rem] gap-8 sm:gap-[9.00rem]">
              <img
                className="w-full sm:w-[31.63rem] h-auto sm:h-[25.06rem] rounded-md"
                src={country.flags.png}
                alt={country.flags.alt}
              />
              <div className="flex flex-col sm:flex-row gap-[8.813rem] sm:gap-[7.31rem]">
                <div>
                  <h2 className="font-extrabold text-3xl dark:text-white text-black mb-6 sm:mb-[1.44rem] mt-4 sm:mt-[2.44rem]">
                    {country.name.common}
                  </h2>

                  <div className="flex flex-col gap-3 dark:text-white">
                    <p className="font-semibold dark:text-white text-black text-base">
                      Native Name:{" "}
                      <span className="font-normal text-base">
                        {country.name.nativeName
                          ? Object.values(country.name.nativeName)[0].common
                          : "N/A"}
                      </span>
                    </p>
                    <p className="font-semibold dark:text-white text-black text-base">
                      Population:{" "}
                      <span className="font-normal text-base">
                        {country.population}
                      </span>
                    </p>
                    <p className="font-semibold dark:text-white text-black text-base">
                      Region:{" "}
                      <span className="font-normal text-base">
                        {country.region}
                      </span>
                    </p>
                    <p className="font-semibold dark:text-white text-black text-base">
                      Sub Region:{" "}
                      <span className="font-normal text-base">
                        {country.subregion}
                      </span>
                    </p>
                    <p className="font-semibold dark:text-white text-black text-base">
                      Capital:{" "}
                      <span className="font-normal text-base">
                        {country.capital}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-[6.63rem] flex flex-col gap-3 dark:text-white">
                  <p className="font-semibold dark:text-white text-black text-base">
                    Top Level Domain:{" "}
                    <span className="font-normal text-base">{country.cca3}</span>
                  </p>
                  <p className="font-semibold dark:text-white text-black text-base">
                    Currencies:{" "}
                    <span className="font-normal text-base">
                      {country.currencies
                        ? Object.values(country.currencies)
                            .map((currency) => currency.name)
                            .join(", ")
                        : "N/A"}
                    </span>
                  </p>
                  <p className="font-semibold dark:text-white text-black text-base">
                    Languages:{" "}
                    <span className="font-normal text-base">
                      {country.languages
                        ? Object.values(country.languages).join("  ")
                        : "N/A"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-4 flex gap-x-4 flex-col sm:flex-row justify-center items-center sm:absolute sm:left-40 sm:top-[32rem] sm:ml-[40rem] sm:mb-40">
              <h2 className=" font-semibold dark:text-white text-black text-base mb-2 sm:mb-0">
                Border Countries:{" "}
              </h2>
              {country.borders && country.borders.length > 0 ? (
                <div className="flex flex-wrap  mt-2">
                  {country.borders.map((border) => (
                    <button
                      key={border._id}
                      onClick={() => handleBorderClick(border.slug)}
                      className="dark:text-white font-light shadow-md text-[0.88rem] w-24 h-7 rounded-md dark:bg-customDark flex gap-x-2.5 items-center justify-center  hover:bg-slate-300 dark:hover:bg-slate-400 dark:hover:text-green-400"
                    >
                      {border.common}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-2 sm:mt-0">No neighboring countries.</p>
              )}
            </div>
          </div>
        )
      )}
      <ToastContainer />
    </div>
  );
}

export default About;
