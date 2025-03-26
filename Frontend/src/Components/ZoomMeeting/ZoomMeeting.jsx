import React, { useState } from "react";
import axios from "axios";

const ZoomMeeting = () => {
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingData, setMeetingData] = useState({
    topic: "Team Meeting",
    startTime: "2024-03-25T12:00:00Z", // Adjust for your timezone
    duration: 30, // Duration in minutes
  });

  const scheduleMeeting = async () => {
    try {
      // First, get the access token
      const authResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/zoom/callback`);
      const accessToken = authResponse.data.access_token;

      // Now, create the meeting
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/zoom/create-meeting`, {
        accessToken,
        topic: meetingData.topic,
        startTime: meetingData.startTime,
        duration: meetingData.duration,
      });

      setMeetingLink(response.data.joinUrl); // Save the meeting link
      alert(`Meeting Scheduled! Join at: ${response.data.joinUrl}`);
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      alert("Failed to schedule meeting.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Schedule Zoom Meeting</h2>

      <label className="block mb-2">Meeting Topic:</label>
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded-md"
        value={meetingData.topic}
        onChange={(e) => setMeetingData({ ...meetingData, topic: e.target.value })}
      />

      <label className="block mb-2">Start Time (UTC):</label>
      <input
        type="datetime-local"
        className="w-full p-2 mb-4 border rounded-md"
        onChange={(e) => setMeetingData({ ...meetingData, startTime: e.target.value })}
      />

      <label className="block mb-2">Duration (Minutes):</label>
      <input
        type="number"
        className="w-full p-2 mb-4 border rounded-md"
        value={meetingData.duration}
        onChange={(e) => setMeetingData({ ...meetingData, duration: e.target.value })}
      />

      <button
        onClick={scheduleMeeting}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Schedule Meeting
      </button>

      {meetingLink && (
        <div className="mt-4">
          <p className="text-green-500 font-semibold">Meeting Scheduled Successfully!</p>
          <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Join Meeting
          </a>
        </div>
      )}
    </div>
  );
};

export default ZoomMeeting;
