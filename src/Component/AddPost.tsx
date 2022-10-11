import React from "react";
import { addPost, getPosts } from "../services/postService";
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
    toggleNewPost: () => void;
}

const AddPost: React.FC<Props> = ({ currentUser, toggleNewPost }) => {

    const [, dispatch] = useStateValue();
    const [showCommentButton, postButton] = React.useState<boolean>(false);
    const [textField, textFieldDispatch] = React.useState<string>("");
    const [inputField, inputFieldDispatch] = React.useState<string>("");
    const maxPostLenght = 1024;
    const maxTitleLenght = 45;

    const handlePost = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const date = new Date();
        date.setMilliseconds(0);

        const title = e.currentTarget.elements.title.value;
        const content = e.currentTarget.elements.content.value;

        const newPost: Post = {
            PostId: undefined,
            Title: title,
            CreateDate: date.toISOString().replace(".000Z", ""),
            Content: content,
            PosterProfile: Number(currentUser.ProfileId),
            PhotoFileName: "jep",
            Likepost: 0,
            Dislikepost: 0
        }

        addPost(newPost);
        dispatch({ type: "ADD_POST", payload: newPost });

        getPosts().then(post => {
            const posts: Post[] = post as Post[];
            posts.sort((a, b) => Number(b.PostId) - Number(a.PostId));
            dispatch({ type: "GET_POSTS", payload: posts });
        })

        e.currentTarget.elements.title.value = "";
        e.currentTarget.elements.content.value = "";

        toggleNewPost();
    }

    const activateTextAreaChange = () => {
        postButton(true);
    }

    const deactivateTextAreaChange = () => {
        textFieldDispatch("");
        inputFieldDispatch("");
        postButton(false);
    }

    return (
        <div id='addPost'>
            <form onSubmit={handlePost}>
                <div className='flex flex-col text-gray-300'>
                    <input id="title" name="title" onChange={(e) => inputFieldDispatch(e.target.value)} value={inputField} onFocus={activateTextAreaChange} placeholder="Your title..." className='rounded-md bg-lightBackground py-2 px-4 w-1/3' maxLength={maxTitleLenght} />
                    <textarea name="content" id="content" onChange={(e) => textFieldDispatch(e.target.value)} value={textField} onFocus={activateTextAreaChange} cols={50} rows={5} placeholder="Your post..." className='rounded-md bg-lightBackground py-2 px-4 mt-4' maxLength={maxPostLenght} />
                    <p className='text-xs mt-0.5 font-semibold text-gray-500'>{textField.length}/{maxPostLenght}</p>
                    {showCommentButton &&
                        <div className='flex ml-auto'>
                            <button onClick={deactivateTextAreaChange} className='uppercase text-sm w-24 px-4 mt-5 py-2 hover:text-white'>Cancel</button>
                            <button className='rounded-full bg-primary text-sm px-4 py-2 w-24 text-white hover:ring-4 px-4 py-2 mt-5 uppercase font-semibold' type="submit">Post</button>
                        </div>
                    }
                    <br />
                </div>
            </form>
        </div>
    );
}

export default AddPost;