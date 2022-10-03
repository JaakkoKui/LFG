import React from "react";
import { addPost } from "../services/postService";
import { useStateValue } from "../state/state";
import { Post, ProfileModel } from "../types";



interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    content: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

interface Props {
    currentUser: ProfileModel
}

const AddPost: React.FC<Props> = ({ currentUser }) => {

    const [, dispatch] = useStateValue();

    const handlePost = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const date = new Date();
        const today = date.getFullYear() +"."+ (date.getMonth()+1) +"."+ date.getDate();

        const title = e.currentTarget.elements.title.value;
        const content = e.currentTarget.elements.content.value;

        const newPost:Post = {
            Title: title,
            CreateDate: today,
            Content: content,
            PosterProfile: currentUser.ProfileId
        }

        addPost(newPost);
        dispatch({type: "ADD_POST", payload: newPost});

        e.currentTarget.elements.title.value = "";
        e.currentTarget.elements.content.value = "";
    }
    return (
        <>
            <form onSubmit={handlePost}>
                <input id="title" name="title" placeholder="Title"/>
                <textarea name="content" id="content" cols={50} rows={5} placeholder="Post Content..." />
                <button type="submit">Post!</button>
            </form>
        </>
    );
}

export default AddPost;