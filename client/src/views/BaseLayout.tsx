import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import { ChatProvider, useChatContext } from "../context/ChatContext";

function BaseLayoutContent() {
  const { loadHistory } = useChatContext();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onHistoryClick={(history) => loadHistory(history.description)} />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default function BaseLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatProvider>
      <BaseLayoutContent />
    </ChatProvider>
  );
}
