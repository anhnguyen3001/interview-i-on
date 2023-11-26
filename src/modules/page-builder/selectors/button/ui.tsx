import styled from "@emotion/styled";
import { ButtonInterface } from "./type";
import React from "react";

export interface ButtonProps extends ButtonInterface {
  isEditMode?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  alertMessage,
  text,
  isEditMode,
}) => {
  const onClick = () => {
    if (alertMessage) {
      window.alert(alertMessage);
    }
  };

  return (
    <Wrapper>
      <StyledButton {...(!isEditMode && { onClick })}>{text}</StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 8px;
`;

const StyledButton = styled.button`
  min-width: 32px;
  min-height: 48px;
`;
