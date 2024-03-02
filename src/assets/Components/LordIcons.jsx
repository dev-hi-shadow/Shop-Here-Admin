/* eslint-disable react/prop-types */

const LordIcons = ({
  icon = "",
  width = "60px",
  height = "60px",
  colors = "",
  stroke = "40",
  state = "",
}) => {
  return (
    <lord-icon
      src={`https://cdn.lordicon.com/${icon}.json`}
      trigger="hover"
      colors={colors}
      state={state}
      style={{
        width,
        height,
      }}
      stroke={stroke}
    ></lord-icon>
  );
};

export default LordIcons;
