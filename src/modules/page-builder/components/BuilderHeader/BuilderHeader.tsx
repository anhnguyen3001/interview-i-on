import styled from "@emotion/styled";
import { Button, ButtonProps } from "antd";
import { useEditor } from "modules/builder";
import { LS_CONTENT_KEY } from "modules/core";
import { CONSUMER } from "router/path";

export const BuilderHeader = () => {
  const { content } = useEditor();

  const onSave = () => {
    localStorage.setItem(LS_CONTENT_KEY, JSON.stringify(content));
  };

  const onPreview = () => {
    onSave();
    window.open(CONSUMER, "_blank");
  };

  const actionButtons: ButtonProps[] = [
    {
      children: "Preview",
      onClick: onPreview,
    },
    {
      type: "primary",
      onClick: onSave,
      children: "Save",
    },
  ];

  return (
    <Wrapper>
      {actionButtons.map((btn, index) => (
        <Button key={index} {...btn} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  padding: 0 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #ddd;
`;
