import styled from "@emotion/styled";
import { DraggableElement, IDraggableElement } from "../DraggableElement";

interface ToolBoxProps {
  elements: IDraggableElement[];
}

export const ToolBox: React.FC<ToolBoxProps> = ({ elements }) => {
  return (
    <Wrapper>
      {elements.map((element, index) => (
        <DraggableElement key={index} {...element} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  padding: 16px;
  border-right: 1px solid #ddd;
`;
