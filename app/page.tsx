"use client";

import React from "react";
import "../styles/home.scss";
import { Button } from "antd";
import { useRouter } from "next/navigation";
const HomePage = () => {
  const router = useRouter();

  const navigateToChat = () => {
    router.push("/ai-center");
  };
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-text">
          <div>
            <span className="span-text"> Welcome to the Education AI Bot with </span>
            <span className="meta-text">Meta</span>{" "}
          </div>
          <div className="fancy">
            <Button onClick={navigateToChat} className="get-start-button">
              Get Start
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
