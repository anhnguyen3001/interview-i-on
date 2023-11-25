import styled from "@emotion/styled";
import { selectRelatedMapping, selectSelectedNode } from "modules/builder";
import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "antd";

const { Title } = Typography;

export const SettingSidebar: React.FC = () => {
  const selectedId = useSelector(selectSelectedNode);
  const related = useSelector(selectRelatedMapping);

  const customAttributes = related[selectedId]?.customAttributes;

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
