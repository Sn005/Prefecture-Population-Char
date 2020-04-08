import React, { FC, useState, useEffect } from "react";
import { Prefecture } from "../../services/prefectures/models";

type PropsType = {
  prefectures: Prefecture[];
  handleSelectPrefecture: (prefecture: Prefecture) => void;
};
export const PrefecturesSelect: FC<PropsType> = ({
  prefectures,
  handleSelectPrefecture,
}) => {
  const handleChangePrefecture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    handleSelectPrefecture({
      prefCode: Number(target.value),
      prefName: target.name,
    });
  };
  return (
    <div>
      {prefectures.map((prefecture) => (
        <span key={prefecture.prefCode}>
          <label htmlFor={prefecture.prefName}>{prefecture.prefName}</label>
          <input
            type="checkbox"
            id={prefecture.prefName}
            name={prefecture.prefName}
            value={prefecture.prefCode}
            onChange={handleChangePrefecture}
          />
        </span>
      ))}
    </div>
  );
};
