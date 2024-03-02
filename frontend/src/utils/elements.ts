import { IconType } from "react-icons";
import { TbContainer, TbCarouselHorizontal } from "react-icons/tb";
import { BiCarousel } from "react-icons/bi";
import { IoImageOutline } from "react-icons/io5";
import { CiTextAlignJustify, CiGrid2V, CiGrid31 } from "react-icons/ci";
import { RxButton } from "react-icons/rx";
import { IContainerProps } from "~/components/ui/container";
import { IImageProps } from "~/components/ui/image";
import { ITypographyProps } from "~/components/ui/typography";
import { IButtonProps } from "~/components/ui/button";
import { IRowProps } from "~/components/ui/row";
import { generateRandomString } from "./helpers";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import { SPLIT_SYMBOL } from "./constants";
import { IColBaseProps } from "~/components/ui/colbase";
import { IDynamicRowProps } from "~/components/ui/dynamic-row";
import { ICarouselProps } from "~/components/ui/carousel";
import { ICarouselProductProps } from "~/components/ui/carousel-product";
import { FaRegSquare } from "react-icons/fa6";

export type ElementType = {
  id: string;
  name: string;
  displayName: string;
  icon: IconType;
  defaultProps?: any;
  generateComponents?: (parentPath: string) => void;
};

export type GroupElementType = {
  title: string;
  elements?: ElementType[];
};

