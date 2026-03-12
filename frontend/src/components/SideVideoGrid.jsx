import SideVideoCard from "./SideVideoCard";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SideVideoGrid = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchVideos() {
    setLoading(true);
    const url = "http://localhost:3000/api/getVideos";
    const token = localStorage.getItem("token");

    if (!token) return console.error("Token not found in localStorage");

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
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
