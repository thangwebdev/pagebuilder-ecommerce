import { IconType } from "react-icons";
import { TbContainer } from "react-icons/tb";
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
              components: [],
            } as IColBaseProps,
          } as IBuilderComponentProps;

          this.defaultProps.components = [col1, col2];
        },
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
          src: "/images/draganddrop.png",
          width: "100",
          height: "100",
          unitWidth: "px",
          unitHeight: "px",
          alt: "image",
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
