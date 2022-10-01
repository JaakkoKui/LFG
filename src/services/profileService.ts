import axios from "axios";
import { ProfileModel } from "../types";

const baseUrl = "https://localhost:44372/api/Profile";

export const addProfile = async (profile: ProfileModel) => {
    try{
        const {data: data} = await axios.post<ProfileModel>(baseUrl, profile);
        console.log(data)
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
        
    }
}

export const getProfiles = async () => {
    try{
        const {data: data} = await axios.get<ProfileModel[]>(baseUrl);
        console.log(data)
        return data;
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
        
    }
}