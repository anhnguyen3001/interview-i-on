import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useFrame } from "react-frame-component";
import { useMemo } from "react";

export const IFrameProvider = ({ children }: { children: React.ReactNode }) => {
  const { document: frameDocument } = useFrame();

  const cache = useMemo(() => {
    return createCache({
      key: "builder-iframe",
      container: frameDocument?.head,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
