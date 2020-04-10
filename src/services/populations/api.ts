import { axiosInstance } from "../../plugins/axios";
import { Population } from "./models";

const routePath = "population/composition/perYear";
export const getPopulation = async (prefCode: number) => {
  const params = {
    cityCode: "-",
    prefCode,
  };
  type ResponceType = {
    result: {
      boundaryYear: number;
      data: {
        label: string;
        data: Population[];
      }[];
    };
  };
  const { data } = await axiosInstance.get<ResponceType>(routePath, { params });
  const populationData = data.result.data[0].data;
  return populationData;
};
