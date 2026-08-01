import axios, { AxiosError } from 'axios';

const baseURL = '/api';
export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export type ApiError = AxiosError<{ error: string }>;
