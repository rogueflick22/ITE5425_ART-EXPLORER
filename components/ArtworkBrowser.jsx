/*********************************************************************************
* ITE5425 - Mastery Assignment 1: Art Explorer
* I declare that this assignment is my own work in accordance with Humber
* Academic Policy. No part of this assignment has been copied manually or
* electronically from any other source, including websites, or distributed
* to other students.
*
* I understand that I may use Generative AI for learning, debugging, and
* brainstorming, but the submitted work must be customized to this Art
* Explorer assignment and I must be able to explain the code and design decisions.
*
* Name: Maria Catherine Jaramillo Student ID: N01740036 Date: 10-19-2026
*********************************************************************************/
"use client";
import { useEffect, useRef, useState } from "react";
import ArtworkList from "./ArtworkList";
import { getArtwork, searchArtworkIDs } from "../lib/metApi";

export default function ArtworkBrowser({ initialKeyword = "sunflowers", titleOnly = false }) {
  const [keyword, setKeyword] = useState(initialKeyword); // PROVIDED (now starts from the URL)
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Counts searches so old results don't replace newer ones
  const requestId = useRef(0);

  async function loadArtworks(searchWord) {
    const myRequest = ++requestId.current;
    setLoading(true);
    setError("");

    try {
      const ids = await searchArtworkIDs(searchWord, titleOnly);
      const results = await Promise.all(
        ids.map((id) => getArtwork(id).catch(() => null))
      );

      // If a newer search started, ignore this one
      if (myRequest !== requestId.current) return;
      setArtworks(results.filter((art) => art !== null));
    } catch (err) {
      if (myRequest !== requestId.current) return;
      setError("Something went wrong. Please try again.");
      setArtworks([]);
    } finally {
      if (myRequest === requestId.current) {
        setLoading(false);
        setSearched(true);
      }
    }
  }

  useEffect(() => {
  loadArtworks(initialKeyword);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (keyword.trim() === "") return;
    loadArtworks(keyword.trim());
  }

  return (
    <section className="panel">
      <form className="row" onSubmit={handleSubmit}>
        <input
          className="field"
          aria-label="Artwork keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="button" type="submit">Search</button>
      </form>

      {loading && <p className="muted">Loading artworks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && searched && artworks.length === 0 && (
        <p className="muted">No artworks found. Try another keyword.</p>
      )}

      {!loading && artworks.length > 0 && <ArtworkList artworks={artworks} />}
    </section>
  );
}
