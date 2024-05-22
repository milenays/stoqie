import { useState, useEffect } from 'react';
import { Button, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

export default function ImageUpload({ images = [], setImages }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState(images);

  useEffect(() => {
    // Sync the outer images state with the inner component state
    setUploadedImages(images);
  }, [images]);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('file', file);
    });

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Upload Error:', errorData);
        throw new Error('File upload failed');
      }

      const data = await res.json();
      const newImages = [...uploadedImages, ...data.data];
      setUploadedImages(newImages);
      setImages(newImages);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Upload Error Catch:', error);
    }
  };

  const handleDelete = (index) => {
    const newImages = uploadedImages.slice();
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    setImages(newImages);
  };

  return (
    <Box>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span">
          Select Files
        </Button>
      </label>
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={selectedFiles.length === 0}>
        Upload
      </Button>
      <List>
        {uploadedImages.length > 0 && uploadedImages.map((image, index) => (
          <ListItem key={index}>
            <img src={image} alt={`Uploaded image ${index}`} width={100} />
            <ListItemText primary={image} />
            <IconButton onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}