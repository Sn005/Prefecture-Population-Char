import React, { FC } from "react";
import styled from "styled-components";

const StyledAppHeader = styled.header`
  width: 100%;
  background-color: #64b5f6;
  text-align: center;
  & > .title {
    font-weight: bold;
    font-size: 24px;
    color: #fafafa;
    line-height: 1;
    padding: 16px 0;
    margin: 0;
  }
`;

export const AppHeader: FC = () => (
  <StyledAppHeader>
    <h1 className="title">Prefecture Population Chart</h1>
  </StyledAppHeader>
);
