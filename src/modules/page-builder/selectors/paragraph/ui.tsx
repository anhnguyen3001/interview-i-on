import React from "react";
import { ParagraphInterface } from "./type";

export interface ParagraphProps extends ParagraphInterface {
  className?: string;
  children?: React.ReactElement;
}

export const Paragraph = React.forwardRef<HTMLDivElement, ParagraphProps>(
  ({ text, children, ...rest }, ref) => {
    if (children) {
      return (
        <div ref={ref} {...rest}>
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        {...rest}
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    );
  }
);
