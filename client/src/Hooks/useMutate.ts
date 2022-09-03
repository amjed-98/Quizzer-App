import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';

type TMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const useMutate = <TData, TMutate>(method: TMethod, url: string) =>
  useMutation<AxiosResponse<TData>, AxiosError, TMutate>((data) => axios(url, { method, data }));

export default useMutate;
