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
        <div id='addPost' className=''>
            <form onSubmit={handlePost}>
                <div className='flex flex-col'>
                    <input id="title" name="title" placeholder="Title" className='border-2 rounded-md border-gray-300 py-2 px-4 w-1/3' />
                    <textarea name="content" id="content" cols={50} rows={5} placeholder="Post Content..." className='border-2 rounded-md border-gray-300 py-2 px-4 mt-4' />
                    <button className='w-20 bg-primary rounded-full text-white px-4 py-2 mt-4' type="submit">Post!</button>
                </div>
            </form>
        </div>
    );
}

export default AddPost;