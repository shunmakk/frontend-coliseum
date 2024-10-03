import React from "react";

const LoadingOrError: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="animate-spin h-10 w-10 border-4  border-blue-400 rounded-full border-t-transparent"></div>
      <p className="mt-4">ローディング中</p>
    </div>
  );
};

export default LoadingOrError;
