const Input = ({ type = "text", placeholder, className = "", ...props }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-md border-opacity-50  ${className}`}
        {...props}
      />
    );
  };
  
  export default Input;
  