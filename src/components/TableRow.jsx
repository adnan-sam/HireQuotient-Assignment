import React, { useState } from 'react';

const TableRow = ({ user, isSelected, onSelectRow, onDelete, onSave }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onSave(user.id, editedValues);

    setEditing(false);
    setEditedValues({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const handleInputChange = (field, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleCheckboxChange = () => {
    onSelectRow(user.id);
  };

  const handleDeleteClick = () => {
    onDelete(user.id);
  };

  return (
    <tr style={{ background: isSelected ? '#ccc' : 'transparent' }}>
      <td>
        <input type="checkbox" checked={isSelected} onChange={handleCheckboxChange} />
      </td>
      <td>{user.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedValues.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        ) : (
          user.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedValues.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        ) : (
          user.email
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedValues.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
          />
        ) : (
          user.role
        )}
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button className='btn-edit' onClick={handleEdit}>
            <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button className='btn-del' onClick={handleDeleteClick}>
            <i class="fa-regular fa-trash-can"></i>
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
