import axios from "axios";

const fetchCoffeeData = async () => {
  try {
    const response = await axios.get("https://fake-coffee-api.vercel.app/api");
    return response.data;
  } catch (error) {
    console.error("Error fetching coffee data:", error);
    console.log(error);
    throw error;
  }
};

export default fetchCoffeeData;
