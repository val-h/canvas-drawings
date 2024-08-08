const Button = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={"font-bold px-8 py-4 border shadow bg-white " + className}
    >
      {label}
    </button>
  );
};

export default Button;
