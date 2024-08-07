import React from "react";
import ExpenseTracker from "./components/ExpenseTracker";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminDashboard from "./components/AdminDashboard";
import AdminDashboardUser from "./components/AdminDashboardUser";

const App = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <div className="container mx-auto">
      {isAdmin ? (
        <>        <AdminDashboard />
        <AdminDashboardUser/>
        </>

      ) : (
        <>
          <Header />
          <ExpenseTracker />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
