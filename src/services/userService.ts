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

export const editUser = async (newPassword: User) => {
    try {

        const { data: data } = await axios.put<string>(baseUrl, newPassword);
        
        return data;
    } catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}

export const deleteUser = async (id:number) => {
    try {

        const { data: data } = await axios.delete<string>(`${baseUrl}/${id}`);
        
        return data;
    } catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}