import axios from 'axios';

export const getPokemonsApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    params: {
        limit: 10,
        offset: 10,
    },
});