"use client";

import { useEffect, useRef, useState } from "react";
import "../../styles/next-ai.scss";
import { Input, InputRef } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import ChatHistory from "../components/chat-history/ChatHistory";
import metaGif from "../../images/meta.gif";
import Image from "next/image";
import { formatMessage } from "@/helpers/formatMessage";
import { useSearchParams } from "next/navigation";
import question from "./prompt/question";
import talking from "./prompt/talking";

const LOCAL_STORAGE_KEY = "next-ai-chat-histories"; // Local storage key

const NextAi = () => {
    const searchParams = useSearchParams();
    const topic = searchParams.get("t") || "";
    const subTopic = searchParams.get("st") || "";
    const cirriculum = searchParams.get("c") || "";
    const grade = searchParams.get("g") || "";

    const [userMessage, setUserMessage] = useState<string>("");
    const [chatHistories, setChatHistories] = useState<
        { user: string; ai: string }[][]
    >([[]]);
    const [selectedChatIndex, setSelectedChatIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const chatRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<InputRef | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedHistories = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (storedHistories) {
                setChatHistories(JSON.parse(storedHistories));
            }
        }
    }, []);

    const saveToLocalStorage = (data: { user: string; ai: string }[][]) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    };

    const handleScrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };

    const handleSend = async () => {
        if (!userMessage.trim()) return;

        setChatHistories((prev) => {
            const updated = [...prev];
            updated[selectedChatIndex] = [
                ...updated[selectedChatIndex],
                { user: userMessage, ai: "" },
            ];
            saveToLocalStorage(updated);
            return updated;
        });
        setUserMessage("");
        inputRef.current?.focus();
        setLoading(true);

        const currentIndex = chatHistories[selectedChatIndex].length;

        // 1. Konuşma geçmişini al
        const currentConversation = chatHistories[selectedChatIndex];

        // 2. AI'ye gönderilecek mesaj formatı
        const messages = currentConversation.flatMap((entry) => [
            {
                role: "user",
                content: [{ type: "text", text: entry.user }],
            },
            {
                role: "assistant",
                content: [{ type: "text", text: entry.ai }],
            },
        ]);

        messages.unshift({
            role: "system",
            content: [
                {
                    type: "text",
                    text:
                        topic === null
                            ? userMessage
                            : subTopic?.includes("exercise")
                                ? talking(topic, grade, cirriculum)
                                : question(topic, subTopic, grade, cirriculum),
                },
            ],
        });

        // 4. Yeni kullanıcı mesajını ekle
        messages.push({
            role: "user",
            content: [{ type: "text", text: userMessage }],
        });

        // 5. API çağrısı
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "meta-llama/llama-4-maverick:free",
                messages,
            }),
        });

        const json = await res.json();

        if (res.ok) {
            const content = json.choices[0]?.message.content ?? "Bir hata oluştu!";
            setChatHistories((prev) => {
                const updated = [...prev];
                updated[selectedChatIndex][currentIndex] = {
                    ...updated[selectedChatIndex][currentIndex],
                    ai: content,
                };
                saveToLocalStorage(updated);
                return updated;
            });
        }

        setLoading(false);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            handleScrollToBottom();
        }
    }, [chatHistories]);

    const handleClearHistory = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setChatHistories([[]]);
    };

    return (
        <div className="next-ai-container">
            <ChatHistory
                chatHistories={chatHistories}
                setChatHistories={setChatHistories}
                selectedChatIndex={selectedChatIndex}
                setSelectedChatIndex={setSelectedChatIndex}
                handleClearHistory={handleClearHistory}
            />
            <div className="right-container">
                <div className="chat-container" ref={chatRef}>
                    {chatHistories[selectedChatIndex]?.map((chat, index) => (
                        <div key={index}>
                            <div className="user-message-container">
                                <span>User</span>
                                <p>{chat.user}</p>
                            </div>
                            {loading &&
                            index === chatHistories[selectedChatIndex].length - 1 ? (
                                <div className="ai-message-container">
                                    <span>Meta Ai</span>{" "}
                                    <Image width={50} height={50} src={metaGif} alt="meta" />
                                </div>
                            ) : (
                                <div className="ai-message-container">
                                    <span>Meta Ai</span>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: formatMessage(chat.ai),
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="input-container">
                    <Input
                        type="text"
                        className="ai-message-input"
                        ref={inputRef}
                        onPressEnter={() => {
                            if (!loading) {
                                handleSend();
                                setUserMessage("");
                            }
                        }}
                        suffix={
                            <ArrowRightOutlined
                                onClick={() => {
                                    if (!loading) {
                                        handleSend();
                                        setUserMessage("");
                                    }
                                }}
                            />
                        }
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="Herhangi bir şey sor"
                    />
                    <p className="input-sub-text">Meta ai hatalar yapabilir </p>
                </div>
            </div>
        </div>
    );
};

export default NextAi;
