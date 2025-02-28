"use client";
import { useContext, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { ChatContext } from "../../useContext/chatContex";
import SideNavBar from "./components/side-bar";
import ChatInput from "./components/chat-input";
import { Chatpage } from "./components/chat-page";
import NewChat from "../../svg/new-chat-icon";
import AsideIcon from "../../svg/aside-icon";
import History from "./components/history";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useParams } from "next/navigation";
import Link from "next/link";
import Squares from "@/app/components/ui/Squares";
import ChatHistory from "./components/chat-history";

const Chat = () => {
  const { chatType, setIsHistoryOpen } = useContext(ChatContext);
  const params = useParams();
  const chatId = params.chatid as string;

  const { getMessagesFromStorage } = useLocalStorage(chatId);

  const messages = getMessagesFromStorage();
  function historyOpenHandle() {
    setIsHistoryOpen((prev) => !prev);
  }

  useEffect(()=>{
    setIsHistoryOpen(false)
  },[setIsHistoryOpen,params])
  return (
    <div className="bg-mainChatbg h-screen">
      <div className="fixed h-screen w-full z-50">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#284a4f"
          hoverFillColor="#B4D9DD"
        />
      </div>
      {/* <h1 className="border w-fit text-white">hello world</h1> */}
      <main className="bg-mainChatbg min-h-screen max-h-full text-whiteChatText flex overflow-hidden">
        <SideNavBar />
        <section className="w-full max-h-screen min-h-full p-6 relative max-w-7xl mx-auto">
          <ChatHistory/>
          <header className="flex gap-4 mb-2 relative  z-[555] w-fit">
            <button
              className={`${
                chatType === "ai-chat" ? "bg-aqwaGreen" : "bg-inherit"
              } p-4 flex justify-between items-center w-fit rounded-[8px] transition-all duration-500 border-[#F7F9FC] border`}
              type="button"
            >
              <MessageSquare />
              <div className="text-[#284a4f]"></div>
            </button>
            {/* <button
            className={`${
              chatType === "swap" ? "bg-aqwaGreen" : "bg-inherit"
            } p-4 flex justify-between items-center w-fit rounded-[8px] transition-all duration-500 border-[#F7F9FC] border`}
            type="button"
          >
            <Swap />
          </button>  */}
          </header>
          <div className=" h-[92%] flex gap-1 rounded-[8px">
            <div
              className={`${
                messages.length ? "bg-[#141A2A]" : "bg-inherit"
              } w-full items-center h-full justify-center flex flex-col gap-2 rounded-[8px] ${
                messages.length > 0 ? "relative  z-[555]" : ""
              } `}
            >
              {messages.length > 0 && (
                <div className="flex justify-between items-center w-full max-w-7xl border-b-[#D6F3F7] border-b p-4  relative  z-[555]">
                  <h2>AI CHAT</h2>
                  <div className="flex items-center gap-5">
                    <Link href={`/chat/${Date.now().toString()}`}>
                      <NewChat />
                    </Link>
                    <span onClick={historyOpenHandle}>
                      <AsideIcon />
                    </span>
                  </div>
                </div>
              )}
              {messages.length > 0 && <Chatpage />}
              <ChatInput />
            </div>
            <History />
          </div>
        </section>
      </main>
    </div>
  );
};
export default Chat;