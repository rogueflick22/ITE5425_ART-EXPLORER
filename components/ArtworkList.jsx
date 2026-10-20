import ArtworkCard from "./ArtworkCard";
export default function ArtworkList({artworks}){return <div className="grid">{artworks.length===0?<div className="placeholder">Artwork cards appear here after you connect the API.</div>:artworks.map(artwork=><ArtworkCard key={artwork.objectID} artwork={artwork}/>)}</div>}
