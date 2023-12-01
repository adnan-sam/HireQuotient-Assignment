import React, { useState, useEffect } from 'react';

const SelectAllCheckbox = ({ isSelected, onSelectAll }) => {
  const [isChecked, setIsChecked] = useState(isSelected);

  useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);

  const handleSelectAll = () => {
    setIsChecked(!isChecked);
    onSelectAll();
  };

  return (
    <div>
      <input type="checkbox" checked={isChecked} onChange={handleSelectAll} />
    </div>
  );
};

export default SelectAllCheckbox;
