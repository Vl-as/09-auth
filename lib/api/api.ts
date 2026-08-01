import axios, { AxiosError } from 'axios';

const baseURL = '/api';
export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export type ApiError = AxiosError<{ error: string }>;
