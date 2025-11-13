import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewImage = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `http://localhost:3000/api/cloudinary/getImages/${id}`
      );
      if (response) {
        setImage(response.data.data);
        console.log(image);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [id]);

  // Add this useEffect to log when imageList actually updates
  useEffect(() => {
    console.log("imageList updated:", image);
  }, [image]);

  if (loading) {
    return (
      <div className="main-section bg-red-500 h-screen w-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading images...</div>
      </div>
    );
  }

  return (
    <>
      <div className="main-section bg-red-500 h-screen w-screen">
        <div className="img-section bg-green-400">
          {image && image.imageURL? (
            
              <img
                key={image._id} // Important: add a unique key
                src={image.imageURL} // Use the actual image URL
                alt={image.originalName || "Image"}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )
           : (
            <div>No images found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewImage;
