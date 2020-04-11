import React, { FC, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Population } from "../../services/populations/models";
export type ChartData = {
  prefName: string;
  data: Population[];
};

const formatChartDataList = (chartDataList: ChartData[]) => {
  const dataObj = chartDataList.reduce(
    (obj: { [key: number]: { [key: string]: number } }, chartData) => {
      chartData.data.forEach((population: Population) => {
        obj[population.year] = obj[population.year] || {};
        obj[population.year][chartData.prefName] = population.value;
      });
      return obj;
    },
    {}
  );
  const keyList = (Object.keys(dataObj) as unknown) as number[];
  return keyList.map((key: number) => ({
    year: Number(key),
    ...dataObj[key],
  }));
};

export const PrefecturePopulationChart: FC<{ chartDataList: ChartData[] }> = ({
  chartDataList,
}) => {
  const [formatedChartDataList, setFormatedChartDataList] = useState();
  useEffect(() => {
    (() => {
      setFormatedChartDataList(formatChartDataList(chartDataList));
    })();
  }, [chartDataList]);
  return (
    <LineChart width={800} height={400} data={formatedChartDataList}>
      {chartDataList.map((chartData) => {
        return <Line key={chartData.prefName} dataKey={chartData.prefName} />;
      })}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend layout="horizontal" align="center" verticalAlign="top" />
    </LineChart>
  );
};
