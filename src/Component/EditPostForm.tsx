import React from "react";
import { editPost, getPosts } from "../services/postService";
import { useStateValue } from "../state/state";
import { Post } from "../types";

interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    content: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

interface Props {
    currentPost: Post;
    toggleForm: () => void;
}


const EditPostForm: React.FC<Props> = ({currentPost, toggleForm}) => {
    const [, dispatch] = useStateValue();

    const [showEditButton, editButton] = React.useState<boolean>(false);
    const [textField, textFieldDispatch] = React.useState<string>("");
    const [inputField, inputFieldDispatch] = React.useState<string>("");

    const maxPostLenght = 1024;
    const maxTitleLenght = 45;

    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const title = e.currentTarget.elements.title.value;
        const content = e.currentTarget.elements.content.value;

        const updatedPost: Post = {
            Title: title,
            Content: content,
            PostId: Number(currentPost.PostId),
            PosterProfile: Number(currentPost.PosterProfile),
            CreateDate: currentPost.CreateDate,
            PhotoFileName: "jep",
            Likepost: currentPost.Likepost,
            Dislikepost: currentPost.Dislikepost
        }

        editPost(updatedPost).then(mes => {
            console.log(mes)
            getPosts().then(post => {
                const posts: Post[] = post as Post[];
                posts.sort((a, b) => Number(b.PostId) - Number(a.PostId));
                dispatch({ type: "GET_POSTS", payload: posts });
        })});

        dispatch({type: "UPDATE_POST", payload: updatedPost});
        toggleForm();
    }

    const activateTextAreaChange = () => {
        editButton(true);
    }

    const deactivateTextAreaChange = () => {
        textFieldDispatch("");
        inputFieldDispatch("");
        editButton(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='w-1/3'>
                <div className='flex flex-col mb-5'>
                    <input name="title" id="title" className='break-words bg-lightBackground px-2 py-1 text-xl font-bold mb-2 rounded-md' onChange={(e) => inputFieldDispatch(e.target.value)} value={inputField} onFocus={activateTextAreaChange} defaultValue={currentPost.Title} placeholder="Title" maxLength={maxTitleLenght} />
                    <textarea name="content" id="content" className='p-2 bg-lightBackground rounded-md' defaultValue={currentPost.Content} onChange={(e) => textFieldDispatch(e.target.value)} value={textField} onFocus={activateTextAreaChange} placeholder="Content" rows={4} cols={40} maxLength={maxPostLenght} />
                    <p className='text-xs mt-0.5 font-semibold text-gray-500'>{textField.length}/{maxPostLenght}</p>
                </div>
                {showEditButton &&
                    <div className='ml-auto w-fit'>
                        <button onClick={deactivateTextAreaChange} className='uppercase text-sm w-24 px-4 py-2 hover:text-white'>Cancel</button>
                        <button type="submit" className='rounded-full bg-primary text-sm px-4 py-2 w-24 text-white hover:ring-4 px-4 py-2 uppercase font-semibold'>Edit</button>
                    </div>
                }
            </form>
        </>
    )
}

export default EditPostForm;