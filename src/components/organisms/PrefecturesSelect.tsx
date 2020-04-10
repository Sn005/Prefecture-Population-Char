import React, { FC, useState, useEffect } from "react";
import { Prefecture } from "../../services/prefectures/models";

type PropsType = {
  prefectures: Prefecture[];
  handleCheckedPrefecture: (prefecture: Prefecture) => void;
  handleUncheckedPrefecture: (prefName: string) => void;
};
export const PrefecturesSelect: FC<PropsType> = ({
  prefectures,
  handleCheckedPrefecture,
  handleUncheckedPrefecture,
}) => {
  const handleChangePrefecture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target.checked) {
      handleCheckedPrefecture({
        prefCode: Number(target.value),
        prefName: target.name,
      });
    } else {
      handleUncheckedPrefecture(target.name);
    }
  };
  return (
    <div>
      {prefectures.map((prefecture) => (
        <span key={prefecture.prefCode}>
          <input
            type="checkbox"
            id={prefecture.prefName}
            name={prefecture.prefName}
            value={prefecture.prefCode}
            onChange={handleChangePrefecture}
          />
          <label htmlFor={prefecture.prefName}>{prefecture.prefName}</label>
        </span>
      ))}
    </div>
  );
};
