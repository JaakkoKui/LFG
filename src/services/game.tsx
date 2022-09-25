import axios from "axios";
import { Game }	from "../types"
/*
const baseUrl: string = "/api/Games";

const getAll = async () => {
	try {
		const {data: games } = await axios.get<Game[]>(baseUrl)
		
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data.message;
		}
		console.error(errorMessage);
	}
	
}*/