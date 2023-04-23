import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoremIpsum } from "lorem-ipsum";

export function 
useBuscarInfoQuery(params) {
  return useQuery(
    ["getDog", params],
    getDog, {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: false,
    enabled: true,
  });
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});





function nombreRandom() {
    let res = "";
    for (let i = 0; i < 6; i++) {
      const random = Math.floor(Math.random() * 25);
      res += String.fromCharCode(97 + random);
    }
    return res;
  }

export const getDog = async (params) => {
  const [queryName, paramsFilter] = params.queryKey;
  const name = nombreRandom();
  let urlBase = "https://dog.ceo/api/breeds/image/random";
  const { data } = await axios.get(
    urlBase
  );

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 5,
      min: 2
    },
    wordsPerSentence: {
      max: 10,
      min: 4
    }
  });


  const resumen = {
    image: data.message,
    label : name,
    description: lorem.generateParagraphs(1)
  };

  return resumen;
};