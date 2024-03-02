"use client";
import { cloneDeep } from "lodash";
import React, { createContext, useContext, useState } from "react";
import ModalElements from "~/components/builder/modal-elements";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import { SPLIT_SYMBOL } from "~/utils/constants";
import { generateRandomString } from "~/utils/helpers";

type KeyType =
  | "activeId"
  | "activeData"
  | "activeType"
  | "builderActivePath"
  | "actions"
  | "openModal"
  | "load"
  | "activePath"
  | "builderActiveEl"
  | "storePageData"
  | "indexPageData"
  | "viewMode";

type pageDataType = {
  name: string;
  href: string;
  elements: IBuilderComponentProps[];
};
export type ViewModeType = "builder" | "pc" | "tablet" | "mobile";

type BuilderContextValue = {
  builderActivePath: string | undefined;
  pathWillAdd: string;
  actions: {
    up: boolean;
    duplicate: boolean;
    add: boolean;
    delete: boolean;
  };
  openModal: boolean;
  viewMode: ViewModeType;
  load: number;
  storePageData: pageDataType[];
  indexPageData: number;
};
type ValuePassType = {
  // values
  value: BuilderContextValue;

  // funcs
  handleUpdateValue: (key: KeyType, newValue: any) => void;
  handleUpdateValues: (objValue: Partial<BuilderContextValue>) => void;
  handleUpdateElement: (obj: {
    path: string;
    objectUpdate: { [key: string]: any };
  }) => void;
  findElementByPath: (
    elements: IBuilderComponentProps[],
    path: string
  ) => IBuilderComponentProps;
  findParentByPath: (
    elements: IBuilderComponentProps[],
    path: string
  ) => IBuilderComponentProps | "builder" | undefined;
  handleDeleteElement: (path: string) => void;
  handleDuplicateElement: (path: string) => void;
  handleUndo: () => void;
  handleRedo: () => void;
  updatePath: (
    components: IBuilderComponentProps[],
    parentPath: string
  ) => void;
};

const BuilderContext = createContext({});

