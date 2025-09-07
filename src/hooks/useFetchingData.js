import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getData } from "../utils/store/dataSlice";

const OPENAI_KEY = import.meta.env.VITE_APIKEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": OPENAI_KEY ,
  },
};

const useFetchingData = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.data.tokenData);

  useEffect(() => {
    fetchDatawithRetry();
  }, []);

  const fetchDatawithRetry = async (retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        let response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true",
          options
        );
        if (!response.ok) throw new Error("Server error");
        const data = await response.json();
        dispatch(getData(data));
        return data;
      } catch (err) {
        console.error(`Attempt ${attempt} failed`, err.message);
        if (attempt === retries) throw err;
      }
    }
  };

  return { fetchDatawithRetry, data };
};

export default useFetchingData;
