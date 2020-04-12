import React, { FC } from "react";
import { Layout } from "./Layout";
import { CheckBoxList } from "./CheckBoxList";
import { Chart } from "./Chart";
import { Prefecture } from "../../../services/prefectures/models";
import { Population } from "../../../services/populations/models";

export type ChartData = {
  prefName: string;
  data: Population[];
};

type Props = {
  prefectureList: Prefecture[] | null;
  chartDataList: ChartData[] | null;
  handleCheckedPrefecture: (prefecture: Prefecture) => void;
  handleUncheckedPrefecture: (prefName: string) => void;
};
export const PrefecturePopulationChart: FC<Props> = ({
  prefectureList,
  chartDataList,
  handleCheckedPrefecture,
  handleUncheckedPrefecture,
}) => {
  return (
    <Layout
      headerComponent={
        prefectureList && (
          <CheckBoxList
            prefectureList={prefectureList}
            handleCheckedPrefecture={handleCheckedPrefecture}
            handleUncheckedPrefecture={handleUncheckedPrefecture}
          />
        )
      }
      mainComponent={
        chartDataList &&
        !!chartDataList.length && <Chart chartDataList={chartDataList} />
      }
    />
  );
};
