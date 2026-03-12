import SideVideoCard from "./SideVideoCard";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SideVideoGrid = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!data.length) {
    return (
      <div
        style={styles.grid}
        className="flex items-center justify-center p-4 text-sm text-gray-600"
      >
        No videos available.
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {data.map((video) => (
        <Link key={video._id} to={`/video/${video._id}`}>
          <SideVideoCard video={video} />
        </Link>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    width: "300px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    maxHeight: "500px", // Adjust as needed
  },
};

export default SideVideoGrid;
