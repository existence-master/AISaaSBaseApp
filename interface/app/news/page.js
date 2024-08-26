"use client";

import { useState, useEffect } from "react";

const News = () => {
  const [news, setNews] = useState([]);

  const getNews = async () => {
    let response = await fetch("/api/get-news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({}), // Send user input in the specified format
    });

    const responseData = await response.json();
    setNews(responseData.received_news);
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div>
      <h1>News</h1>
      <ul>
        {news.map((headline, index) => (
          <li key={index}>{headline}</li>
        ))}
      </ul>
    </div>
  );
};

export default News;
