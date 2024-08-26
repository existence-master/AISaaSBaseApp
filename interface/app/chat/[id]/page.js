"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

const Chat = () => {
  const router = useRouter();
  const { status } = useSession();
  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/unauthenticated");
    }
  }, [status, router]); // Ensure this effect runs when the status changes

  const { id: chatId } = useParams();
  const [userDetails, setUserDetails] = useState({
    email: "",
  });
  const [filteredChats, setFilteredChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [chatDetails, setChatDetails] = useState({
    chatHistory: [],
    chatTitle: "",
    chatId: chatId,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/get-user-details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch user details: ${response.statusText}`
          );
        }

        const details = await response.json();
        const { username, university } = details;
        setUserDetails({ username, university });
      } catch (err) {
        setError(`Error fetching user details: ${err.message}`);
      }
    };

    const fetchChatDetails = async () => {
      try {
        const response = await fetch("/api/get-chat-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: chatId,
          }),
        });

        if (response.status === 404) {
          router.push("/not-found");
          return;
        }

        if (!response.ok) {
          throw new Error(
            `Failed to fetch chat details: ${response.statusText}`
          );
        }

        const { chatTitle, chatHistory } = await response.json();
        setChatDetails((prevState) => ({
          ...prevState,
          chatTitle,
          chatHistory,
        }));
      } catch (err) {
        setError(`Error fetching chat details: ${err.message}`);
      }
    };

    fetchUserDetails();
    fetchChatDetails();
  }, [chatId, router]);

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
        setError(`Error fetching filtered chats: ${err.message}`);
      }
    };

    fetchFilteredChats();
  }, [searchQuery]);

  const reloadChat = async () => {
    try {
      const response = await fetch("/api/get-chat-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: chatId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to reload chat: ${response.statusText}`);
      }

      const { chatHistory } = await response.json();
      setChatDetails((prevState) => ({
        ...prevState,
        chatHistory,
      }));
      toggleMenu();
    } catch (err) {
      setError(`Error reloading chat: ${err.message}`);
    }
  };

  const handleChatChange = (chatId) => {
    router.push(`/chat/${chatId}`);
  };

  const handleError = () => {
    setError(null);
  };

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    const requestData = JSON.stringify(query);
    try {
      let response = await fetch("/api/get-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ input_text: query }), // Send user input in the specified format
      });

      if (!response.ok) {
        throw new Error("Failed to send query");
      }

      const responseData = await response.text();

      response = await fetch("/api/update-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          chatId,
          requestData,
          responseData,
        }), // Send user input in the specified format
      });

      if (!response.ok) {
        throw new Error("Failed to update chat");
      }

      reloadChat();
      closeDialog();
    } catch (error) {
      setError(
        "An error occurred while sending the message. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Return a loading state while the session status is loading
  if (status === "loading") {
    return (
      <div className="bg-[#FFFAE3] flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-8xl font-bold mb-4 text-green-600">Loading...</h1>
          <p className="text-lg">Please wait</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <>
        <div className="h-screen flex">
          <div className="flex flex-col justify-between h-screen bg-gray-100 w-1/3">
            {filteredChats.map((chat) => (
              <button
                key={chat._id}
                onClick={() => handleChatChange(chat._id)}
                className="px-4 py-2 m-2 text-left text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-none"
              >
                {chat.title}
              </button>
            ))}
          </div>
          <div className="h-screen bg-white w-2/3">
            <div className="p-4">
              {chatDetails.chatHistory?.map((message, index) => (
                <div key={index} className="w-full">
                  {/* Render the input message */}
                  <p className="text-black">{message.input}</p>
                  {/* Render the response message */}
                  <p className="text-black">{message.response}</p>
                </div>
              ))}
            </div>
            <div className="p-4">
              <input
                type="text"
                className="border border-gray-300 rounded-lg w-full p-2 mb-2 text-black"
                placeholder="Type your message"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Chat;
