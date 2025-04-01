const Card = ({ children, className = "" }) => {
    return <div className={`border shadow-md rounded-lg p-6 bg-white ${className}`}>{children}</div>;
  };
  
  const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
  
  const CardTitle = ({ children }) => <h2 className="text-xl font-semibold">{children}</h2>;
  
  const CardContent = ({ children }) => <div className="mt-2">{children}</div>;
  
  export { Card, CardHeader, CardTitle, CardContent };
  