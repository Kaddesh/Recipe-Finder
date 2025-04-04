const Button = ({ onClick, label, condition, type }) => {
    return (
      condition && (
        <button
          onClick={onClick}
          type={type || "button"}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          {label}
        </button>
      )
    );
  };

  export default Button
  