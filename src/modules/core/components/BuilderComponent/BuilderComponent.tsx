import { PBContentInterface } from "modules/core";

export interface BuilderComponentProps {
  content?: PBContentInterface;
  rootId?: string;
  componentDict: Record<string, React.ComponentType<any>>;
}

export const BuilderComponent = (props: BuilderComponentProps) => {
  const { content, rootId = "ROOT", componentDict } = props;

  const renderComponent = (id: string, apiResponse: PBContentInterface) => {
    const compData = apiResponse[id];
    const { tag, props } = compData;
    const Comp = componentDict[tag];

    // Handle missing component
    if (!Comp) {
      console.warn("Cannot found component: " + tag.toString());
      return null;
    }

    const componentProps = {
      key: id,
      "data-id": id,
      ...props,
    };

    if (compData.children?.length) {
      return (
        <Comp {...componentProps}>
          {compData.children.map((childId) =>
            renderComponent(childId, apiResponse)
          )}
        </Comp>
      );
    }
    return <Comp {...componentProps} />;
  };

  if (!content?.[rootId]) return null;
  return <>{renderComponent(rootId, content)}</>;
};
