import React from 'react';
import { FaPaintBrush, FaAdjust } from 'react-icons/fa';

const Toolbar = ({ setLoading }) => {
  const handleApplyFilter = () => {
    setLoading(true);
    // Add filter logic here (e.g., brightness, contrast)
    setLoading(false);
  };

  const handleBackgroundRemoval = () => {
    setLoading(true);
    // Add AI background removal logic here
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <button
        onClick={handleApplyFilter}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        <FaAdjust /> Apply Filter
      </button>
      <button
        onClick={handleBackgroundRemoval}
        className="bg-red-500 text-white p-2 rounded-md"
      >
        <FaPaintBrush /> Remove Background
      </button>
    </div>
  );
};

export default Toolbar;
