import React, { FC, useState } from "react";
import styled from "styled-components";
import { Prefecture } from "../../../services/prefectures/models";

const StyleCheckBox = styled.span`
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
    padding: 8px 8px 8px 24px;
    background-color: #fafafa;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    vertical-align: middle;
    cursor: pointer;
    color: #616161;
    font-size: 16px;
    font-weight: bold;
    &:hover {
      background-color: #eeeeee;
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

const StyledCheckBoxListItem = styled.li`
  list-style-type: none;
  display: inline-block;
  margin-bottom: 20px;
  & + & {
    margin-left: 20px;
  }
`;
const StyledCheckBoxList = styled.ul`
  margin-bottom: -20px;
`;
type CheckBoxProps = {
  prefecture: Prefecture;
  handleCheckedPrefecture: (prefecture: Prefecture) => void;
  handleUncheckedPrefecture: (prefName: string) => void;
};

const CheckBox: FC<CheckBoxProps> = ({
  prefecture,
  handleCheckedPrefecture,
  handleUncheckedPrefecture,
}) => {
  const [isChecked, setIsChecked] = useState(false);
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
    setIsChecked(target.checked);
  };
  return (
    <StyleCheckBox>
      <input
        type="checkbox"
        id={prefecture.prefName}
        name={prefecture.prefName}
        value={prefecture.prefCode}
        onChange={handleChangePrefecture}
        className="prefecureInput"
        checked={isChecked}
      />
      <label htmlFor={prefecture.prefName} className="prefecureLabel">
        {prefecture.prefName}
      </label>
    </StyleCheckBox>
  );
};

type CheckBoxListProps = {
  prefectureList: Prefecture[];
  handleCheckedPrefecture: (prefecture: Prefecture) => void;
  handleUncheckedPrefecture: (prefName: string) => void;
};

export const CheckBoxList: FC<CheckBoxListProps> = ({
  prefectureList,
  handleCheckedPrefecture,
  handleUncheckedPrefecture,
}) => {
  return (
    <StyledCheckBoxList>
      {prefectureList.map((prefecture) => (
        <StyledCheckBoxListItem key={prefecture.prefCode}>
          <CheckBox
            prefecture={prefecture}
            handleCheckedPrefecture={handleCheckedPrefecture}
            handleUncheckedPrefecture={handleUncheckedPrefecture}
          />
        </StyledCheckBoxListItem>
      ))}
    </StyledCheckBoxList>
  );
};
