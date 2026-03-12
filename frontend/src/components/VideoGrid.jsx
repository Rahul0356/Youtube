import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";

const VideoGrid = ({ searchQuery, selectedFilter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    setLoading(true);
    const url = "http://localhost:5100/api/getVideos";
    const token = localStorage.getItem("token");

    const headers = token ? { authorization: `Bearer ${token}` } : undefined;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Failed to fetch videos:", response.status);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }

  // Filter videos by title (search) and category (selectedFilter)
  const filteredVideos = data.filter((video) => {
    const matchesTitle = video.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedFilter === "All" ||
      video.category?.toLowerCase() === selectedFilter.toLowerCase();

    return matchesTitle && matchesCategory;
  });

  if (loading) return <div>Loading...</div>;

  if (!filteredVideos.length) {
    return (
      <div className="p-8 text-center text-gray-600">
        No videos found. Try adding some or check your backend data.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {filteredVideos.map((video) => (
        <Link key={video._id} to={`/video/${video._id}`}>
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoGrid;
