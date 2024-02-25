import { IInputProp } from "~/components/builder/sidebar/components/property-tab/prop-tab/InputProp";
import { ISelectPropProps } from "~/components/builder/sidebar/components/property-tab/prop-tab/SelectProp";
import { breakpoints } from "./constants";
import { ICheckboxPropProps } from "~/components/builder/sidebar/components/property-tab/prop-tab/CheckboxProp";

type inputType = "input" | "select" | "checkbox";

export type inputPropType = {
  type: inputType;
  col?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  props: {
    [key: string]: any;
  };
};

const breakpointValues = breakpoints.map(({ breakpoint, ...item }) => item);
breakpointValues.shift();

const elementProps: { [key: string]: inputPropType[] } = {
  button: [
    {
      type: "input",
      props: {
        propKey: "children",
        label: "Nội dụng",
        description: "Chữ hiển thị của nút bấm",
        placeholder: "VD: Click me",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        type: "number",
        propKey: "fontSize",
        label: "Font size (px)",
        description: "Cỡ chứ",
        placeholder: "VD: 14",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        propKey: "href",
        label: "Href",
        description: "Đường dẫn đến một trang trong website",
        placeholder: "VD: /khuyen-mai",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        propKey: "link",
        label: "Link",
        description: "Đường dẫn đến một trang ngoài website",
        placeholder: "VD: https://thangwebdev.click",
      } as IInputProp,
    },
    {
      type: "select",
      props: {
        propKey: "target",
        description: "Ứng xử khi bấm vào nút",
        label: "Target",
        selectOptions: [
          { label: "-", value: "" },
          { label: "Mở liên kết trên tab mới", value: "_blank" },
          { label: "Mở liên kết trên tab hiện tại", value: "_self" },
          { label: "Mở liên kết tới tab mở tab hiện tại", value: "_parent" },
          { label: "Nhảy tới tab hiện tại", value: "_top" },
        ],
        defaultValue: "",
      } as ISelectPropProps,
    },
    {
      type: "select",
      props: {
        propKey: "variant",
        description: "Loại nút bấm",
        label: "Variant",
        selectOptions: [
          { label: "Dạng chữ", value: "text" },
          { label: "Có viền", value: "outlined" },
          { label: "Có màu nền", value: "contained" },
        ],
        defaultValue: "outlined",
      } as ISelectPropProps,
    },
  ],
  typography: [
    {
      type: "input",
      props: {
        label: "Content",
        multiline: true,
        propKey: "children",
        description: "Nội dung của văn bản",
        placeholder: "VD: website ecommerce",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        label: "Line height",
        propKey: "lineHeight",
        type: "number",
        description: "Chiều cao của dòng",
        placeholder: "VD: 1.5, 1.8, 2.2,...",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        label: "Font size(px)",
        type: "number",
        propKey: "fontSize",
        description: "Cỡ chữ",
        placeholder: "VD: 14, 16, 18,...",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        label: "Font weight",
        type: "number",
        propKey: "fontWeight",
        description: "Độ đậm, nhạt của chữ",
        placeholder: "VD: 300, 400, 500...",
      } as IInputProp,
    },
    {
      type: "select",
      props: {
        propKey: "variant",
        label: "Variant",
        selectOptions: [
          { label: "Tiêu đề 1", value: "h1" },
          { label: "Tiêu đề 2", value: "h2" },
          { label: "Tiêu đề 3", value: "h3" },
          { label: "Tiêu đề 4", value: "h4" },
          { label: "Tiêu đề 5", value: "h5" },
          { label: "Tiêu đề 6", value: "h6" },
          { label: "Phụ đề 1", value: "subtitle1" },
          { label: "Phụ đề 2", value: "subtitle2" },
          { label: "Đoạn văn 1", value: "body1" },
          { label: "Đoạn văn 2", value: "body2" },
        ],
        defaultValue: "body1",
        description: "Kiểu vản bản",
      } as ISelectPropProps,
    },
    {
      type: "select",
      props: {
        propKey: "textAlign",
        label: "Text align",
        selectOptions: [
          { label: "Căn trái", value: "left" },
          { label: "Căn phải", value: "right" },
          { label: "Căn giữa", value: "center" },
          { label: "Căn đều", value: "justify" },
        ],
        defaultValue: "left",
        description: "Căn chỉnh văn bản",
      } as ISelectPropProps,
    },
  ],
  image: [
    {
      type: "input",
      props: {
        label: "Source",
        description: "Đường dẫn hình ảnh",
        propKey: "src",
        placeholder: "https://server.vn/image.png",
        type: "text",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        label: "Alt",
        description: "Nội dung hiển thị khi ảnh bị lỗi",
        propKey: "alt",
        placeholder: "VD: hình ảnh sản phẩm",
        type: "text",
      } as IInputProp,
    },
    {
      type: "select",
      props: {
        label: "Fit",
        description: "Phù hợp với vùng chứa",
        propKey: "objectFit",
        selectOptions: [
          { label: "Mặc định", value: "unset" },
          { label: "Hiển thị đầy đủ hình ảnh", value: "contain" },
          { label: "Cắt bớt để vừa với vùng chứa", value: "cover" },
          { label: "Kéo dãn để vừa với vùng chứa", value: "fill" },
          { label: "Không thay đổi kích thước", value: "none" },
        ],
        defaultValue: "unset",
      } as ISelectPropProps,
    },
    {
      type: "input",
      props: {
        propKey: "href",
        label: "Href",
        description: "Đường dẫn đến một trang trong website",
        placeholder: "VD: /khuyen-mai",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        propKey: "link",
        label: "Link",
        description: "Đường dẫn đến một trang ngoài website",
        placeholder: "VD: https://thangwebdev.click",
      } as IInputProp,
    },
    {
      type: "select",
      props: {
        propKey: "target",
        description: "Ứng xử khi bấm vào hình ảnh",
        label: "Target",
        selectOptions: [
          { label: "-", value: "" },
          { label: "Mở liên kết trên tab mới", value: "_blank" },
          { label: "Mở liên kết trên tab hiện tại", value: "_self" },
          { label: "Mở liên kết tới tab mở tab hiện tại", value: "_parent" },
          { label: "Nhảy tới tab hiện tại", value: "_top" },
        ],
        defaultValue: "",
      } as ISelectPropProps,
    },
  ],
  row: [
    {
      type: "input",
      props: {
        label: "Row gap (px)",
        description: "Khoảng cách giữa các hàng",
        propKey: "rowGap",
        placeholder: "VD: 10, 20",
        type: "number",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        label: "Column gap (px)",
        description: "Khoảng cách giữa các cột",
        propKey: "columnGap",
        placeholder: "VD: 10, 20",
        type: "number",
      } as IInputProp,
    },
    {
      type: "select",
      props: {
        label: "Justify content",
        description: "Căn chỉnh nội dung theo hàng ngang",
        propKey: "justifyContent",
        selectOptions: [
          { label: "Mặc định", value: "" },
          { label: "Nằm ở đầu", value: "flex-start" },
          { label: "Nằm ở cuối", value: "flex-end" },
          { label: "Nằm chính giữa", value: "center" },
          { label: "Căn đều khoảng trống ở giữa", value: "space-between" },
          { label: "Căn đều khoảng trống xung quanh", value: "space-around" },
          { label: "Căn đều bao gồm phần đầu và cuối", value: "space-evenly" },
        ],
        defaultValue: "",
      } as ISelectPropProps,
    },
    {
      type: "select",
      props: {
        propKey: "alignItems",
        label: "Align items",
        description: "Căn chỉnh theo hàng dọc",
        selectOptions: [
          { label: "Mặc định", value: "" },
          { label: "Căn ở đầu", value: "flex-start" },
          { label: "Căn ở cuối", value: "flex-end" },
          { label: "Căn chính giữa", value: "center" },
        ],
        defaultValue: "",
      } as ISelectPropProps,
    },
    {
      type: "input",
      props: {
        propKey: "xsColumns",
        label: "XS Columns",
        description: `Số lượng cột ở màn hình ${
          breakpoints.find((item) => item.value === "xs")?.label
        } trở lên`,
        type: "number",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        propKey: "smColumns",
        label: "SM Columns",
        description: `Số lượng cột ở màn hình ${
          breakpoints.find((item) => item.value === "sm")?.label
        } trở lên`,
        type: "number",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        propKey: "mdColumns",
        label: "MD Columns",
        description: `Số lượng cột ở màn hình ${
          breakpoints.find((item) => item.value === "md")?.label
        } trở lên`,
        type: "number",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        propKey: "lgColumns",
        label: "LG Columns",
        description: `Số lượng cột ở màn hình ${
          breakpoints.find((item) => item.value === "lg")?.label
        } trở lên`,
        type: "number",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        propKey: "xlColumns",
        label: "XL Columns",
        description: `Số lượng cột ở màn hình ${
          breakpoints.find((item) => item.value === "xl")?.label
        } trở lên`,
        type: "number",
      } as IInputProp,
    },
  ],
  dynamicrow: [
    {
      type: "input",
      props: {
        label: "Row gap (px)",
        description: "Khoảng cách giữa các hàng",
        propKey: "rowGap",
        placeholder: "VD: 10, 20",
        type: "number",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        label: "Column gap (px)",
        description: "Khoảng cách giữa các cột",
        propKey: "columnGap",
        placeholder: "VD: 10, 20",
        type: "number",
      } as IInputProp,
    },
    {
      type: "select",
      props: {
        label: "Justify content",
        description: "Căn chỉnh nội dung theo hàng ngang",
        propKey: "justifyContent",
        selectOptions: [
          { label: "Mặc định", value: "" },
          { label: "Nằm ở đầu", value: "flex-start" },
          { label: "Nằm ở cuối", value: "flex-end" },
          { label: "Nằm chính giữa", value: "center" },
          { label: "Căn đều khoảng trống ở giữa", value: "space-between" },
          { label: "Căn đều khoảng trống xung quanh", value: "space-around" },
          { label: "Căn đều bao gồm phần đầu và cuối", value: "space-evenly" },
        ],
        defaultValue: "",
      } as ISelectPropProps,
    },
    {
      type: "select",
      props: {
        propKey: "alignItems",
        label: "Align items",
        description: "Căn chỉnh theo hàng dọc",
        selectOptions: [
          { label: "Mặc định", value: "" },
          { label: "Căn ở đầu", value: "flex-start" },
          { label: "Căn ở cuối", value: "flex-end" },
          { label: "Căn chính giữa", value: "center" },
        ],
        defaultValue: "",
      } as ISelectPropProps,
    },
  ],
  colbase: [
    {
      type: "select",
      props: {
        label: "Direction",
        description: "Hướng hiển thị phần tử con",
        propKey: "direction",
        selectOptions: [
          { label: "Dọc", value: "column" },
          { label: "Ngang", value: "row" },
        ],
        defaultValue: "column",
      } as ISelectPropProps,
    },
    {
      type: "select",
      props: {
        label: "Justify content",
        description: "Căn chỉnh nội dung theo direction",
        propKey: "justifyContent",
        selectOptions: [
          { label: "Mặc định", value: "" },
          { label: "Nằm ở đầu", value: "flex-start" },
          { label: "Nằm ở cuối", value: "flex-end" },
          { label: "Nằm chính giữa", value: "center" },
          { label: "Căn đều khoảng trống ở giữa", value: "space-between" },
          { label: "Căn đều khoảng trống xung quanh", value: "space-around" },
          { label: "Căn đều bao gồm phần đầu và cuối", value: "space-evenly" },
        ],
        defaultValue: "",
      } as ISelectPropProps,
    },
    {
      type: "select",
      props: {
        label: "Align items",
        description: "Căn chỉnh hàng theo hướng vuông góc với direction",
        propKey: "alignItems",
        selectOptions: [
          { label: "Mặc định", value: "" },
          { label: "Căn ở đầu", value: "flex-start" },
          { label: "Căn ở cuối", value: "flex-end" },
          { label: "Căn chính giữa", value: "center" },
        ],
        defaultValue: "",
      } as ISelectPropProps,
    },
    {
      type: "input",
      props: {
        type: "number",
        label: "Spacing (px)",
        description: "Khoảng cách giữa các phần tử",
        propKey: "spacing",
        placeholder: "VD: 10",
      } as IInputProp,
    },
  ],
  dynamiccol: [
    {
      type: "select",
      props: {
        label: "Direction",
        description: "Hướng hiển thị phần tử con",
        propKey: "direction",
        selectOptions: [
          { label: "Dọc", value: "column" },
          { label: "Ngang", value: "row" },
        ],
        defaultValue: "column",
      } as ISelectPropProps,
    },
    {
      type: "select",
      props: {
        label: "Justify content",
        description: "Căn chỉnh nội dung theo direction",
        propKey: "justifyContent",
        selectOptions: [
          { label: "Mặc định", value: "" },
          { label: "Nằm ở đầu", value: "flex-start" },
          { label: "Nằm ở cuối", value: "flex-end" },
          { label: "Nằm chính giữa", value: "center" },
          { label: "Căn đều khoảng trống ở giữa", value: "space-between" },
          { label: "Căn đều khoảng trống xung quanh", value: "space-around" },
          { label: "Căn đều bao gồm phần đầu và cuối", value: "space-evenly" },
        ],
        defaultValue: "",
      } as ISelectPropProps,
    },
    {
      type: "select",
      props: {
        label: "Align items",
        description: "Căn chỉnh hàng theo hướng vuông góc với direction",
        propKey: "alignItems",
        selectOptions: [
          { label: "Mặc định", value: "" },
          { label: "Căn ở đầu", value: "flex-start" },
          { label: "Căn ở cuối", value: "flex-end" },
          { label: "Căn chính giữa", value: "center" },
        ],
        defaultValue: "",
      } as ISelectPropProps,
    },
    {
      type: "input",
      props: {
        type: "number",
        label: "Spacing (px)",
        description: "Khoảng cách giữa các phần tử",
        propKey: "spacing",
        placeholder: "VD: 10",
      } as IInputProp,
    },
  ],
  container: [
    {
      type: "select",
      props: {
        propKey: "maxWidth",
        label: "Max width",
        description: "Chiều rộng tối đa",
        selectOptions: breakpointValues,
        defaultValue: "xl",
      } as ISelectPropProps,
    },
  ],
  carousel: [
    {
      type: "input",
      props: {
        label: "Item height(px)",
        type: "number",
        propKey: "itemHeight",
        description: "Chiều cao mỗi phần tử",
        placeholder: "VD: 200, 250, 300,...",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        label: "Items",
        type: "number",
        propKey: "slidesPerView",
        description: "Số lượng phần tử hiển thị",
        placeholder: "VD: 1, 2, 4,...",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        label: "Space",
        type: "number",
        propKey: "spaceBetween",
        description: "Khoảng cách giữ các phần tử",
        placeholder: "VD: 10, 20, 50,...",
      } as IInputProp,
    },
    {
      type: "checkbox",
      props: {
        label: "Loop",
        propKey: "loop",
        description: "Lặp lại",
      } as ICheckboxPropProps,
    },
    {
      type: "checkbox",
      props: {
        label: "Auto play",
        propKey: "autoplay",
        description: "Tự động chuyển slide",
      } as ICheckboxPropProps,
    },
  ],
  carouselproduct: [
    {
      type: "input",
      props: {
        label: "Title",
        propKey: "title",
        description: "Tiêu đề của carousel",
        placeholder: "VD: Sản phẩm giảm giá",
      } as IInputProp,
    },
    {
      type: "input",
      props: {
        label: "Image header",
        propKey: "imgHeader",
        description: "Ảnh của carousel (40px x 40px)",
        placeholder: "VD: https://server.vn/carousel.png",
      } as IInputProp,
    },
    {
      type: "checkbox",
      props: {
        label: "Show header",
        propKey: "showHeader",
        description: "Hiển thị header",
      } as ICheckboxPropProps,
    },
  ],
};

export { elementProps };
