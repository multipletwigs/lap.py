"use client";

import { useEffect, useState } from "react";
import { Clock, CloudRain, CloudSun, Cloud, Sun, CloudSnow } from "lucide-react";

export function TimeWidget() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-background/60 border border-border/50 text-foreground font-medium animate-in fade-in slide-in-from-right-2 duration-500">
      <Clock className="w-4 h-4" />
      {time}
    </div>
  );
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<{
    temp: number;
    condition: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 10000,
            });
          }
        );

        const { latitude, longitude } = position.coords;

        // Fetch weather from Open-Meteo (free, no API key needed)
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`
        );

        const data = await response.json();

        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: data.current.weather_code,
        });
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-4 h-4 animate-spin" style={{ animationDuration: '20s' }} />;
    if (code <= 3) return <CloudSun className="w-4 h-4 animate-pulse" />;
    if (code <= 67) return <CloudRain className="w-4 h-4 animate-bounce" />;
    if (code <= 77) return <CloudSnow className="w-4 h-4 animate-pulse" />;
    return <Cloud className="w-4 h-4 animate-pulse" />;
  };

  if (loading) return null;
  if (error || !weather) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-background/60 border border-border/50 text-foreground font-medium animate-in fade-in slide-in-from-right-2 duration-500 delay-100">
      {getWeatherIcon(weather.condition)}
      <span>{weather.temp}°F</span>
    </div>
  );
}
