import axios from "axios";
import { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const ViewImage = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      <div className="big-container h-screen py-20">
        <div className="main-section flex flex-col justify-center items-center border-2 w-fit h-fit p-4 rounded-3xl mx-auto ">
          <div className="img-section  border-2 rounded-xl">
            {image && image.imageURL ? (
              <div>
                <img
                  className="rounded-t-xl"
                  key={image._id} // Important: add a unique key
                  src={image.imageURL} // Use the actual image URL
                  alt={image.originalName || "Image"}
                  style={{ maxWidth: "100%", height: "100%" }}
                />
                <p className="text-center  ">{image.originalName}</p>
              </div>
            ) : (
              <div>No images found</div>
            )}
          </div>

          <IoArrowBackSharp
            className="border-2 border-blue-800 rounded-2xl mt-2 text-white bg-blue-500 hover:text-amber-200 hover:bg-blue-600 hover:border-red-500 cursor-pointer"
            size={80}
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </>
  );
};

export default ViewImage;
