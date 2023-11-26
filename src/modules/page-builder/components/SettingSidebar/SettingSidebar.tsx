import styled from "@emotion/styled";
import { Typography } from "antd";
import { useEditor } from "modules/builder";
import React from "react";

const { Title } = Typography;

export const SettingSidebar: React.FC = () => {
  const { selectedNode, relatedMapping } = useEditor();

  const customAttributes = relatedMapping?.[selectedNode]?.customAttributes;

  return (
    <Wrapper>
      <Title style={{ fontSize: 16 }}>Cài đặt</Title>
      {customAttributes && React.createElement(customAttributes)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 240px;
  padding: 0 16px 16px;
  border-left: 1px solid #ddd;
`;
