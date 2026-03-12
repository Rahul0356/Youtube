import videoModel from "../models/video.model.js";
import commentModel from "../models/comment.model.js";
import axios from "axios";

async function fetchYouTubeVideos({ apiKey, q, maxResults = 24, regionCode = "IN" }) {
  if (!apiKey) return [];

  // If no query, use trending (most popular) endpoint
  if (!q) {
    const videosRes = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: {
        key: apiKey,
        part: "snippet,statistics",
        chart: "mostPopular",
        regionCode,
        maxResults,
      },
    });

    const items = videosRes?.data?.items || [];
    return items
      .map((it) => {
        const id = it?.id;
        const snippet = it?.snippet || {};
        const stats = it?.statistics || {};
        if (!id) return null;

        return {
          _id: id, // keep frontend routing working
          source: "youtube",
          youtubeId: id,
          title: snippet.title || "",
          description: snippet.description || "",
          channelName: snippet.channelTitle || "",
          thumbnailUrl:
            snippet?.thumbnails?.medium?.url ||
            snippet?.thumbnails?.high?.url ||
            snippet?.thumbnails?.default?.url ||
            "",
          views: Number(stats.viewCount || 0),
          videoUrl: `https://www.youtube.com/watch?v=${id}`,
          embedUrl: `https://www.youtube.com/embed/${id}`,
          likes: 0,
          dislikes: 0,
        };
      })
      .filter(Boolean);
  }

  // Query-based search + details (for view counts)
  const searchRes = await axios.get("https://www.googleapis.com/youtube/v3/search", {
    params: {
      key: apiKey,
      part: "snippet",
      type: "video",
      maxResults,
      q,
    },
  });

  const searchItems = searchRes?.data?.items || [];
  const ids = searchItems.map((it) => it?.id?.videoId).filter(Boolean);
  if (!ids.length) return [];

  const detailsRes = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      key: apiKey,
      part: "snippet,statistics",
      id: ids.join(","),
      maxResults,
    },
  });
  const detailsItems = detailsRes?.data?.items || [];

  const byId = new Map(detailsItems.map((it) => [it.id, it]));

  return ids
    .map((id) => {
      const it = byId.get(id);
      const snippet = it?.snippet || {};
      const stats = it?.statistics || {};

      return {
        _id: id,
        source: "youtube",
        youtubeId: id,
        title: snippet.title || "",
        description: snippet.description || "",
        channelName: snippet.channelTitle || "",
        thumbnailUrl:
          snippet?.thumbnails?.medium?.url ||
          snippet?.thumbnails?.high?.url ||
          snippet?.thumbnails?.default?.url ||
          "",
        views: Number(stats.viewCount || 0),
        videoUrl: `https://www.youtube.com/watch?v=${id}`,
        embedUrl: `https://www.youtube.com/embed/${id}`,
        likes: 0,
        dislikes: 0,
      };
    })
    .filter((v) => v.thumbnailUrl && v.title);
}

// Video Controller
export const videoController = {
  async createVideo(req, res) {
    const { title, description, videoUrl, thumbnailUrl, channelId ,channelName } = req.body; // Get channelId from the request body
    const userId = req.user.userId;

    // Validate the input
    if (!title || !description || !videoUrl || !thumbnailUrl || !channelId || !channelName) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Create a new video entry, associate it with the channelId
        const newVideo = new videoModel({
            title,
            description,
            videoUrl,
            thumbnailUrl,
            uploadedBy: userId, // Store the user ID for who uploaded the video
            channelId,
            channelName,  // Store the channel ID
        });

        // Save the video to the database
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo); // Respond with the saved video
    } catch (error) {
        console.error("Error creating video:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
  },

  async getVideosByChannelId(req, res) {
    try {
      const { channelId } = req.params;
  
      // If a channelId is provided in the URL, fetch videos by channelId
      if (channelId) {
        const videos = await videoModel.find({ channelId }).populate('uploadedBy comments');
        if (!videos || videos.length === 0) {
          return res.status(404).json({ error: "No videos found for the given channel ID" });
        }
        return res.status(200).json(videos); // Respond with the videos belonging to the channel
      }
  
      // If no channelId is provided, fetch all videos
      const videos = await videoModel.find().populate('uploadedBy comments');
      res.status(200).json(videos); // Respond with all videos
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  


  async getVideos(req, res) {
    try {
        const { channelId, q, source } = req.query;

        // Use YouTube API when configured (and not explicitly forced to db)
        const apiKey = process.env.YOUTUBE_API_KEY;
        const shouldUseYouTube = source !== "db" && Boolean(apiKey);
        if (shouldUseYouTube) {
          const ytVideos = await fetchYouTubeVideos({ apiKey, q });
          return res.status(200).json(ytVideos);
        }

        let query = {};
        if (channelId) {
            query.channelId = channelId;
        }

        const videos = await videoModel.find(query).populate('uploadedBy comments');
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

  async updateVideo(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const video = await videoModel.findById(id);
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }

      // Only the uploader can update the video
      if (video.uploadedBy.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You are not authorized to update this video" });
      }

      const updatedVideo = await videoModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedVideo);
    } catch (error) {
      console.error("Error updating video:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async deleteVideo(req, res) {
    try {
      const { videoId } = req.params;
      const userId = req.user.userId;

      const video = await videoModel.findById(videoId);
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }

      // Only the uploader can delete the video
      if (video.uploadedBy.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You are not authorized to delete this video" });
      }

      // Delete related comments to avoid orphaned data
      await commentModel.deleteMany({ videoId: video._id });
      await video.deleteOne();

      res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ error: error.message });
    }
},




};

