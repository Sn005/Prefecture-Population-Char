import React, { FC, ReactNode } from "react";
import styled from "styled-components";

const StyledLayout = styled.div`
  & > .header {
    margin-bottom: 40px;
  }
  & > .main {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }
`;
export const Layout: FC<{
  headerComponent: ReactNode;
  mainComponent: ReactNode;
}> = ({ headerComponent, mainComponent }) => {
  return (
    <StyledLayout>
      <div className="header">{headerComponent}</div>
      <div className="main">{mainComponent}</div>
    </StyledLayout>
  );
};
