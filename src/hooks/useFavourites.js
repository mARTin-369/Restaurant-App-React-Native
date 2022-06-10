import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => {
  const [results, setResults] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const getFavourites = async () => {
    setResults({
      data: null,
      loading: true,
      error: null,
    });

    try {
      let favourites = (await AsyncStorage.getItem("favoutites")) || [];

      setResults({
        data: JSON.parse(favourites),
        loading: false,
        error: null,
      });
    } catch (error) {
      // console.log(error);
      setResults({
        data: null,
        loading: false,
        error: "Failed to load data",
      });
    }
  };

  const setFavourites = async (favourites) => {
    setResults({
      data: null,
      loading: true,
      error: null,
    });

    try {
      await AsyncStorage.setItem("favourites", JSON.stringify(favourites));

      setResults({
        data: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      // console.log(error);
      setResults({
        data: null,
        loading: false,
        error: "Failed to save data",
      });
    }
  };

  return [results, getFavourites, setFavourites];
};
