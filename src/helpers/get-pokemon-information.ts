
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export const getPokemonInformation = async (pokemonName: string): Promise<string> => {

    delete configuration.baseOptions.headers['User-Agent'];

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Act as a pokedex and provide information based on the pokemon name provided. Limit the answer to 256 characters:\n\nPokemon name: ${pokemonName}`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0].text || `No information available about ${pokemonName}`;

};



