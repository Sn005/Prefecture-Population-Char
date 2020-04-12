import React, { FC, useState, useEffect, useCallback } from "react";
import { Prefecture } from "../../services/prefectures/models";
import { getAllPrefectures } from "../../services/prefectures/api";
import { getPopulation } from "../../services/populations/api";
import { Default } from "../templates/Default";
import { AppHeader } from "../organisms/AppHader";
import {
  PrefecturePopulationChart,
  ChartData,
} from "../organisms/PrefecturePopulationChart/";

export const Home: FC = () => {
  const [prefectureList, setPrefectureList] = useState<Prefecture[] | null>(
    null
  );
  const [chartDataList, setChartDataList] = useState<ChartData[] | null>(null);
  const handleCheckedPrefecture = useCallback(
    async ({ prefCode, prefName }: Prefecture) => {
      try {
        const fetchedPopulation = await getPopulation(prefCode);
        const newChartData: ChartData = {
          prefName,
          data: fetchedPopulation,
        };
        if (chartDataList === null) {
          setChartDataList([newChartData]);
          return;
        }
        if (chartDataList.find((v) => v.prefName === prefName) === undefined) {
          setChartDataList([...chartDataList, newChartData]);
          return;
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    [chartDataList]
  );

  const handleUncheckedPrefecture = useCallback(
    (prefName: string) => {
      if (chartDataList === null) return;
      const isExit = !!chartDataList.find((v) => v.prefName === prefName);
      if (!isExit) return;
      setChartDataList(chartDataList.filter((v) => v.prefName !== prefName));
    },
    [chartDataList]
  );
  useEffect(() => {
    (async () => {
      try {
        const fetchedPrefectureList = await getAllPrefectures();
        setPrefectureList(fetchedPrefectureList);
      } catch (e) {
        throw new Error(e);
      }
    })();
  }, []);

  return (
    <>
      <Default
        headerComponent={<AppHeader />}
        mainPainComponent={
          <PrefecturePopulationChart
            prefectureList={prefectureList}
            chartDataList={chartDataList}
            handleCheckedPrefecture={handleCheckedPrefecture}
            handleUncheckedPrefecture={handleUncheckedPrefecture}
          />
        }
      />
    </>
  );
};
