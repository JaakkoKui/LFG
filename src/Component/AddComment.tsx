import React from "react";
import { addComment } from "../services/commentService";
import { useStateValue } from "../state/state";
import { Comment, Post, ProfileModel } from "../types";

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

        const newComment: Comment = {
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                    Comment: <textarea id="comment" name="comment" placeholder="Comment" rows={3} cols={40} />
                </label>
                </div>

                <div>
                    <button type="submit" >Comment this post</button>
                    <div><button onSubmit={handleCancel}>Cancel</button></div>
                </div>
            </form>
        </>
    )
}

export default AddComment;