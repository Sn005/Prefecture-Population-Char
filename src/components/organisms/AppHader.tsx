import React, { FC } from "react";
import styled from "styled-components";

const StyledAppHeader = styled.header`
  width: 100%;
  background-color: #64b5f6;
  box-shadow: 0 4px 6px 0 rgba(32, 33, 36, 0.2);
  text-align: center;
  & > .title {
    font-weight: bold;
    font-size: 24px;
    color: #fafafa;
    line-height: 1;
    padding: 16px 0;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  }
`;

export const AppHeader: FC = () => (
  <StyledAppHeader>
    <h1 className="title">Prefecture Population Chart</h1>
  </StyledAppHeader>
);
