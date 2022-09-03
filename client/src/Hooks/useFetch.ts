import axios, { AxiosError } from 'axios';
import { QueryKey, useQuery } from '@tanstack/react-query';

const instance = axios.create({ baseURL: 'https://lnqlneywjhwyjixkfpdi.supabase.co' });

const useFetch = <TData>(url: string, queryKey: QueryKey, depend?: boolean) => {
  const fetchData = async () => {
    const { data } = await instance.get(url);

    if (data.data) return data.data;

    return data;
  };

  const { isLoading, isError, data, error } = useQuery<TData, AxiosError>(queryKey, fetchData, {
    enabled: depend,
  });

  return {
    isLoading,
    isError,
    data,
    error,
  };
};

export default useFetch;
