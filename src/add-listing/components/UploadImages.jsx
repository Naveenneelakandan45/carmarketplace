import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

function UploadImages({ setFormData, setLoader }) {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadError, setUploadError] = useState("");
  
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dwbcok62x/image/upload";
  const UPLOAD_PRESET = "car_stoage"; // Ensure this is correct in Cloudinary

  const onFileSelected = async (event) => {
    const filesArray = Array.from(event.target.files);
    if (filesArray.length === 0) return;

    setSelectedFileList((prev) => [...prev, ...filesArray]);
    setLoader(true);
    setUploadError(""); // Clear previous errors

    let uploadedUrls = [];

    for (let file of filesArray) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", "dwbcok62x");

      try {
        const res = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: data,
          headers: {
            "Accept": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Upload failed: ${res.statusText}`);
        }

        const uploadedData = await res.json();
        if (uploadedData.url) {
          uploadedUrls.push(uploadedData.url);
        } else {
          console.error("Upload failed. No URL returned.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploadError("Image upload failed. Please try again.");
      }
    }

    // Store uploaded image URLs in state and formData
    setUploadedImages((prev) => [...prev, ...uploadedUrls]);
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...uploadedUrls],
    }));
    setLoader(false);
  };

  // Function to remove an image
  const removeImage = (imageUrl) => {
    const filteredImages = uploadedImages.filter((img) => img !== imageUrl);
    setUploadedImages(filteredImages);
    setFormData((prev) => ({ ...prev, images: filteredImages }));
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>

      {uploadError && <p className="text-red-500">{uploadError}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 rounded-xl">
        {uploadedImages.map((image, index) => (
          <div key={index} className="relative">
            <IoMdCloseCircle
              className="absolute top-2 left-2 text-red-600 cursor-pointer text-xl"
              onClick={() => removeImage(image)}
            />
            <img
              src={image}
              className="w-full h-[130px] object-cover rounded-xl"
              alt="uploaded"
            />
          </div>
        ))}

        {/* Upload Button */}
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-sky-800 bg-blue-100 p-10 cursor-pointer hover:shadow-md">
            <h2 className="text-center text-blue-600 text-xl">+</h2>
          </div>
        </label>

        <input
          type="file"
          multiple
          id="upload-images"
          onChange={onFileSelected}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default UploadImages;
