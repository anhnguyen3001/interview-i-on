import { InputConfig } from "modules/builder";

export const Setting: React.FC = () => {
  return (
    <div>
      <InputConfig label="Nội dung" propKey="text" />
      <InputConfig label="Thông báo" propKey="alertMessage" />
    </div>
  );
};
