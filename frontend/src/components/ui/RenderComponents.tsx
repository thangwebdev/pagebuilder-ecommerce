import React from "react";
import BuilderComponent, { IBuilderComponentProps } from "./builder-component";

interface IRenderComponents {
  components?: IBuilderComponentProps[];
  isBuilding?: boolean;
}

function RenderComponents({ components, isBuilding }: IRenderComponents) {
  return (
    <>
      {!!components &&
        Array.isArray(components) &&
        components.map((comp) => {
          return (
            <BuilderComponent
              key={comp.uniqueId}
              type={comp.type}
              path={comp.path}
              isBuilding={isBuilding}
              uniqueId={comp.uniqueId}
              propData={comp.propData}
            />
          );
        })}
    </>
  );
}

export default RenderComponents;
