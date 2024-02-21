import axios from "axios";

const useApi = () => {
  const uploadImage = async (name, file, setLoading) => {
    const formData = new FormData();

    formData.append(name, file);

    try {
      const response = await axios.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(response);

      return {
        status: 200,
        message: response.data.message,
        image: response.data.imageUrl,
      };
    } catch (error) {
      if (setLoading) setLoading(false);
      return {
        status: 400,
        message: error?.response?.data?.message || error.message,
      };
    }
  };

  const uploadImages = async (files) => {
    const formData = new FormData();
    // image is in blob format

    for (let i = 0; i < files.length; i++) {
      const res = await fetch(files[i]);
      const blob = await res.blob();

      formData.append("images", blob);
    }

    try {
      const response = await axios.post("/upload-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        status: 200,
        message: response.data.message,
        images: response.data.imageUrls,
      };
    } catch (error) {
      return {
        status: 400,
        message: error?.response?.data?.message || error.message,
      };
    }
  };

  const updateImages = async (files) => {
    let images = [];
    for (let i = 0; i < files.length; i++) {
      if (typeof files[i] == "string") {
        images.push(files[i]);
      } else {
        const response = await uploadImage("image", files[i]);
        if (response.status === 200) {
          images.push(response.image);
        }
      }
    }

    return {
      status: 200,
      images,
    };
  };

  return { uploadImage, uploadImages, updateImages };
};

export default useApi;
