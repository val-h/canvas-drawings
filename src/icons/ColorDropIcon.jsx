const ColorDropIcon = ({ size = "32", fill = "#000", className }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      viewBox="0 0 520 520"
      xmlSpace="preserve"
      fill={fill}
      className={className}
    >
      <path
        d="M400.981,161.969L300.184,22.563C289.934,8.406,273.497,0,256.012,0c-17.5,0-33.922,8.406-44.188,22.563
		L111.012,161.969c-58.797,92.188-80.063,209.906,0,289.969c40.047,40.047,92.516,60.063,145,60.063
		c52.469,0,104.938-20.016,144.969-60.063C481.06,371.875,459.778,254.156,400.981,161.969z"
      />
    </svg>
  );
};

export default ColorDropIcon;
