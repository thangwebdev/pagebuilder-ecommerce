import React from "react";
import Container from "../container";
import ContainerBuilder from "../container/builder";
import Typography from "../typography";
import TypographyBuilder from "../typography/builder";
import Button from "../button";
import ButtonBuilder from "../button/builder";
import Image from "../image";
import ImageBuilder from "../image/builder";
import Row from "../row";
import RowBuilder from "../row/builder";
import ColBase from "../colbase";
import ColBaseBuilder from "../colbase/builder";
import dynamicRow from "../dynamic-row";
import DynamicRowBuilder from "../dynamic-row/builder";
import Carousel from "../carousel";
import CarouselBuilder from "../carousel/builder";
import CarouselProduct from "../carousel-product";
import CarouselProductBuilder from "../carousel-product/builder";

export interface IBuilderComponentProps {
  type: string;
  propData: {
    orderIds?: string[];
    components?: IBuilderComponentProps[];
    [key: string]: any;
  };
  uniqueId: string | number;
  path: string;
  isBuilding?: boolean;
}

const components: { [key: string]: React.ElementType } = {
  container: Container,
  typography: Typography,
  button: Button,
  image: Image,
  row: Row,
  dynamicrow: dynamicRow,
  colbase: ColBase,
  area: ColBase,
  dynamiccol: ColBase,
  carousel: Carousel,
  carouselproduct: CarouselProduct,
};

const buildingComponents: { [key: string]: React.ElementType } = {
  container: ContainerBuilder,
  typography: TypographyBuilder,
  button: ButtonBuilder,
  image: ImageBuilder,
  row: RowBuilder,
  dynamicrow: DynamicRowBuilder,
  colbase: ColBaseBuilder,
  area: ColBaseBuilder,
  dynamiccol: ColBaseBuilder,
  carousel: CarouselBuilder,
  carouselproduct: CarouselProductBuilder,
};

function BuilderComponent({
  type,
  path,
  propData,
  isBuilding,
}: IBuilderComponentProps) {
  const Comp = !!isBuilding ? buildingComponents[type] : components[type];
  if (typeof Comp !== "undefined") {
    if (isBuilding) {
      return React.createElement(Comp, {
        path,
        ...propData,
      });
    } else {
      const { isContainer, ...props } = propData;
      return React.createElement(Comp, {
        path,
        ...props,
      });
    }
  }
  return <div>Component {type} is invalid</div>;
}

export default BuilderComponent;
