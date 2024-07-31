/* eslint-disable no-unused-vars */

import { useState } from "react";

/* eslint-disable react/prop-types */
const CountryOptions = ({ isEnabled, list, handleStateSelection }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <select
      style={{
        width: "15rem",
        height: "3rem",
        fontSize: "20px",
        borderRadius: "4px",
        marginLeft: "3rem",
      }}
      disabled={isEnabled}
      onChange={(e) => handleStateSelection(e.target.value)}
    >
      <option value="Select Country" selected>
        Select Country
      </option>
      {list?.map((item) => (
        <option key={item.id} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default CountryOptions;
