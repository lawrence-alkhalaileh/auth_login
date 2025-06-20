import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_API_SERVER_DOMAIN;

interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  profile: string;
}

interface FetchState<T = UserProfile> {
  isLoading: boolean;
  apiData: T | null;
  status: number | null;
  serverError: AxiosError | null;
}

const getDefaultState = <T>(): FetchState<T> => ({
  isLoading: true,
  apiData: null,
  status: null,
  serverError: null,
});

export default function useFetch<T = UserProfile>(
  query: string
): [FetchState<T>, React.Dispatch<React.SetStateAction<FetchState<T>>>] {
  const [data, setData] = useState<FetchState<T>>(getDefaultState<T>());

  useEffect(() => {
    if (!query) {
      setData(getDefaultState<T>());
      return;
    }

    const fetchData = async () => {
      try {
        setData((prev) => ({
          ...prev,
          isLoading: true,
          serverError: null,
        }));

        const response: AxiosResponse<T> = await axios.get(`/api/${query}`);

        setData({
          isLoading: false,
          apiData: response.data,
          status: response.status,
          serverError: null,
        });
      } catch (error) {
        const axiosError = error as AxiosError;
        setData({
          isLoading: false,
          apiData: null,
          status: axiosError.response?.status || null,
          serverError: axiosError,
        });
      }
    };

    const fetchTimer = setTimeout(fetchData, 100);

    return () => clearTimeout(fetchTimer);
  }, [query]);

  return [data, setData];
}
