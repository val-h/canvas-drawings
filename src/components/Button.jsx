const Button = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={"font-bold px-10 py-4 border shadow my-4 " + className}
    >
      {label}
    </button>
  );
};

export default Button;
