"use client";

import React from "react";
import "./Footer.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/next-ai")) return null;

  return (
    <div className="footer-container">
      <div className="footer-top-content">
        <div className="footer-top-content-left">
          <div className="footer-text">
            <h2>Our approach</h2>
            <span>About Derin Bilgi</span>
          </div>
          <div className="footer-text">
            <h2>Latest News</h2>
            <span>Blog </span>
            <span>Newsletter</span>
          </div>
          <div className="footer-text">
            <h2>Dersler</h2>
            <span>İngilice</span>
            <span>Almanca</span>
            <span>Rusça </span>
          </div>
          <div className="footer-text">
            <h2>Research</h2>
            <span>Meta Ai</span>
            <span>Resources</span>
          </div>
        </div>
        <div className="search-content">arama</div>
      </div>
      <div className="footer-bottom-content">
        <div>
          <p>Derin Bilgi</p>
          <p>© 2023 Education AI Bot. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
