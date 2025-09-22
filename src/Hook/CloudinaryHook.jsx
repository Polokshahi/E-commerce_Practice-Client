// hooks/useCloudinaryUpload.js

import { useState } from "react";

const CloudinaryHook = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [error, setError] = useState(null);

  const cloudName = "YOUR_CLOUD_NAME"; // ← replace with your Cloudinary cloud name
  const uploadPreset = "YOUR_UPLOAD_PRESET"; // ← replace with your unsigned upload preset

  const uploadFile = async (file) => {
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadedUrl(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setUploadedUrl(data.secure_url);
        return data.secure_url;
      } else {
        throw new Error("Upload failed: No secure_url returned");
      }
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      setError(err);
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    uploadedUrl,
    error,
    uploadFile,
  };
};

export default CloudinaryHook;
