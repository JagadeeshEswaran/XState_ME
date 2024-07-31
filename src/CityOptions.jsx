/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const CityOptions = ({ isEnabled, list, handleDisplaySelection }) => {
  return (
    <select
      style={{
        width: "15rem",
        height: "3rem",
        fontSize: "20px",
        borderRadius: "4px",
        marginLeft: "3rem",
      }}
      onChange={(e) => handleDisplaySelection(e.target.value)}
      disabled={!list}
    >
      <option value="Select State" selected>
        Select City
      </option>

      {list?.map((item, idx) => (
        <option key={idx} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default CityOptions;
