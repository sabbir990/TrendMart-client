import axios from 'axios';
import toast from 'react-hot-toast';

export default async function useHostImage(image) {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`, formData);
    return data.data.display_url;
  } catch (error) {
    console.log(error);
    return toast.error(error.message)
  }
}
