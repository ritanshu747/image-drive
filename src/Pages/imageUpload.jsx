import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [name, setName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [imageFound, setImageFound] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('Please enter an image name.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);

      const response = await axios.post('http://localhost:4000/api/v1/upload/imageUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchName) {
      toast.error('Please enter a name to search for.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/search/imageSearch', {
        name: searchName,
      });

      console.log('Image found:', response.data);
      setImageFound(response.data.imageUrl);
      toast.success('Image found successfully');
    } catch (error) {
      console.error('Error searching image:', error);
      toast.error('Error searching image');
      setImageFound(null); // Clear imageFound state if no image found
    }
  };

  return (
    <div>
      <Navbar />

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-8">
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <input
          type="text"
          placeholder="Enter image name"
          value={name}
          onChange={handleNameChange}
          className="w-full py-2 px-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none">
          Upload File
        </button>
      </form>

      <form onSubmit={handleSearch} className="max-w-sm mx-auto my-8">
        <input
          type="text"
          placeholder="Search image by name"
          value={searchName}
          onChange={handleSearchNameChange}
          className="w-full py-2 px-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none">
          Search Image
        </button>
      </form>

      {imageFound && (
        <div className="max-w-sm mx-auto">
          <h3 className="text-lg font-bold mb-2">Found Image:</h3>
          <img src={imageFound} alt="Found Image" className="w-full rounded-md" />
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
