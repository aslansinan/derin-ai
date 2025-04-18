"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";
import languages, { Language, Topic } from "@/mock-data/Languages";
import "../../styles/ai-center.scss";
import { useEffect, useState } from "react";
import EnglandIcon from "../../images/svg/ingiltere.svg";
import GermanIcon from "../../images/svg/almanya.svg";
import RussiaIcon from "../../images/svg/rusya.svg";

import Image from "next/image";

export default function AiCenter() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("selectedLanguage");
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
        const language = languages.find((lang) => lang.name === savedLanguage);
        setTopics(language?.topics || []);
      } else {
        setSelectedLanguage("English");
        const englishLanguage = languages.find(
          (lang) => lang.name === "English"
        );
        setTopics(englishLanguage?.topics || []);
        localStorage.setItem("selectedLanguage", "English");
      }
    }
  }, []);

  const handleNavigate = () => {
    const formattedLanguage = selectedLanguage.replace(/\s+/g, "-");
    const formattedTopic = selectedTopic.replace(/\s+/g, "-");
    router.push(
      `ai-center/prepare-ai?t=${formattedLanguage}&st=${formattedTopic}`
    );
  };

  const handleSelectedLanguage = (language: Language) => {
    setSelectedLanguage(language.name);
    setTopics(language.topics || ["Seçilen dersin konuları yok"]);
    localStorage.setItem("selectedLanguage", language.name);
  };

  const handleSelectedTopic = (topic: Topic) => {
    setSelectedTopic(topic.subTopic || "");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (selectedTopic) {
        handleNavigate();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopic]);

  const returnIcon = (language: Language) => {
    switch (language.name) {
      case "English":
        return <Image src={EnglandIcon} width={30} height={30} alt={"icon"} />;
      case "German":
        return <Image src={GermanIcon} width={30} height={30} alt={"icon"} />;
      case "Russian":
        return <Image src={RussiaIcon} width={30} height={30} alt={"icon"} />;
      default:
        return null;
    }
  };

  return (
    <div className="ai-center-container">
      <div className="ai-center-header-content">
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, at!
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          aspernatur in architecto! Deserunt ullam asperiores officiis facere
          libero autem doloremque!
        </p>
      </div>
      <div className="language-list">
        {languages.map((language) => (
          <div
            onClick={() => handleSelectedLanguage(language)}
            key={language.id}
            className={`language-item ${
              selectedLanguage === language.name ? "selected" : ""
            }`}
          >
            {returnIcon(language)}
            {language.name}
          </div>
        ))}
      </div>
      {topics.length > 0 && (
        <div className="topic-list-container">
          {topics.map((topic, index) => (
            <div key={index} className="topic-item">
              <div className="topic-info">
                <span className="topic-name">{topic.name} </span>
                <span className="topic-description">{topic.description} </span>
              </div>
              <Button
                className="topic-button"
                type="primary"
                onClick={() => handleSelectedTopic(topic)}
              >
                Asistanla sohbet et
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
