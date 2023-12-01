import React, { useEffect, useState } from 'react';
import AdminTable from '../components/AdminTable';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("Loading User Data...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const data = await response.json();
        // console.log(data.length)
        if(data.length<=0) {
          setMessage("No User data present in API")
          setLoading(true);
        }
        else {
          setUsers(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(true);
        setMessage("Failed to fetch User data....");
        console.error('Error in fetching data from the provided HireQuotient API:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleDeleteSelected = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      { loading ? (
        <p>{message}</p>
      ):(
        <AdminTable usersData={users} onDelete={handleDelete} onDeleteSelected={handleDeleteSelected} />
      )}
     <div className='footer'>
      <p>&copy; 2023 Developed by Adnan Sameer for HireQuotient Assignment.</p>
     </div>
    </div>
  );
};

export default AdminDashboard;
