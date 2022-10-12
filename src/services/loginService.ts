import axios from "axios";
import { User, Message } from "../types";

const baseUrl = "https://localhost:44372/api/Auth";


export const SignIn = async (login: User) => {
    
    try{
        const{data: message} = await axios.post<Message>(`${baseUrl}/SignIn`, login)
        console.log(message);
        return message;
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
        
    }
}

export const SignUp = async (signup: User) => {
    try{
        const{data: message} = await axios.post<Message>(`${baseUrl}/SignUp`, signup)
        console.log(message);
        return message;
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
        
    }
}
