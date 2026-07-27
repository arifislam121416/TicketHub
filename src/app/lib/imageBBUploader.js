import toast from "react-hot-toast";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  if (!result.success) {
    toast.error("Image upload failed");
    throw new Error(result.error?.message || "Image upload failed");
  }

  return result.data.url;
};

export default uploadImage;