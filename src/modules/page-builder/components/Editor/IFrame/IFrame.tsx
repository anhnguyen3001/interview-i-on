import React from "react";
import Frame from "react-frame-component";
import { IFrameProvider } from "./IFrameProvider";

interface IFrameProps {
  children: React.ReactNode;
}

const IFrame = ({ children, ...props }: IFrameProps) => {
  const links = [
    {
      type: "text/css",
      rel: "stylesheet",
      href: "/css/builder.css",
    },
  ];

  return (
    <Frame
      initialContent={`<!DOCTYPE html><html><head>
      </head><body><div id="mountHere"></div><div id="modal-root"></div></body></html>`}
      mountTarget="#mountHere"
      head={links.map((link, index) => (
        <link {...link} key={index} />
      ))}
      style={{
        overflow: "hidden",
        width: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        margin: "auto",
        minHeight: "100%",
        border: "none",
      }}
      {...props}
    >
      <IFrameProvider>{children}</IFrameProvider>
    </Frame>
  );
};

export const MemoizedIFrame = React.memo(IFrame);
