import styled from "@emotion/styled";
import { RootInterface } from "./type";
import React from "react";

export interface RootProps extends RootInterface {
  children?: React.ReactNode;
  className?: string;
}

const Wrapper = styled.div`
  height: 100vh;
  padding: 16px;
`;

export const Root = React.forwardRef<HTMLDivElement, RootProps>(
  ({ children, className }, ref) => {
    return (
      <Wrapper ref={ref} className={className}>
        {children}
      </Wrapper>
    );
  }
);
