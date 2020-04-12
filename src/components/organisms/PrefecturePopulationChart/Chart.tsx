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
import styled from "styled-components";
import { Population } from "../../../services/populations/models";
import { ChartData } from "./index";

const StyledChartWrapper = styled.div`
  width: 960px;
  padding: 24px;
  background-color: #fafafa;
  border-color: rgba(223, 225, 229, 0);
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
`;

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

export const Chart: FC<{ chartDataList: ChartData[] }> = ({
  chartDataList,
}) => {
  const [formatedChartDataList, setFormatedChartDataList] = useState();
  useEffect(() => {
    (() => {
      setFormatedChartDataList(formatChartDataList(chartDataList));
    })();
  }, [chartDataList]);
  return (
    <StyledChartWrapper>
      <LineChart width={800} height={400} data={formatedChartDataList}>
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          margin={{ top: 20 }}
        />
        {chartDataList.map((chartData) => {
          return <Line key={chartData.prefName} dataKey={chartData.prefName} />;
        })}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </StyledChartWrapper>
  );
};
