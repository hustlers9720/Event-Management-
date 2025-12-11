import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAxios from "../../../../hooks/useAxios";
import { useState } from "react";

const AddEvent = () => {
  const { register, handleSubmit, reset } = useForm();
  const axios = useAxios();
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  // 👇 Upload image to Cloudinary
  const handleImageUpload = async (file) => {
    setUploading(true);
    const loadingToast = toast.loading("Uploading image...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Event-Management"); // replace
    formData.append("cloud_name", "dhcgxaw9i"); // replace

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dhcgxaw9i/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      toast.dismiss(loadingToast);
      toast.success("Image uploaded!");
      setImageURL(data.secure_url);
      setUploading(false);
      return data.secure_url;
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Image upload failed");
      setUploading(false);
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    const { title, type, location, speakers, sponsor, description, seat, date } = data;

    if (!imageURL) {
      toast.error("Please upload an image first!");
      return;
    }

    const loadingToast = toast.loading("Creating new event...");

    const newEvent = {
      title,
      type,
      location,
      speakers,
      sponsor,
      description,
      seat,
      image: imageURL,
      date,
    };

    try {
      await axios.post("/add-event", newEvent);
      toast.dismiss(loadingToast);
      toast.success("Event successfully added!");
      reset();
      setImageURL("");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to add event!");
      console.error(error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <h3 className="text-primary text-4xl font-bold py-5">Add Event</h3>
      </div>

      <div className="bg-rose-50/50 dark:bg-[#0c1427] border dark:border-gray-800 rounded py-2 px-3 md:w-3/4 mx-auto">
        <form
          className="w-full space-y-2 p-3 md:p-5 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Event Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 py-1.5">
              Event Name
            </label>
            <input
              type="text"
              placeholder="Event Title"
              {...register("title", { required: true, maxLength: 100 })}
              className="px-2.5 py-2 w-full border text-sm bg-body border-primary/20 rounded-md"
              required
            />
          </div>

          {/* Other Inputs */}
          <div className="md:flex gap-3">
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 py-1.5">
                Event Seats
              </label>
              <input
                type="text"
                placeholder="Event Seats"
                {...register("seat", { required: true })}
                className="px-2.5 py-2 w-full border text-sm bg-body border-primary/20 rounded-md"
                required
              />
            </div>

            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 py-1.5">
                Event Type
              </label>
              <input
                type="text"
                placeholder="Event Type"
                {...register("type", { required: true })}
                className="px-2.5 py-2 w-full border text-sm bg-body border-primary/20 rounded-md"
                required
              />
            </div>
          </div>

          <div className="md:flex gap-3">
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 py-1.5">
                Event Location
              </label>
              <input
                type="text"
                placeholder="Location"
                {...register("location", { required: true })}
                className="px-2.5 py-2 w-full border text-sm bg-body border-primary/20 rounded-md"
                required
              />
            </div>

            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 py-1.5">
                Event Date
              </label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="px-2.5 py-2 w-full border text-sm bg-body border-primary/20 rounded-md"
                required
              />
            </div>
          </div>

          <div className="md:flex gap-3">
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 py-1.5">
                Speakers
              </label>
              <input
                type="text"
                placeholder="Speakers"
                {...register("speakers", { required: true })}
                className="px-2.5 py-2 w-full border text-sm bg-body border-primary/20 rounded-md"
                required
              />
            </div>

            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 py-1.5">
                Sponsor
              </label>
              <input
                type="text"
                placeholder="Sponsor"
                {...register("sponsor", { required: true })}
                className="px-2.5 py-2 w-full border text-sm bg-body border-primary/20 rounded-md"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 py-1.5">
              Event Details
            </label>
            <textarea
              cols="10"
              rows="10"
              placeholder="Description"
              {...register("description", { required: true })}
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
            {uploading && <p className="text-blue-500 text-sm mt-2">Uploading...</p>}
            {imageURL && (
              <img
                src={imageURL}
                alt="Uploaded preview"
                className="mt-3 w-48 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={uploading}
              className="mx-auto rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary/95"
            >
              {uploading ? "Uploading..." : "Create New Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
