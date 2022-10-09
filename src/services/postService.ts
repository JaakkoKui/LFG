import axios from "axios";
import { Post } from "../types";

const baseUrl = "https://localhost:44372/api/Post";

export const getPosts = async () => {
    try{
        const {data: data} = await axios.get<Post[]>(baseUrl);
        return data;
    }catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}

export const addPost = async (post: Post) => {
    try{
        const {data: data} = await axios.post<Post>(baseUrl, post);
        return data;
    }catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}

export const deletePost = async (id: number) => {
    try{
        const {data: data} = await axios.delete<string>(`${baseUrl}/${id}`);
        return data;
    }catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}

export const editPost = async (post: Post) => {
    try{
        const {data: data} = await axios.put<string>(baseUrl, post);
        return data;
    }catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}

export const likePost = async (post: Post) => {
    try{
        post.Like++;
        const {data: data} = await axios.put<string>(baseUrl, post);
        return data;
    }catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}

export const dislikePost = async (post:Post) => {
    try{
        post.Dislike++;
        const {data: data} = await axios.put<string>(baseUrl, post);
        return data;
    }catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}