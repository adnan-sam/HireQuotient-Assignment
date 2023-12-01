import React, { useEffect, useState } from 'react';
import TableRow from './TableRow';
import Pagination from './Pagination';
import SelectAllCheckbox from './SelectAllCheckbox';

const AdminTable = ({ usersData, onDelete, onDeleteSelected }) => {
  const [users, setUsers] = useState(usersData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const pageSize = 10;
  const totalPages = Math.ceil(users.length / pageSize);

  const filteredUsers = searchTerm
    ? searchResults.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setIsSelectAllChecked(selectedRows.length === filteredUsers.length);
  }, [selectedRows, filteredUsers]);

  const handleSelectAll = () => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.length === filteredUsers.length
        ? []
        : [...filteredUsers.map((user) => user.id)]
    );
  };

  const handleSelectRow = (rowId) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(rowId)
        ? prevSelectedRows.filter((id) => id !== rowId)
        : [...prevSelectedRows, rowId]
    );
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter((user) => !selectedRows.includes(user.id));

    setSelectedRows([]);

    setUsers(prevUsers => {
      onDeleteSelected(updatedUsers);
      return updatedUsers;
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const performSearch = () => {
    const result = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  
    setSearchResults(result);
  };
  const handleSearchIconClick = () => {
    performSearch();
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  const handleSave = (userId, editedValues) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...editedValues } : user
    );

    setUsers(updatedUsers);
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    onDelete(updatedUsers);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          className='search-icon'
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
        <button className="search-icon" onClick={handleSearchIconClick}>
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <button
          className={isSelectAllChecked ? 'deleteSelected_container' : 'deleteSelected_container_active'}
          onClick={handleDeleteSelected}
          disabled={!isSelectAllChecked}
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <SelectAllCheckbox
                isSelected={isSelectAllChecked}
                onSelectAll={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              isSelected={selectedRows.includes(user.id)}
              onSelectRow={handleSelectRow}
              onDelete={handleDelete}
              onSave={handleSave}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={searchTerm ? searchResults.length : users.length}
        onPageChange={handlePageChange}
      />
      <p>{`${selectedRows.length} out of ${users.length} row(s) selected.`}</p>
    </div>
  );
};

export default AdminTable;