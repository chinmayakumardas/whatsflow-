const Button = ({ children, onClick, className = "", variant = "primary", type = "Button" }) => {
    const variants = {
      primary: "bg-button text-white hover:bg-button",
      primary2: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-300 text-black hover:bg-gray-400",
      danger: "bg-red-600 text-white hover:bg-red-700",
      link: "text-blue-600 underline hover:text-blue-800",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 rounded-md font-medium transition ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  