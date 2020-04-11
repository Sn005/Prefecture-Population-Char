import React, { FC } from "react";
import styled from "styled-components";
import { Prefecture } from "../../services/prefectures/models";

const PrefectureCheckBox = styled.span`
  > .prefecureInput {
    display: none;
    &:checked + .prefecureLabel::before {
      opacity: 1;
    }
  }
  > .prefecureLabel {
    box-sizing: border-box;
    -webkit-transition: background-color 0.2s linear;
    transition: background-color 0.2s linear;
    position: relative;
    display: inline-block;
    margin: 0 20px 8px 0;
    padding: 4px 4px 4px 24px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    vertical-align: middle;
    cursor: pointer;
    color: #616161;
    font-size: 16px;
    font-weight: bold;
    &:hover {
      background-color: #f6f7f8;
    }
    &::after {
      background-color: #53b300;
    }
    &::before {
      -webkit-transition: opacity 0.15s linear;
      transition: opacity 0.15s linear;
      position: absolute;
      top: 50%;
      left: 9px;
      display: block;
      margin-top: -7px;
      width: 5px;
      height: 9px;
      border-right: 3px solid #9ccc65;
      border-bottom: 3px solid #9ccc65;
      content: "";
      opacity: 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
`;

const PrefecuresListItem = styled.li`
  list-style-type: none;
  display: inline-block;
  margin-bottom: 4px;
  & + & {
    margin-left: 4px;
  }
`;
const PrefecuresList = styled.ul`
  margin-bottom: -4px;
`;
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
    <PrefecuresList>
      {prefectures.map((prefecture) => (
        <PrefecuresListItem key={prefecture.prefCode}>
          <PrefectureCheckBox>
            <input
              type="checkbox"
              id={prefecture.prefName}
              name={prefecture.prefName}
              value={prefecture.prefCode}
              onChange={handleChangePrefecture}
              className="prefecureInput"
            />
            <label htmlFor={prefecture.prefName} className="prefecureLabel">
              {prefecture.prefName}
            </label>
          </PrefectureCheckBox>
        </PrefecuresListItem>
      ))}
    </PrefecuresList>
  );
};
