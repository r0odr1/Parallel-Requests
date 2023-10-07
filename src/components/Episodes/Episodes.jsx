import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import axios from "axios";
import { getEpisodesWithCharacters } from "../../utils";

const EPISODES_URL = "https://rickandmortyapi.com/api/episode";

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await axios.get(EPISODES_URL);
      const data = response.data;
      setEpisodes(data.results);
    };
    fetchEpisodes();
  }, []);

  useEffect(() => {
    const fetchCharacters = async () => {
      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      const results = responses.map((response) => response.data);
      setCharacters(results);
    };
    fetchCharacters();
  }, [episodes]);

  episodes.map((episode) => {
    episode.characters = episode.characters.filter(
      (character, index) => index <= 9,
    );
  });

  const firstTenCharactersUrl = new Set();

  episodes.forEach((episode) => {
    episode.characters.forEach((characterUrl) => {
      firstTenCharactersUrl.add(characterUrl);
    });
  });

  const urls = Array.from(firstTenCharactersUrl);

  const episodesWithCharacters = getEpisodesWithCharacters(
    episodes,
    characters,
  );

  return (
    <div className="card-container">
      <Card episodesWithCharacters={episodesWithCharacters} />
    </div>
  );
};

export default Episodes;
