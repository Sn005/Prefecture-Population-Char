import React, { FC, useState, useEffect, useCallback } from "react";
import { Prefecture } from "../../services/prefectures/models";
import { getAllPrefectures } from "../../services/prefectures/api";
import { PrefecturesSelect } from "../organisms/PrefecturesSelect";

export const Home: FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[] | null>(null);
  const handleSelectPrefecture = useCallback(async (prefecture: Prefecture) => {
    console.log(prefecture);
  }, []);
  useEffect(() => {
    (async () => {
      const fetchedPrefectures = await getAllPrefectures();
      setPrefectures(fetchedPrefectures);
    })();
  }, []);
  return (
    prefectures && (
      <PrefecturesSelect
        prefectures={prefectures}
        handleSelectPrefecture={handleSelectPrefecture}
      />
    )
  );
};
