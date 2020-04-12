import React, { FC, ReactNode } from "react";
import styled from "styled-components";

const StyledDefault = styled.div`
  height: 100vh;
  & > .header {
    margin-bottom: 16px;
  }
`;
export const Default: FC<{
  headerComponent: ReactNode;
  mainPainComponent: ReactNode;
}> = ({ headerComponent, mainPainComponent }) => {
  return (
    <StyledDefault>
      <div className="header">{headerComponent}</div>
      <div className="mainPain">{mainPainComponent}</div>
    </StyledDefault>
  );
};
