import React from "react";
import { addComment } from "../services/commentService";
import { useStateValue } from "../state/state";
import { Comments, Post, ProfileModel } from "../types";

interface FormElements extends HTMLFormControlsCollection {
    comment: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

interface Props {
    thisPost: Post;
    toggleForm: () => void;
    currentUser: ProfileModel
}

const AddComment: React.FC<Props> = ({thisPost, currentUser, toggleForm}) => {
    const [, dispatch] = useStateValue();
    
    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const date = new Date();
        const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        const comment = e.currentTarget.elements.comment.value;

        const newComment: Comments = {
            Id: undefined,
            PostId: Number(thisPost.PostId),
            CommentContent: comment,
            CommentingProfile: Number(currentUser.ProfileId),
            Date: today
        }

        addComment(newComment);
        dispatch({type: "ADD_COMMENT", payload:newComment});
        toggleForm();
    }
    const handleCancel = () => {
        toggleForm();
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='mt-5 pb-5 w-[400px] border-b border-gray-600'>
                <div className='flex'>
                    <div className='h-[30px] w-[30px] mb-2 bg-lightBackground object-contain rounded-full'></div>
                    <textarea id="comment" name="comment" className='bg-lightBackground rounded-md px-2 py-1 ml-2 h-[32px] w-[calc(100%-30px)]' placeholder="Comment" rows={3} cols={40} />
                </div>

                <div className='mt-2 w-fit ml-auto'>
                    <button type='submit' className='rounded-full bg-primary text-sm px-4 py-2 hover:ring-4'>Comment</button>
                </div>
            </form>
        </>
    )
}

export default AddComment;