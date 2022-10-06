import axios from "axios";
import { Game } from "../types"

const baseUrl = "https://localhost:44372/api/Game";

export const getAll = async () => {
	try {
		const { data: games } = await axios.get<Game[]>(baseUrl)
		return games
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}

}

export const addGame = async (game: Game) => {
	try {
		const { data: data } = await axios.post<Game>(baseUrl, game)
		return data;
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
}