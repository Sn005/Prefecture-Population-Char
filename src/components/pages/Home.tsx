import React, { FC, useState, useEffect, useCallback } from "react";
import { Prefecture } from "../../services/prefectures/models";
import { getAllPrefectures } from "../../services/prefectures/api";
import { Population } from "../../services/populations/models";
import { getPopulation } from "../../services/populations/api";
import { PrefecturesSelect } from "../organisms/PrefecturesSelect";
import { ChartData } from "../organisms/PrefecturePopulationChart";

export const Home: FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[] | null>(null);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const handleCheckedPrefecture = useCallback(
    async ({ prefCode, prefName }: Prefecture) => {
      const fetchedPopulation = await getPopulation(prefCode);
      const newChartData: ChartData = {
        prefName,
        data: fetchedPopulation,
      };
      if (chartData === null) {
        setChartData([newChartData]);
        return;
      }
      if (chartData.find((v) => v.prefName === prefName) === undefined) {
        setChartData([...chartData, newChartData]);
        return;
      }
    },
    [chartData]
  );

  const handleUncheckedPrefecture = useCallback(
    async (prefName: string) => {
      if (chartData === null) return;
      const isExit = !!chartData.find((v) => v.prefName === prefName);
      if (!isExit) return;
      setChartData(chartData.filter((v) => v.prefName !== prefName));
    },
    [chartData]
  );
  useEffect(() => {
    (async () => {
      try {
        const fetchedPrefectures = await getAllPrefectures();
        setPrefectures(fetchedPrefectures);
      } catch (e) {
        throw new Error(e);
      }
    })();
  }, []);
  return (
    prefectures && (
      <PrefecturesSelect
        prefectures={prefectures}
        handleCheckedPrefecture={handleCheckedPrefecture}
        handleUncheckedPrefecture={handleUncheckedPrefecture}
      />
    )
  );
};
