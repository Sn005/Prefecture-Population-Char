import React, { FC, ReactNode, useState, useEffect } from "react";
import styled from "styled-components";

const StyledDefault = styled.div`
  background: #f5f5f5;
  height: 100vh;
  & > .header {
    margin-bottom: 16px;
  }
`;
export const Default: FC<{
  headerComponent: ReactNode;
  mainPainComponent: ReactNode;
}> = ({ headerComponent, mainPainComponent }) => {
  const [MainPainComponent, setMainPainComponent] = useState<ReactNode | null>(
    null
  );
  return (
    <StyledDefault>
      <div className="header">{headerComponent}</div>
      <div className="mainPain">{mainPainComponent}</div>
    </StyledDefault>
  );
};
