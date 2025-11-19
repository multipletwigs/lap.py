import { getNowPlaying, getPlaylist } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ isPlaying: false });
  }

  const song = await response.json();

  if (song.item === null) {
    return NextResponse.json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ");
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;
  const durationMs = song.item.duration_ms;
  const progressMs = song.progress_ms;
  const releaseDate = song.item.album.release_date;
  
  // Get playlist/context info
  const context = song.context;
  let playlistName = null;
  let playlistUrl = null;
  
  if (context && context.type === "playlist") {
    playlistUrl = context.external_urls?.spotify;
    
    // Extract playlist ID from URI (spotify:playlist:PLAYLIST_ID)
    const playlistId = context.uri?.split(":")[2];
    
    if (playlistId) {
      try {
        const playlistResponse = await getPlaylist(playlistId);
        if (playlistResponse.ok) {
          const playlistData = await playlistResponse.json();
          playlistName = playlistData.name;
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
        playlistName = "Playlist";
      }
    }
  } else if (context && context.type === "album") {
    playlistName = album;
  }

  return NextResponse.json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
    playlistName,
    playlistUrl,
    durationMs,
    progressMs,
    releaseDate,
  });
}
