import { Form, Input } from "antd";
import { useProp } from "../../hooks";

export type InputConfigProps = {
  label: string;
  propKey?: string;
};

export const InputConfig = ({ propKey, label }: InputConfigProps) => {
  const [prop, setProp] = useProp(propKey);

  return (
    <Form.Item label={label}>
      <Input
        value={prop || ""}
        onChange={(e) => {
          setProp(e.target.value || undefined);
        }}
        style={{ width: "100%" }}
      />
    </Form.Item>
  );
};
