const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

console.log("Spotify Config:", {
  hasClientId: !!client_id,
  hasClientSecret: !!client_secret,
  hasRefreshToken: !!refresh_token,
});

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const getAccessToken = async () => {
  console.log("Getting access token...");
  
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token!,
    }),
  });

  const data = await response.json();
  console.log("Token response:", {
    status: response.status,
    hasAccessToken: !!data.access_token,
    error: data.error,
    errorDescription: data.error_description,
  });

  return data.access_token;
};

export const getNowPlaying = async () => {
  try {
    const accessToken = await getAccessToken();
    console.log("Access token:", accessToken ? "Got it!" : "UNDEFINED");

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error in getNowPlaying:", error);
    throw error;
  }
};

export const getPlaylist = async (playlistId: string) => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error in getPlaylist:", error);
    throw error;
  }
};
