import React, { useState } from 'react';
import CanvasEditor from './components/CanvasEditor';
import './App.css';

const App = () => {
  const [image, setImage] = useState(null);

  // This function handles the image upload and sets the image URL
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first file from the file input
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate an object URL for the uploaded image
      setImage(imageUrl); // Set the image URL in the state
    }
  };

  return (
    <div className="editor-container">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} // Trigger image upload on file change
      />
      <div className="canvas-wrapper">
        {image && <CanvasEditor image={image} />} {/* Pass the image URL as a prop */}
      </div>
    </div>
  );
};

export default App;
