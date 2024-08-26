"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [filteredChats, setFilteredChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateNewChat = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/create-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      const { chatId } = await response.json();
      router.push(`/chat/${chatId}`);
    } else {
      alert("Failed to create new chat");
    }
  };

  useEffect(() => {
    const fetchFilteredChats = async () => {
      try {
        const response = await fetch("/api/get-chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchQuery,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch filtered chats: ${response.statusText}`
          );
        }

        const chats = await response.json();
        setFilteredChats(chats);
      } catch (err) {
        //setError(`Error fetching filtered chats: ${err.message}`);
      }
    };

    fetchFilteredChats();
  }, [searchQuery]);

  const handleChatChange = (chatId) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <>
      <form onSubmit={handleCreateNewChat}>
        <label>
          Enter chat title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-black"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create new chat
        </button>
      </form>
      <label>
        Search chats:
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-black"
        />
      </label>
      <h2>Existing Chats:</h2>
      {filteredChats.map((chat) => (
        <button
          key={chat._id}
          onClick={() => handleChatChange(chat._id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {chat.title}
        </button>
      ))}
    </>
  );
}
