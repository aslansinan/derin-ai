"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.scss";
import {
  AppstoreOutlined,
  BookOutlined,
  MenuUnfoldOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import logo from "../../../images/logo.png";
import Image from "next/image";
import useIsMobile from "@/helpers/useIsMobile";
import { Button, Drawer } from "antd";
import { useState } from "react";
const Header = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const getNavLinkClass = (path: string) => {
    if (path === "/") {
      return pathname === "/" ? "nav-link active" : "nav-link";
    }
    return pathname.startsWith(path) ? "nav-link active" : "nav-link";
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      {isMobile ? (
        <div className="site-header-mobile">
          <Button
            icon={<MenuUnfoldOutlined />}
            className="menu-button"
            onClick={showDrawer}
          />
          <Drawer
            className="mobile-drawer"
            width={300}
            placement={"left"}
            onClose={onClose}
            open={open}
          >
            <div className="nav-bar-mobile">
              <Link href="/" className={getNavLinkClass("/")}>
                <AppstoreOutlined /> Ana Sayfa
              </Link>
              <Link href="/ai-center" className={getNavLinkClass("/ai-center")}>
                <BookOutlined />
                Dersler
              </Link>
              <Link href="/next-ai" className={getNavLinkClass("/next-ai")}>
                <RobotOutlined /> Yapay Zeka Asistanı Merkezi
              </Link>
            </div>
            <Link href="/" className="logo">
              <Image width={100} height={100} src={logo} alt="Logo" />
            </Link>
          </Drawer>
          <Link href="/login" className="logo">
            Giriş yap
          </Link>
        </div>
      ) : (
        <header className="site-header">
          <nav>
            <Link href="/" className="logo">
              <Image width={50} height={50} src={logo} alt="Logo" />
            </Link>
          </nav>
          <nav className="nav-bar">
            <Link href="/" className={getNavLinkClass("/")}>
              <AppstoreOutlined /> Ana Sayfa
            </Link>
            <Link href="/ai-center" className={getNavLinkClass("/ai-center")}>
              <BookOutlined />
              Dersler
            </Link>
            <Link href="/next-ai" className={getNavLinkClass("/next-ai")}>
              <RobotOutlined /> Yapay Zeka Asistanı Merkezi
            </Link>
          </nav>
          <nav>
            <Link href="/login" className="logo">
              Giriş yap
            </Link>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
