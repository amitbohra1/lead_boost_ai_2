"use client";
import axios from "axios";
import { applyInterceptors } from "./interceptors";
import { getApiToken } from "@/utils/storage";

const apiClient = axios.create({
  baseURL: "https://www.tavernaai.com/leadboostai_dashboard/v1/",
});

applyInterceptors(apiClient);

type ApiMethod = "get" | "post" | "put" | "delete";

export const apicall = async (
  method: ApiMethod,
  url: string,
  data?: any,
  responseType: "json" | "blob" = "json"
) => {
  try {
    const response = await apiClient.request({
      method,
      url,
       data: {
      ...data,
      // token: getApiToken(),   
    },
      responseType,
    });

    return response;
  } catch (err) {
    throw err;
  }
};

