import React from "react";

const Logout = () => {
  const handleLogout = () => {
    // Check if the user is logged in
    const token = localStorage.getItem("awsToken");
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    // Remove the JWT token
    localStorage.removeItem("awsToken");
    localStorage.removeItem("isAdmin");

    alert("You have been logged out.");
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className=" bg-[#3b82f6] text-white px-2 py-1 lg:px-4 lg:py-2 rounded  hover:bg-slate-700 transition-all duration-300 "
    >
      Logout
    </button>
  );
};

export default Logout;
