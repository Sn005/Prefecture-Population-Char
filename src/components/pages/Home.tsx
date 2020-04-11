import React, { FC, useState, useEffect, useCallback, Children } from "react";
import { Prefecture } from "../../services/prefectures/models";
import { getAllPrefectures } from "../../services/prefectures/api";
import { getPopulation } from "../../services/populations/api";
import { Default } from "../templates/default";
import { AppHeader } from "../organisms/AppHader";
import { PrefecturesSelect } from "../organisms/PrefecturesSelect";
import {
  PrefecturePopulationChart,
  ChartData,
} from "../organisms/PrefecturePopulationChart";

const MainPainComponent: FC<{
  prefectures: Prefecture[] | null;
  chartDataList: ChartData[] | null;
  handleCheckedPrefecture: (prefecture: Prefecture) => void;
  handleUncheckedPrefecture: (prefName: string) => void;
}> = ({
  prefectures,
  chartDataList,
  handleCheckedPrefecture,
  handleUncheckedPrefecture,
}) => (
  <>
    {prefectures && (
      <PrefecturesSelect
        prefectures={prefectures}
        handleCheckedPrefecture={handleCheckedPrefecture}
        handleUncheckedPrefecture={handleUncheckedPrefecture}
      />
    )}
    {chartDataList && (
      <PrefecturePopulationChart chartDataList={chartDataList} />
    )}
  </>
);
export const Home: FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[] | null>(null);
  const [chartDataList, setChartDataList] = useState<ChartData[] | null>(null);
  const handleCheckedPrefecture = useCallback(
    async ({ prefCode, prefName }: Prefecture) => {
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
    },
    [chartDataList]
  );

  const handleUncheckedPrefecture = useCallback(
    async (prefName: string) => {
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
        const fetchedPrefectures = await getAllPrefectures();
        setPrefectures(fetchedPrefectures);
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
          <MainPainComponent
            prefectures={prefectures}
            chartDataList={chartDataList}
            handleCheckedPrefecture={handleCheckedPrefecture}
            handleUncheckedPrefecture={handleUncheckedPrefecture}
          />
        }
      />
    </>
  );
};
