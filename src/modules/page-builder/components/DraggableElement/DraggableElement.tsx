import { Card, Typography } from "antd";
import { useEditor } from "modules/builder/hooks";
import { UserElement } from "modules/builder/types";

const { Paragraph } = Typography;

export interface IDraggableElement {
  name: string;
  selector: UserElement;
}

export const DraggableElement: React.FC<IDraggableElement> = ({
  name,
  selector,
}) => {
  const { createNode } = useEditor();

  return (
    <Card
      hoverable
      style={{
        textAlign: "center",
        cursor: "move",
      }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
      ref={(ref) => createNode(ref as HTMLElement, selector)}
    >
      <Paragraph
        ellipsis={{
          rows: 2,
        }}
        style={{
          marginBottom: 0,
          fontSize: 13,
          lineHeight: "18px",
          color: "#444",
        }}
      >
        {name}
      </Paragraph>
    </Card>
  );
};
