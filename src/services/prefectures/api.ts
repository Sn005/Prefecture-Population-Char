import { axiosInstance } from "../../plugins/axios";
import { Prefectures } from "./models";

export const getAllPrefectures = async () => {
  const { data } = await axiosInstance.get<{ result: Prefectures[] }>(
    "prefectures"
  );
  return data.result;
};
