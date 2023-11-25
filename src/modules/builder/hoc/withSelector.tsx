import { InternalNodeProvider, useInternalNode } from "../contexts";
import { IUserElementConfig } from "../types";

export const withSelector = (
  Comp: React.ComponentType<any>,
  initDataComp: Partial<IUserElementConfig>
) => {
  const ComponentWithSelector = (
    props: any & {
      "data-id": string;
    }
  ) => {
    return (
      <InternalNodeProvider
        id={props["data-id"]}
        related={initDataComp.related}
      >
        <RenderNode Comp={Comp} {...props} />
      </InternalNodeProvider>
    );
  };

  ComponentWithSelector.craft = initDataComp;

  return ComponentWithSelector;
};

const RenderNode = ({ Comp, ...rest }: { Comp: React.ComponentType<any> }) => {
  const { connect } = useInternalNode();

  return (
    <div ref={(ref) => connect(ref)}>
      <Comp {...rest} />
    </div>
  );
};
