import styled from "@emotion/styled";
import { RootInterface } from "./type";
import React from "react";

export interface RootProps extends RootInterface {
  children?: React.ReactNode;
}

export const Root: React.FC<RootProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  height: 100vh;
  padding: 16px;
`;
