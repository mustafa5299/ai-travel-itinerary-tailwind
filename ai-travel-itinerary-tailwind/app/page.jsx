'use client';
import { useState } from 'react';

export default function Home() {
  const [city, setCity] = useState('');
  const [interests, setInterests] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateItinerary = async () => {
    console.log("Generate button clicked!");

    if (!city || !interests) return alert("Please fill in all fields.");
    setLoading(true);
    setItinerary("");

    try {
      const response = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, interests })
      });
      const data = await response.json();
      console.log("API response:", data); 
      setItinerary(data.itinerary);
    } catch (error) {
      console.error("Error calling /api/itinerary:", error);
      setItinerary("Error generating itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex flex-col items-center justify-center px-4 py-10 font-sans">
      <div className="text-center mb-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-sm">One-Day AI Travel Planner ✈️</h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Enter your destination and interests to generate a smart, custom travel plan instantly.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 space-y-4 border border-indigo-100">
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter your city (e.g., Tokyo)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Your interests (e.g., food, culture, nature, shopping)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
        <button
          onClick={generateItinerary}
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
      </div>

      {itinerary && (
        <div className="max-w-2xl mt-8 bg-white p-6 rounded-2xl shadow-md border border-gray-100 animate-fade-in">
          <h2 className="text-2xl font-semibold text-pink-600 mb-2">Your AI-Powered Itinerary</h2>
          <pre className="whitespace-pre-wrap text-gray-800 text-base">{itinerary}</pre>
        </div>
      )}
    </main>
  );
}
