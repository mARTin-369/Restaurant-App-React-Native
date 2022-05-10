import { useState } from "react";
import yelp from "../api/yelp";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => {
  const [results, setResults] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const searchRestaurants = async (term) => {
    const cacheIntervalInHours = 24;
    const cacheExpiryTime = new Date();
    cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);
    // console.log(cacheExpiryTime);
    let lastRequest = await AsyncStorage.getItem("lastRequest");
    lastRequest = new Date(lastRequest);
    // console.log(lastRequest);

    setResults({
      data: null,
      loading: true,
      error: null,
    });

    try {
      let cachedData = await AsyncStorage.getItem(term);

      if (
        cachedData == null ||
        lastRequest == null ||
        lastRequest > cacheExpiryTime
      ) {
        const response = await yelp.get("/search", {
          params: {
            limit: 25,
            term,
            location: "Toronto",
          },
        });

        // console.log(response.data.businesses);
        await AsyncStorage.setItem("lastRequest", new Date().toString());
        await AsyncStorage.setItem(
          term,
          JSON.stringify(response.data.businesses)
        );
        // console.log("API result cached");

        setResults({
          data: response.data.businesses,
          loading: false,
          error: null,
        });
      } else {
        // console.log("Rendering cached results");
        setResults({
          data: JSON.parse(cachedData),
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      // console.log(error);
      setResults({
        data: null,
        loading: false,
        error: "API Request failed",
      });
    }
  };

  return [results, searchRestaurants];
};
