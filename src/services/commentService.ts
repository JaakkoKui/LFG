import axios from "axios";
import { Comments } from "../types";

const baseUrl = "https://localhost:44372/api/Comment";

export const getComments = async () => {
    try {
		const { data: comments } = await axios.get<Comments[]>(baseUrl);
		return comments;
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
};

export const addComment = async (comment: Comments) => {
    try {
		const { data: comments } = await axios.post<Comments>(baseUrl, comment);
		return comments;
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
};

export const deleteComment = async (id: number) => {
	try {
		const { data: data } = await axios.delete<string>(`${baseUrl}/${id}`)
		return data;
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
};

export const editComment = async (comment: Comment) => {
	try {
		const { data: data } = await axios.put<string>(baseUrl, comment)
		return data;
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
}