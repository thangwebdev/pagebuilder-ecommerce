import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Image from "~/components/ui/image";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import Typography from "~/components/ui/typography";
import { FaAngleDown, FaRegUser } from "react-icons/fa";
import { IoEarth } from "react-icons/io5";
import IconButton from "@mui/material/IconButton";
import { LuHome } from "react-icons/lu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ISidebar {
  width: number;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

type MenuItemProp = {
  id: string;
  text: string;
  href?: string;
  icon?: any;
  subs?: MenuItemProp[];
};

const sidebars: MenuItemProp[] = [
  {
    id: "trang-chu",
    text: "Trang chủ",
    href: "/admin/home",
    icon: LuHome,
  },
  {
    id: "quan-ly-website",
    text: "Quản lý website",
    icon: IoEarth,
    subs: [
      {
        id: "thiet-lap-website",
        href: "/admin/website/setting",
        text: "Thiết lập website",
      },
      {
        id: "pages",
        href: "/admin/website/pages",
        text: "Quản lý các trang",
      },
      {
        id: "quan-ly-popup",
        href: "/admin/website/popup",
        text: "Quản lý popup",
      },
    ],
  },
  {
    id: "quan-ly-tai-khoan",
    text: "Quản lý tài khoản",
    icon: FaRegUser,
    subs: [
      {
        id: "tai-khoan-quan-tri",
        text: "Tài khoản quản trị",
        href: "/admin/account/admin",
      },
      {
        id: "tai-khoan-thanh-vien",
        text: "Tài khoản thành viên",
        href: "/admin/account/member",
      },
    ],
  },
];

export default function Sidebar({ width, isOpen, setIsOpen }: ISidebar) {
  const pathname = usePathname();
  const [itemCollapse, setItemCollapse] = useState<string | undefined>();

  const handleCollapseItem = (item: MenuItemProp) => {
    if (!isOpen) {
      setIsOpen?.(true);
    }
    if (itemCollapse === item.id) {
      setItemCollapse(undefined);
    } else {
      setItemCollapse(item.id);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setItemCollapse(undefined);
    }
  }, [isOpen]);

  const renderListItem = (item: MenuItemProp) => {
    let isActive = false;
    if (!!item.href) {
      isActive = pathname.indexOf(item.href) >= 0;
    } else if (item.subs) {
      const hrefs = item.subs.map((sub) => sub.href);
      isActive = hrefs.includes(pathname);
    }
    return (
      <>
        <ListItemButton
          onClick={() => handleCollapseItem(item)}
          sx={{
            padding: "5px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "10px",
            backgroundColor: isActive ? "primary.main" : "",
            color: isActive ? "white" : "",
            "&:hover": {
              backgroundColor: isActive ? "primary.main" : "",
              color: isActive ? "white" : "",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              width: "fit-content",
              color: isActive ? "white" : "",
            }}
          >
            <item.icon size={16} />
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            sx={{
              "& .MuiTypography-root": {
                fontSize: "14px",
              },
            }}
          />
          {!!item.subs && item.subs.length > 0 && (
            <IconButton
              sx={{
                transform:
                  itemCollapse === item.id ? "rotate(0)" : "rotate(-90deg)",
                color: isActive ? "white" : "",
              }}
            >
              <FaAngleDown size={14} />
            </IconButton>
          )}
        </ListItemButton>

        {!!item.subs && item.subs.length > 0 && (
          <Collapse in={itemCollapse === item.id}>
            <List
              sx={{
                width: "100%",
                height: "auto",
                padding: "5px 0px 5px 30px",
              }}
            >
              {item.subs.map((sub) => {
                const isActive = pathname.indexOf(sub?.href || "") >= 0;
                return (
                  <Link key={sub.id} href={sub?.href || ""}>
                    <ListItemButton
                      sx={{
                        padding: "5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        borderRadius: "10px",
                        backgroundColor: isActive ? "primary.main" : "",
                        color: isActive ? "white" : "",
                        "&:hover": {
                          backgroundColor: isActive ? "primary.main" : "",
                          color: isActive ? "white" : "",
                        },
                      }}
                    >
                      <ListItemText
                        primary={sub.text}
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: "14px",
                          },
                        }}
                      />
                    </ListItemButton>
                  </Link>
                );
              })}
            </List>
          </Collapse>
        )}
      </>
    );
  };

  const renderList = (items: MenuItemProp[]) => {
    return (
      <List
        sx={{
          width: "100%",
          height: "calc(100vh - 40px - 40px)",
          overflow: "auto",
          padding: "10px",
        }}
      >
        {items.map((item) => {
          return (
            <React.Fragment key={item.id}>
              {item.href ? (
                <Link href={item.href}>{renderListItem(item)}</Link>
              ) : (
                renderListItem(item)
              )}
            </React.Fragment>
          );
        })}
      </List>
    );
  };

  return (
    <Box
      sx={{
        width: width,
        height: "100vh",
        backgroundColor: "primary.100",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          height: "40px",
          padding: "0 10px",
        }}
      >
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width="1"
          height="1"
          style={{ width: "auto", height: "auto" }}
        />
      </Stack>
      {isOpen && (
        <Box
          sx={{
            padding: "10px",
            backgroundColor: "primary.main",
            height: "40px",
          }}
        >
          <Typography sx={{ fontSize: "14px", color: "white" }}>
            CHỨC NĂNG HỆ THỐNG
          </Typography>
        </Box>
      )}
      {renderList(sidebars)}
    </Box>
  );
}
