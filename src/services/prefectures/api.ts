import { axiosInstance } from "../../plugins/axios";
import { Prefecture } from "./models";

export const getAllPrefectures = async () => {
  const { data } = await axiosInstance.get<{ result: Prefecture[] }>(
    "prefectures"
  );
  return data.result;
};
