import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const redirect_uri = `http://127.0.0.1:3000/api/spotify/auth`;
    const scope = "user-read-currently-playing user-read-playback-state";

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.append("client_id", client_id!);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("redirect_uri", redirect_uri);
    authUrl.searchParams.append("scope", scope);

    return NextResponse.redirect(authUrl);
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = `http://127.0.0.1:3000/api/spotify/auth`; // Must match Spotify settings

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  console.log("Exchanging code for tokens...", { redirect_uri });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  });

  const data = await response.json();

  console.log("Token exchange response:", {
    status: response.status,
    hasRefreshToken: !!data.refresh_token,
    error: data.error,
  });

  return NextResponse.json({
    message: "Copy your refresh_token and add it to .env.local as SPOTIFY_REFRESH_TOKEN",
    refresh_token: data.refresh_token,
    access_token: data.access_token,
    error: data.error,
    error_description: data.error_description,
  });
}
