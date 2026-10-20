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
import Link from "next/link";
import { getArtwork } from "../../../lib/metApi";

export default async function ArtworkDetailPage({ params }) {
  const { id } = await params;

  let artwork = null;
  try {
    artwork = await getArtwork(id);
  } catch (err) {
    artwork = null;
  }

  // Invalid or missing artwork
  if (!artwork || !artwork.objectID) {
    return (
      <section className="panel">
        <h1>Artwork not found</h1>
        <p className="muted">No artwork exists with ID "{id}".</p>
        <Link href="/artwork">← Back to Artworks</Link>
      </section>
    );
  }

  return (
    <section className="panel">
      <p><Link href="/artwork">← Back to Artworks</Link></p>

      {artwork.primaryImage ? (
        <img
          src={artwork.primaryImage}
          alt={`${artwork.title || "Untitled"} by ${artwork.artistDisplayName || "Unknown artist"}`}
          style={{ maxWidth: "100%", maxHeight: "450px", marginTop: "16px" }}
        />
      ) : (
        <div className="placeholder">No image available</div>
      )}

      <h1>{artwork.title || "Untitled"}</h1>
      <p>{artwork.artistDisplayName || "Unknown artist"}</p>

      <p><strong>Date:</strong> {artwork.objectDate || "N/A"}</p>
      <p><strong>Medium:</strong> {artwork.medium || "N/A"}</p>
      <p><strong>Dimensions:</strong> {artwork.dimensions || "N/A"}</p>
      <p><strong>Classification:</strong> {artwork.classification || "N/A"}</p>
      <p><strong>Department:</strong> {artwork.department || "N/A"}</p>
    </section>
  );
}