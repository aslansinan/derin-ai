"use client";

import React, { useState } from "react";
import "../../../styles/PrepareAi.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { SnippetsOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import CirriculumMockData from "@/mock-data/Cirriculum";
import Image from "next/image";
const PrepareAi = () => {
  const router = useRouter();
  const [selectedCirriculum, setSelectedCirriculum] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");

  const searchParams = useSearchParams();
  const topic = searchParams.get("t");
  const subTopic = searchParams.get("st");

  const handleNavigateChat = () => {
    router.push(
      `/next-ai/?t=${topic}&st=${subTopic}&c=${selectedCirriculum}&g=${selectedGrade}`
    );
  };

  const handleSelectedCirriculum = (value: string) => {
    setSelectedCirriculum(value);
  };

  const handleSelectedGrade = (value: string) => {
    setSelectedGrade(value);
  };

  return (
    <div className="prepare-ai-container">
      <div className="prepare-ai-header">
        <SnippetsOutlined />
        <div className="header-content">
          <h2>{topic}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo
            doloremque inventore repudiandae harum similique placeat dolores
            nostrum animi, fugiat voluptate.{" "}
          </p>
        </div>
      </div>

      <div className="prepare-ai-content">
        <div className="header">
          <h3> Lorem ipsum dolor sit amet.</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            hic corrupti quae provident eaque harum?{" "}
          </p>
        </div>
        <div className="prepare-ai-select">
          <div className="select-item">
            <h3>Cirriculum</h3>
            <Select
              defaultActiveFirstOption={true}
              optionFilterProp="label"
              value={selectedCirriculum}
              onChange={handleSelectedCirriculum}
              options={CirriculumMockData.map((item) => ({
                label: (
                  <>
                    <Image
                      width={30}
                      height={20}
                      src={item.imgUrl}
                      alt="flag"
                    />{" "}
                    {item.name}
                  </>
                ),
                value: item.name,
                key: item.id,
              }))}
            />
          </div>
          <div className="select-item">
            <h3>Grade</h3>
            <Select
              defaultActiveFirstOption={true}
              optionFilterProp="label"
              value={selectedGrade}
              onChange={handleSelectedGrade}
              options={[
                {
                  value: 9,
                  label: "9th Grade",
                },
                {
                  value: 10,
                  label: "10th Grade",
                },
                {
                  value: 11,
                  label: "11th Grade",
                },
                {
                  value: 12,
                  label: "12th Grade",
                },
              ]}
            />
          </div>
        </div>
        <Button onClick={handleNavigateChat}>Start Chat </Button>
      </div>
    </div>
  );
};

export default PrepareAi;
