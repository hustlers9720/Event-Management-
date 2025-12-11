import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosPublic();
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  // 👇 Upload image to Cloudinary
  const handleImageUpload = async (file) => {
    setUploading(true);
    const loadingToast = toast.loading("Uploading image...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Event-Management");
    formData.append("cloud_name", "dhcgxaw9i");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dhcgxaw9i/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setImageURL(data.secure_url);
        toast.success("Image uploaded!");
      } else {
        toast.error("Upload failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading image.");
    } finally {
      toast.dismiss(loadingToast);
      setUploading(false);
    }
  };

  // 👇 Submit new product
  const onSubmit = async (data) => {
    const { product_name, product_price, product_description } = data;

    if (!imageURL) {
      toast.error("Please upload an image first!");
      return;
    }

    const loadingToast = toast.loading("Creating new product...");

    const newProduct = {
      product_name,
      product_price,
      product_description,
      product_image: imageURL,
    };

    try {
      const res = await axiosSecure.post("/products", newProduct);

      if (res.data._id || res.data.insertedId) {
        toast.success("Product successfully added!");
        reset();
        setImageURL("");
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating product!");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <h3 className="text-primary text-4xl font-bold py-5">Add Product</h3>
      </div>

      <div className="bg-rose-50/50 dark:bg-[#0c1427] border dark:border-gray-800 rounded py-2 px-3 md:w-3/4 mx-auto">
        <form
          className="w-full space-y-2 p-3 md:p-5 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Product Name & Price */}
          <div className="md:flex gap-3">
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 py-1.5">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Product name"
                {...register("product_name", { required: true })}
                className="px-2.5 py-2 w-full border text-sm bg-body border-primary/20 rounded-md"
                required
              />
            </div>

            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 py-1.5">
                Product Price
              </label>
              <input
                type="text"
                placeholder="Product price"
                {...register("product_price", { required: true })}
                className="px-2.5 py-2 w-full border text-sm bg-body border-primary/20 rounded-md"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 py-1.5">
              Product Description
            </label>
            <textarea
              cols="10"
              rows="6"
              placeholder="Product description"
              {...register("product_description", { required: true })}
              className="px-2.5 py-2 w-full border text-sm bg-body border-primary/20 rounded-md"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col items-center justify-center mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className="w-full max-w-xs"
            />
            {uploading && (
              <p className="text-blue-500 text-sm mt-2">Uploading...</p>
            )}
            {imageURL && (
              <img
                src={imageURL}
                alt="Uploaded preview"
                className="mt-3 w-48 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={uploading}
              className="mx-auto rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase text-white shadow transition duration-150 ease-in-out hover:bg-primary/95 focus:outline-none"
            >
              {uploading ? "Uploading..." : "Add New Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
