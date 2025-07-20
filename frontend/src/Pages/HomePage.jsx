import React, { useState } from "react";
import Navbar from "../componenet/Navbar";
import RateLimitedUi from "../componenet/RateLimitedUi";
import api from "../lib/axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import NoteCard from "../componenet/NoteCard";
import NotesNotFound from "../componenet/NotesNotFound";

const HomePage = () => {
  const [isRateedLimited, setIsRateedLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateedLimited(false);
      } catch (error) {
        console.error("Error fetching notes:");
        console.log(error);
        if (error.response?.status === 429) {
          setIsRateedLimited(true);
        } else {
          toast.error("Failed to fetch notes. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateedLimited && <RateLimitedUi />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {Loading && (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        )}
        {notes.length === 0 && !isRateedLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateedLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
