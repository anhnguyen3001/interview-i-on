import styled from "@emotion/styled";
import { ButtonInterface } from "./type";
import React from "react";

export interface ButtonProps extends ButtonInterface {
  isEditMode?: boolean;
}

export const Button = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ alertMessage, text, isEditMode }, ref) => {
    const onClick = () => {
      if (alertMessage) {
        window.alert(alertMessage);
      }
    };

    return (
      <Wrapper ref={ref}>
        <StyledButton {...(!isEditMode && { onClick })}>{text}</StyledButton>
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  margin-bottom: 8px;
`;

const StyledButton = styled.button`
  min-width: 32px;
  min-height: 48px;
`;
