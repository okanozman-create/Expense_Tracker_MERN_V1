import React, { useState } from "react";
import axios from "axios";
import Logout from "./Logout";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("awsToken");
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };



  const handleDelete = async (index) => {
    const userToDelete = users[index];
    const token = localStorage.getItem("awsToken");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }


  try {
      await axios.delete(
        `http://localhost:5000/api/expenses/${userToDelete._id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      // Remove the user from the state
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };


const handleBack = () => {
setUsers([])
}




  return (
    <div className="pt-5">
      <h1 className="text-center mb-4 text-4xl">ADMIN PAGE</h1>

      <h1 className="mb-4 text-2xl font-bold ml-5">Users</h1>
      <div className="flex items-center justify-between">
     
        <button
          onClick={fetchUsers}
          className=" bg-[#3b82f6] text-white px-2 py-1 lg:px-4 lg:py-2 rounded  hover:bg-slate-700 transition-all duration-300 ml-5 "
        >
          Get Users
        </button>

        <button
          onClick={handleBack}
          className={`bg-[#3b82f6] text-white px-2 py-1 lg:px-4 lg:py-2 rounded hover:bg-slate-700 transition-all duration-300 ${(users.length === 0) ? 'hidden' : 'block'}`}
        >
          BACK
        </button>


        <div class="absolute top-10 right-10 ">
          <Logout />
        </div>
      </div>

      <div className="m-3 p-3">
        <ul className="flex flex-col gap-3">
          {users.map((user, index) => (
            <li
              key={user._id}
              className="flex justify-between items-center bg-white shadow-xl pl-2 font-semibold"
            >
              {user.email}{" "}
              <button
                onClick={() => handleDelete(index)}
                className="bg-slate-500 hover:bg-slate-700 text-white py-1 px-2 rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
       </div>
    
    
    
    </div>
  );
};

export default AdminDashboard;
