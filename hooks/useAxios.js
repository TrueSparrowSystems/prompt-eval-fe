import axios from 'axios';
import { useState } from 'react';

const useAxios = (url, params) => {
  const [isLoading, setIsLoading] = useState(false);

  const _apiRequest = async (callback) => {
    try {
      setIsLoading(true);
      const data = await callback();
      return data;
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getData = async () => {
    return _apiRequest(async () => {
      const response = await axios.get(url, params);
      return response;
    });
  };

  const postData = async () => {
    return _apiRequest(async () => {
      const response = await axios.post(url, params);
      return response;
    });
  };

  return { isLoading, getData, postData };
};

export default useAxios;