export const elementGroups: GroupElementType[] = [
  {
    title: "Structure",
    elements: [
      {
        id: "container",
        name: "Container",
        icon: TbContainer,
        displayName: "Container",
        defaultProps: {
          sx: {},
          width: "100",
          unitWidth: "%",
          paddingLeft: "24",
          unitPaddingLeft: "px",
          paddingRight: "24",
          unitPaddingRight: "px",
          isContainer: true,
          components: [],
        } as IContainerProps,
      },
      {
        id: "row",
        name: "Hàng cố định",
        displayName: "Hàng cố định",
        icon: CiGrid2V,
        defaultProps: {
          sx: {},
          xsColumns: 2,
          direction: "row",
          width: "100",
          unitWidth: "%",
          components: [],
        } as IRowProps,
        generateComponents(parentPath: string) {
          const randomId1 = `el${generateRandomString(8)}`;
          const randomId2 = `el${generateRandomString(8)}`;

          const col1 = {
            path: `${parentPath}${SPLIT_SYMBOL}${randomId1}`,
            type: "colbase",
            uniqueId: randomId1,
            propData: {
              sx: {},
              direction: "column",
              isContainer: true,
              components: [],
            } as IColBaseProps,
          } as IBuilderComponentProps;
          const col2 = {
            path: `${parentPath}${SPLIT_SYMBOL}${randomId2}`,
            type: "colbase",
            uniqueId: randomId2,
            propData: {
              sx: {},
              direction: "column",
              isContainer: true,
              components: [],
            } as IColBaseProps,
          } as IBuilderComponentProps;

          this.defaultProps.components = [col1, col2];
        },
      },
      {
        id: "dynamicrow",
        name: "Hàng tùy chỉnh",
        displayName: "Hàng tùy chỉnh",
        icon: CiGrid31,
        defaultProps: {
          sx: {},
          direction: "row",
          width: "100",
          unitWidth: "%",
          components: [],
        } as IDynamicRowProps,
        generateComponents(parentPath: string) {
          const randomId1 = `el${generateRandomString(8)}`;
          const randomId2 = `el${generateRandomString(8)}`;

          const col1 = {
            path: `${parentPath}${SPLIT_SYMBOL}${randomId1}`,
            type: "dynamiccol",
            uniqueId: randomId1,
            propData: {
              sx: {},
              direction: "column",
              isContainer: true,
              width: "50",
              unitWidth: "%",
              components: [],
            } as IColBaseProps,
          } as IBuilderComponentProps;
          const col2 = {
            path: `${parentPath}${SPLIT_SYMBOL}${randomId2}`,
            type: "dynamiccol",
            uniqueId: randomId2,
            propData: {
              sx: {},
              direction: "column",
              isContainer: true,
              width: "50",
              unitWidth: "%",
              components: [],
            } as IColBaseProps,
          } as IBuilderComponentProps;

          this.defaultProps.components = [col1, col2];
        },
      },
      {
        id: "area",
        name: "Vùng chứa",
        displayName: "Vùng chứa",
        icon: FaRegSquare,
        defaultProps: {
          direction: "row",
          width: "100",
          unitWidth: "%",
          isContainer: true,
          components: [],
        } as IColBaseProps,
      },
    ],
  },
  {
    title: "Content",
    elements: [
      {
        id: "image",
        name: "Hình ảnh",
        displayName: "Hình ảnh",
        icon: IoImageOutline,
        defaultProps: {
          src: "/images/draganddrop.jpg",
          width: "100",
          unitWidth: "px",
          height: "100",
          unitHeight: "px",
          alt: "image",
          objectFit: "cover",
          isContainer: false,
          paddingTop: "0",
          paddingBottom: "0",
          paddingLeft: "0",
          paddingRight: "0",
          unitPaddingTop: "px",
          unitPaddingBottom: "px",
          unitPaddingLeft: "px",
          unitPaddingRight: "px",
        } as IImageProps,
      },
      {
        id: "typography",
        name: "Văn bản",
        displayName: "Văn bản",
        icon: CiTextAlignJustify,
        defaultProps: {
          children: "Nhập văn bản",
          sx: {
            fontSize: "14px",
          },
          isContainer: false,
        } as ITypographyProps,
      },
      {
        id: "button",
        name: "Nút bấm",
        displayName: "Nút bấm",
        icon: RxButton,
        defaultProps: {
          variant: "outlined",
          children: "Nút bấm",
          isContainer: false,
          sx: {},
        } as IButtonProps,
      },
      {
        id: "carousel",
        name: "Carousel",
        displayName: "Carousel",
        icon: BiCarousel,
        defaultProps: {
          width: "100",
          unitWidth: "%",
          isContainer: true,
          loop: true,
          wrapperProps: { sx: {} },
        } as ICarouselProps,
        generateComponents(parentPath: string) {
          const randomId1 = `el${generateRandomString(8)}`;
          const randomId2 = `el${generateRandomString(8)}`;

          const slide1 = {
            path: `${parentPath}${SPLIT_SYMBOL}${randomId1}`,
            type: "image",
            uniqueId: randomId1,
            propData: {
              src: "/images/draganddrop.jpg",
              alt: "image carousel",
              width: "100",
              unitWidth: "%",
              height: "250",
              unitHeight: "px",
              objectFit: "cover",
            } as IImageProps,
          } as IBuilderComponentProps;
          const slide2 = {
            path: `${parentPath}${SPLIT_SYMBOL}${randomId2}`,
            type: "image",
            uniqueId: randomId2,
            propData: {
              src: "/images/draganddrop.jpg",
              alt: "image carousel",
              width: "100",
              unitWidth: "%",
              height: "250",
              unitHeight: "px",
              objectFit: "cover",
            } as IImageProps,
          } as IBuilderComponentProps;

          this.defaultProps.components = [slide1, slide2];
        },
      },
      {
        id: "carouselproduct",
        name: "Carousel Sản phẩm",
        displayName: "Carousel Sản phẩm",
        icon: TbCarouselHorizontal,
        defaultProps: {
          width: "100",
          unitWidth: "%",
          title: "Carousel sản phẩm",
          imgHeader: "/images/carousel-product.svg",
          showHeader: true,
          isContainer: false,
        } as ICarouselProductProps,
      },
    ],
  },
];

export const elements = elementGroups.reduce(
  (acc: ElementType[], group: GroupElementType) => {
    if (group.elements) {
      return [...acc, ...group.elements];
    } else {
      return acc;
    }
  },
  []
);
