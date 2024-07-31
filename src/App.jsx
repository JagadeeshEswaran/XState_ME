/* eslint-disable no-unused-vars */
import axios from "axios";
import CityOptions from "./CityOptions";
import CountryOptions from "./CountryOptions";
import StateOptions from "./StateOptions";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [displayBanner, setDisplayBanner] = useState("");
  const [countriesList, setCountriesList] = useState(null);
  const [stateList, setStateList] = useState(null);
  const [cityList, setCityList] = useState(null);
  const [userSelection, setSelections] = useState({
    country: "",
    state: "",
    city: "",
  });

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );

      // console.log("resonse.data: ", resonse);

      if (response.status === 200) {
        const list = response.data;

        setCountriesList(list);
      }
    } catch (error) {
      console.log(error);
      alert("Error fetching countries");
    }
  };

  const handleFetchStates = async (countryName) => {
    setSelections({ ...userSelection, country: countryName });

    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${countryName}/states`
      );

      if (response.status === 200) {
        const list = response.data;
        setStateList(list);
      }
    } catch (error) {
      console.log("Error fetching State List: ", error);
      alert("Error fetching states list");
    }
  };

  const handleCitySelections = async (stateName) => {
    setSelections({ ...userSelection, state: stateName });

    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${userSelection?.country}/state=${stateName}/cities`
      );

      if (response.status === 200) {
        const list = response.data;
        setCityList(list);
      }
    } catch (error) {
      console.log("Error fetching city List: ", error);
      alert("Error fetching cities list");
    }
  };

  const handleDisplaySelection = (cityName) => {
    setSelections({ ...userSelection, city: cityName });

    console.log(
      `CountryName : ${userSelection.country} , StateName: ${userSelection.state},CityName: ${cityName}`
    );

    setDisplayBanner(``);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <h1>Select Location</h1>
      <section
        style={{
          width: "100%",
        }}
      >
        <CountryOptions
          isEnabled={false}
          list={countriesList && countriesList}
          value={userSelection.country}
          handleStateSelection={handleFetchStates}
        />
        <StateOptions
          isEnabled={false}
          list={stateList}
          handleCitySelections={handleCitySelections}
        />
        <CityOptions
          isEnabled={false}
          list={cityList}
          handleDisplaySelection={handleDisplaySelection}
        />
      </section>

      {userSelection.country && userSelection.state && userSelection.city && (
        <div style={{ marginLeft: "5rem", marginTop: "3rem" }}>
          You selected{" "}
          <span style={{ fontWeight: "medium", fontSize: "1.5rem" }}>
            {userSelection.city}, &nbsp;
          </span>
          <span style={{ fontWeight: "medium", fontSize: "1.5rem" }}>
            {userSelection.state}, &nbsp;
          </span>
          <span style={{ fontWeight: "bold", fontSize: "3rem" }}>
            {userSelection.country}
          </span>
        </div>
      )}
    </>
  );
}

export default App;
