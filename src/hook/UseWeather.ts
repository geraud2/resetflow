// src/hooks/useWeather.ts
import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  city: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
}

export function useWeather(city: string = 'Antalya') {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Utilisation de wttr.in - API gratuite sans clé
        const response = await fetch(`https://wttr.in/${city}?format=j1&lang=fr`);
        const data = await response.json();
        
        const current = data.current_condition[0];
        
        setWeather({
          temp: parseInt(current.temp_C),
          condition: current.lang_fr?.[0]?.value || current.weatherDesc[0].value,
          icon: current.weatherCode,
          city: city,
          feelsLike: parseInt(current.FeelsLikeC),
          humidity: parseInt(current.humidity),
          windSpeed: parseInt(current.windspeedKmph),
        });
        setError(null);
      } catch (err) {
        console.error('Erreur météo:', err);
        setError('Impossible de charger la météo');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
}