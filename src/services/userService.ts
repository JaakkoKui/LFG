import axios from "axios";
import { User } from "../types";

const baseUrl = "https://localhost:44372/api/User";

export const getUsers = async () => {
    try {

        const { data: data } = await axios.get<User[]>(baseUrl);
        
        return data;
    } catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}