import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Home = () => {
  const [image, setImage] = useState({});
      const navigate = useNavigate();
  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/cloudinary/getImages"
      );
      if (response) {
        setImage(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const notify = () => toast("Successfully added new image!");
  useEffect(() => {
    fetchImages();
  }, [image]);

  // Add this useEffect to log when imageList actually updates
  useEffect(() => {
    console.log("imageList updated:", image);
  }, [image]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    const form = new FormData();
    acceptedFiles.forEach((file) => {
      form.append("photo", file);
    });
    const response = axios.post(
      "http://localhost:3000/api/cloudinary/images",
      form
    );
    fetchImages();
    notify();
    console.log(response);
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <ToastContainer />
      <div className="main-body w-screen h-screen ">
        <div className="upperSection w-full h-fit flex flex-col items-center py-4 ">
          <h1 className="text-4xl p-4 font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Image Gallery
          </h1>

          <div
            {...getRootProps()}
            className=" hover:bg-blue-100  p-8 border-2 border-blue-600 border-dotted rounded-2xl"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="font-bold italic cursor-pointer hover:font-bold hover:text-red-500">
                Drop the files here ...
              </p>
            ) : (
              <p className="font-bold italic cursor-pointer hover:font-bold hover:text-red-500">
                Drag 'n' drop some files here, or click to select files
              </p>
            )}
          </div>
        </div>
        <div
          className="lowerSection  max-w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
         gap-3 "
        >
          {image.length > 0 &&
            image.map((img) => (
              <div
                key={img._id}
                style={{ width: "10rem", height: "13  rem" }}
                className="  flex flex-col justify-between
                 items-center border-2 border-e-black overflow-hidden bg-cover rounded-2xl"
              >
                <div className="">
                  <img
                    src={img.imageURL}
                    style={{ width: "10rem", height: "10rem" }}
                    alt={img.originalName}
                    onClick={() =>navigate(`/imageSingle/${img._id}`)}

                  />
                </div>
                <p className="align-middle text-center">{img.originalName}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
