import React, { useState } from "react";
import "./ChatHistory.scss";
import { Button, Drawer, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import useIsMobile from "@/helpers/useIsMobile";

interface ChatHistoryProps {
  chatHistories: { user: string; ai: string }[][];
  setChatHistories: React.Dispatch<
    React.SetStateAction<{ user: string; ai: string }[][]>
  >;
  selectedChatIndex: number;
  setSelectedChatIndex: React.Dispatch<React.SetStateAction<number>>;
  handleClearHistory: () => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = (props) => {
  const {
    chatHistories,
    selectedChatIndex,
    setSelectedChatIndex,
    setChatHistories,
    handleClearHistory,
  } = props;

  const isMobile = useIsMobile(768);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  
  const handleNewChat = () => {
    setChatHistories((prev) => [...prev, []]);
    setSelectedChatIndex(chatHistories.length);
  };

  return (
    <div className="left-container">
      <Drawer
        className="chat-history-drawer"
        title="Sohbet Geçmişi"
        placement={"left"}
        width={300}
        extra={
          <>
            <Tooltip title="Geçmişi Temizle" placement="bottom">
              <Button
                icon={<DeleteOutlined />}
                className="bar-button"
                onClick={handleClearHistory}
              />
            </Tooltip>
            <Tooltip title="Yeni Sohbet" placement="bottom">
              <Button
                icon={<EditOutlined />}
                className="bar-button"
                onClick={handleNewChat}
              />
            </Tooltip>
          </>
        }
        onClose={onClose}
        closeIcon={<MenuFoldOutlined />}
        getContainer={false}
        open={open}
      >
        {chatHistories.map((_, index) => (
          <div
            key={index}
            className={`chat-history-item ${
              index === selectedChatIndex ? "active" : ""
            }`}
            onClick={() => setSelectedChatIndex(index)}
          >
            <span>
              {chatHistories[index][0]?.user.length > 50
                ? `${chatHistories[index][0]?.user.slice(0, 50)}...`
                : chatHistories[index][0]?.user || "Yeni Sohbet"}
            </span>
          </div>
        ))}
      </Drawer>
      {isMobile ? (
        <Button className="bar-button-mobile" onClick={() => showDrawer()}>
          Geçmişi Göster
        </Button>
      ) : (
        <div className="top-bar">
          <Button
            className="bar-button"
            onClick={() => showDrawer()}
            icon={<MenuFoldOutlined />}
          />
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