function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<BuilderContextValue>({
    // phần tử đang được chọn trong builder
    builderActivePath: undefined,
    // phần tử sẽ được thêm element
    pathWillAdd: "",
    // Quyết định hiển thị hành động của phần tử đang được chọn
    actions: {
      up: true,
      duplicate: true,
      add: true,
      delete: true,
    },
    // open modal element
    openModal: false,
    // cờ để làm mới trang
    load: 0,
    // chế độ hiển thị
    viewMode: "builder",
    // lưu lại con trỏ để undo hoặc redo
    storePageData: [],
    indexPageData: 0,
  });

  const handleUpdateValue = (key: KeyType, newValue: any) => {
    setValue({ ...value, [key]: newValue });
  };
  const handleUpdateValues = (objValue: Partial<BuilderContextValue>) => {
    setValue({ ...value, ...objValue });
  };
  const handleUpdateElement = ({
    path,
    objectUpdate,
  }: {
    path: string;
    objectUpdate: { [key: string]: any };
  }) => {
    const { storePageData, indexPageData } = value;
    const pageData = storePageData[indexPageData];
    const pageDataClone = cloneDeep(pageData);
    const currentElement = findElementByPath(pageDataClone.elements, path);

    for (let key in objectUpdate) {
      currentElement.propData[key] = objectUpdate[key];
    }

    // currentElement.propData = { ...currentElement.propData, ...value };

    const newStorePageData = [...storePageData, pageDataClone];
    handleUpdateValues({
      storePageData: newStorePageData,
      indexPageData: newStorePageData.length - 1,
    });
  };

  // find element by path
  const findElementByPath = (
    elements: IBuilderComponentProps[],
    path: string
  ): IBuilderComponentProps => {
    const splitedPath = path.split(SPLIT_SYMBOL);
    const uniqueIdToFind = splitedPath.shift();
    const element = elements.find(
      (item) => item.uniqueId === uniqueIdToFind
    ) as IBuilderComponentProps;
    if (splitedPath.length > 0) {
      return findElementByPath(
        element?.propData.components as IBuilderComponentProps[],
        splitedPath.join(SPLIT_SYMBOL)
      );
    } else {
      return element;
    }
  };

  // find parent by path
  const findParentByPath = (
    elements: IBuilderComponentProps[],
    path: string
  ): IBuilderComponentProps | "builder" | undefined => {
    const splitedPath = path.split(SPLIT_SYMBOL);
    const uniqueIdToFind = splitedPath.shift();

    const element = elements.find(
      (item) => item.uniqueId === uniqueIdToFind
    ) as IBuilderComponentProps;
    if (!element) {
      return undefined;
    }
    switch (splitedPath.length) {
      case 0:
        return "builder";
      case 1:
        return element;
      default:
        return findParentByPath(
          element.propData.components as IBuilderComponentProps[],
          splitedPath.join(SPLIT_SYMBOL)
        );
    }
  };

  // delete element by path
  const handleDeleteElement = (path: string) => {
    const pageData = value.storePageData[value.indexPageData];
    if (!pageData?.elements) return;

    const pageDataClone = cloneDeep(pageData);
    const parent = findParentByPath(pageDataClone.elements, path);
    if (!parent) return;
    if (parent === "builder") {
      const index = pageDataClone.elements.findIndex(
        (item) => item.path === path
      );
      if (index >= 0) {
        pageDataClone.elements.splice(index, 1);
      }
    } else {
      const index = (parent?.propData.components || []).findIndex(
        (item: IBuilderComponentProps) => item.path === path
      );
      if (index >= 0) {
        (parent.propData.components || []).splice(index, 1);
      }
    }
    const newStorePageData = [...value.storePageData, pageDataClone];
    handleUpdateValues({
      builderActivePath: undefined,
      storePageData: newStorePageData,
      indexPageData: newStorePageData.length - 1,
    });
  };

  // update path
  const updatePath = (
    components: IBuilderComponentProps[],
    parentPath: string
  ) => {
    for (let i = 0; i < components.length; i++) {
      const item = components[i];
      const randomId = `el${generateRandomString(8)}`;

      item.uniqueId = randomId;
      item.path = `${parentPath}${SPLIT_SYMBOL}${item.uniqueId}`;
      if (item.propData.components && item.propData.components.length > 0) {
        updatePath(item.propData.components, item.path);
      }
    }
  };

  // handle duplicate element
  const handleDuplicateElement = (path: string) => {
    const pageData = value.storePageData[value.indexPageData];
    const pageDataClone = cloneDeep(pageData);

    const parentOfElement = findParentByPath(pageDataClone.elements, path);
    if (!parentOfElement) return;
    const randomId = `el${generateRandomString(8)}`;
    if (parentOfElement === "builder") {
      const index = pageDataClone.elements.findIndex(
        (item) => item.path === path
      );
      // copy lại phần tử gốc
      const originElement = cloneDeep(pageDataClone.elements[index]);
      if (!originElement) return;
      // nêú có phần tử con thì sửa lại path cho tất cả phần tử con
      if (
        originElement.propData?.components &&
        originElement.propData.components.length > 0
      ) {
        updatePath(originElement.propData.components, randomId);
      }
      // tạo phần tử mới từ phần tử gốc
      const newElement: IBuilderComponentProps = {
        type: originElement.type,
        path: randomId,
        uniqueId: randomId,
        propData: originElement.propData,
      };

      // cập nhật lại dữ liệu
      pageDataClone.elements.splice(index + 1, 0, newElement);
    } else {
      const index = parentOfElement?.propData.components?.findIndex(
        (item) => item.path === path
      );
      if (!index && index !== 0) return;

      // copy lại phần tử gốc
      const originElement = cloneDeep(
        parentOfElement?.propData.components?.[index]
      );
      if (!originElement) return;

      // nếu có phần tử con thì thay đổi path tất cả chúng
      if (
        originElement.propData.components &&
        originElement.propData.components.length > 0
      ) {
        updatePath(
          originElement.propData.components,
          `${parentOfElement.path}_${randomId}`
        );
      }
      // tạo phần tử mới từ phần tử gốc
      const newElement: IBuilderComponentProps = {
        type: originElement.type,
        uniqueId: randomId,
        path: `${parentOfElement.path}_${randomId}`,
        propData: originElement.propData,
      };
      parentOfElement.propData.components?.splice(index + 1, 0, newElement);
    }
    const newStorePageData = [...value.storePageData, pageDataClone];
    handleUpdateValues({
      storePageData: newStorePageData,
      indexPageData: newStorePageData.length - 1,
    });
  };

  // handle undo
  const handleUndo = () => {
    if (value.indexPageData === 0) return;
    handleUpdateValues({
      indexPageData: value.indexPageData - 1,
      builderActivePath: "",
    });
  };

  // handle redo
  const handleRedo = () => {
    if (!value.storePageData[value.indexPageData].elements) return;
    let isEnd = true;
    const storeSize = value.storePageData.length;

    if (storeSize > 0) {
      isEnd = storeSize - 1 === value.indexPageData;
    }

    if (isEnd) return;

    handleUpdateValues({
      indexPageData: value.indexPageData + 1,
      builderActivePath: "",
    });
  };

  const handleCloseModal = () => {
    handleUpdateValue("openModal", false);
  };

  const valueToPass: ValuePassType = {
    value,
    handleUpdateValue,
    handleUpdateValues,
    handleUpdateElement,
    findElementByPath,
    findParentByPath,
    handleDeleteElement,
    handleDuplicateElement,
    handleRedo,
    handleUndo,
    updatePath,
  };

  return (
    <BuilderContext.Provider value={valueToPass}>
      <ModalElements open={value.openModal} onClose={handleCloseModal} />
      {children}
    </BuilderContext.Provider>
  );
}

export const useBuilderContext = (): ValuePassType => {
  const value = useContext(BuilderContext);
  if (!value)
    throw new Error("Builder context must be used inside builder provider");
  return value as ValuePassType;
};

export default BuilderProvider;
