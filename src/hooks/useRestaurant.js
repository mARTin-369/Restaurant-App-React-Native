import { useState } from "react";
import yelp from "../api/yelp";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => {
  const [result, setResult] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const searchRestaurant = async (id) => {
    const cacheIntervalInHours = 48;
    const cacheExpiryTime = new Date();
    cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);
    let lastRequest = await AsyncStorage.getItem("lastRequest");
    lastRequest = new Date(lastRequest);

    setResult({
      data: null,
      loading: true,
      error: null,
    });

    try {
      let cachedData = await AsyncStorage.getItem(id);

      if (
        cachedData == null ||
        lastRequest == null ||
        lastRequest > cacheExpiryTime
      ) {
        const response = await yelp.get(`/${id}`, {});
        await AsyncStorage.setItem("lastRequest", new Date().toString());
        await AsyncStorage.setItem(id, JSON.stringify(response.data));

        setResult({
          data: response.data,
          loading: false,
          error: null,
        });
      } else {
        // console.log("Rendering cached results");
        setResult({
          data: JSON.parse(cachedData),
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      setResult({
        data: null,
        loading: false,
        error: "API Request failed",
      });
    }
  };

  return [result, searchRestaurant];
};
