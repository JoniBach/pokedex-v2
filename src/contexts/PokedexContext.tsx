import axios from "axios";
import { createContext, useState, useEffect, useContext, FC } from "react";
import mockWeather from "../mock/weather.json";
import mockLocation from "../mock/location.json";

export const PokedexContext = createContext<any>({
  pokedex_data: {}, // Initial value
});

type ContextProps = {
  children: any;
};

const Clock = () => {
  const [time, setTime] = useState<any>("");

  const MINUTE_MS = 100000;

  const clock = () => {
    const date = new Date();

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dd = date.getDate();
    const mm = date.getMonth();
    const yyyy = date.getFullYear();
    const day = date.getDay();
    const sec = date.getSeconds();
    const min = date.getMinutes();
    const hrs = date.getHours();
    return `${hrs}:${min} ${days[day - 1]} ${dd}-${mm}-${yyyy}`;
  };

  useEffect(() => {
    setTime(clock());

    const interval = setInterval(() => {
      setTime(clock());
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return time || "loading";
};

export const PokedexContextProvider: FC<ContextProps> = ({ children }) => {
  const [pokedex_data, setPokedexData] = useState({});
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);

  async function getData(name: string) {
    if (name) {
      const result = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      return result;
    } else {
      try {
        const result = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/?limit=10000&offset=0"
        );
        return result;
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    const fetchPokedexData = async () => {
      const data = await getData("");

      if (data) {
        setPokedexData(data);
      } else {
        console.log("error");
        // There was an error fetching the data
      }
    };

    fetchPokedexData();
  }, []);

  const fetchPokemon = async (name: string) => {
    const data = await getData(name);
    return data;
  };

  const fetchWeather = (city: string) => {
    //           axios
    //   .get(
    //     `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${city}&aqi=no`
    //   )
    //   .then((response) => {
    //     setWeather(response.data);
    //   });

    setWeather(mockWeather?.data?.current);
  };

  const fetchLocation = async () => {
    //       axios
    //   .get(
    //     ` https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_LOCATION_KEY}`
    //   )
    //   .then((response) => {
    //     setLocation(response.data);
    //     fetchWeather(response.data.city)
    //   });

    setLocation(mockLocation);
    fetchWeather("london");
  };

  const fetchSpecies = async (url: string) => {
    console.log(url);
    const data = await axios.get(url);
    return data
  };
  useEffect(() => {
    fetchLocation();
  }, []);
  const weatherString = weather ? weather?.condition?.text : "loading";

  return (
    <PokedexContext.Provider
      value={{
        ...pokedex_data,
        fetchPokemon,
        clock: Clock(),
        location: location,
        locationString: `${location?.city}, ${location?.country_code2}`,
        weather: weather,
        weatherString,
        fetchSpecies,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export function usePokedex() {
  return useContext(PokedexContext);
}
