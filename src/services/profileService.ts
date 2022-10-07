import axios from "axios";
import { ProfileModel } from "../types";

const baseUrl = "https://localhost:44372/api/Profile";

export const addProfile = async (profile: ProfileModel) => {
    try{
        const {data: data} = await axios.post<ProfileModel>(baseUrl, profile);
        return data;
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
        
        return data;
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
        
    }
}

export const updateProfile = async (profile: ProfileModel) => {
    try{
        const {data: data} = await axios.put<string>(baseUrl, profile);
        
        return data;
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
    }
}

export const deleteProfile = async (id:number) => {
    try{
        const {data: data} = await axios.delete<string>(`${baseUrl}(${id})`);
        
        return data;
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
        
    }
}