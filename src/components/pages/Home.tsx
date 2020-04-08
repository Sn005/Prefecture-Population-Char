import React from "react";

import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const series = [
  {
    name: "東京都",
    data: [
      {
        year: 1960,
        value: 2430871,
      },
      {
        year: 1965,
        value: 3014983,
      },
      {
        year: 1970,
        value: 3866472,
      },
      {
        year: 1975,
        value: 4821340,
      },
    ],
  },
  {
    name: "神奈川",
    data: [
      {
        year: 1960,
        value: 2306010,
      },
      {
        year: 1965,
        value: 2701770,
      },
      {
        year: 1970,
        value: 3366624,
      },
      {
        year: 1975,
        value: 4149147,
      },
    ],
  },
];
const dataKeys = series.map((s) => s.name);
const temp = [
  {
    year: 1960,
    value: 2430871,
  },
  {
    year: 1965,
    value: 3014983,
  },
  {
    year: 1970,
    value: 3866472,
  },
  {
    year: 1975,
    value: 4821340,
  },
];

// const result = series.reduce((a: { key: number } | {}, c) => {
//   return c.data.forEach((d) => {
//     a[d.yyaear] = a[d.year] || {};
//     obj[d.year][series.name] = d.value;
//   });
// }, {});
// console.log(result);
const dataObj = series.reduce((obj: any, series) => {
  series.data.forEach((d) => {
    obj[d.year] = obj[d.year] || {};
    obj[d.year][series.name] = d.value;
  });
  return obj;
}, {});
console.log(dataObj);
const data = Object.keys(dataObj).map((key) => ({
  year: key,
  ...dataObj[key],
}));

console.log(data);
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

export const Home = () => (
  <div>
    <LineChart
      width={600}
      height={300}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      data={data}
    >
      {dataKeys.map((datakey) => {
        return <Line key={`line_${datakey}`} dataKey={datakey} />;
      })}
      {/* <Line type="monotone" dataKey="value" />; */}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="year" />
      <YAxis />
      <Legend verticalAlign="top" height={36} />
      <Tooltip />
    </LineChart>
  </div>
);
