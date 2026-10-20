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
import ArtworkBrowser from "@/components/ArtworkBrowser";

export default async function Artworks({ searchParams }) {
  const params = await searchParams;
  const q = params.q || "sunflowers";
  const titleOnly = params.title === "true";

  return (
    <>
      <h1>Browse Artworks</h1>
      <p className="muted">
        Showing results for "{q}"{titleOnly ? " (title only)" : ""}
      </p>
      <ArtworkBrowser key={`${q}-${titleOnly}`} initialKeyword={q} titleOnly={titleOnly} />
    </>
  );
}