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

export default function ArtworkCard({ artwork }) {
  return (
    <article className="card">
      {artwork.primaryImageSmall ? (
        <img
          src={artwork.primaryImageSmall}
          alt={`${artwork.title || "Untitled"} by ${artwork.artistDisplayName || "Unknown artist"}`}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      ) : (
        <div className="placeholder">No image available</div>
      )}

      <h3>{artwork.title || "Untitled"}</h3>
      <p>{artwork.artistDisplayName || "Unknown artist"}</p>
      <p>{artwork.objectDate || "Date unknown"}</p>

      <Link href={`/artwork/${artwork.objectID}`}>View Details</Link>
    </article>
  );
}