

import React, { useState } from 'react';

const ColumnForm = ({ addColumn }) => {
  const [columnName, setColumnName] = useState('');

  const handleAddColumn = () => {
    if (columnName.trim() !== '') {
      addColumn({ id: Date.now(), name: columnName });
      setColumnName('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter task name"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
      />
      <button onClick={handleAddColumn}>Add Column</button>
    </div>
  );
};

export default ColumnForm;
