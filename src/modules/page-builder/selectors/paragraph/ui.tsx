import React from "react";
import { ParagraphInterface } from "./type";

export interface ParagraphProps extends ParagraphInterface {
  className?: string;
  children?: React.ReactElement;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  text,
  children,
  ...rest
}) => {
  if (children) {
    return <div {...rest}>{children}</div>;
  }

  return (
    <div
      {...rest}
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
};
