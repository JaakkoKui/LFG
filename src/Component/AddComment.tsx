import React from "react";
import { addComment, getComments } from "../services/commentService";
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
    
    const [{comment}, dispatch] = useStateValue();
    const [showCommentButton, commentButton] = React.useState<boolean>(false);
    const [textField, textFieldDispatch] = React.useState<string>("");

    const maxPostLenght = 500;
    
    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const date = new Date();
        date.setMilliseconds(0);
        date.setHours(date.getHours()+3);
        const Comment = e.currentTarget.elements.comment.value;
        
        const id:number = Object.values(comment).concat().pop()?.Id as number;
        

        const newComment: Comments = {
            Id: id+1,
            PostId: Number(thisPost.PostId),
            CommentContent: Comment,
            CommentingProfile: Number(currentUser.ProfileId),
            Date: date.toISOString().replace(".000Z", "")
        }
        addComment(newComment).then(mes => {
            console.log(mes);
            getComments().then(comment => {
                const comments:Comments[] = comment as Comments[]
                comments.map(comment => {
                    comment.Date = comment.Date.replace("T", " | ");
                })
                dispatch({type:"GET_COMMENTS", payload: comments})
            })
        });

        toggleForm();
        deactivateTextAreaChange();
        
    }

    const activateTextAreaChange = () => {
        commentButton(true);
    }

    const deactivateTextAreaChange = () => {
        textFieldDispatch("");
        commentButton(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='mt-5 w-[400px] mb-5'>
                <div className='flex h-fit'>
                    <div className='h-[35px] w-[35px] mb-2 bg-lightBackground object-contain rounded-full'></div>
                    <textarea id="comment" name="comment" onChange={(e) => textFieldDispatch(e.target.value)} value={textField} className='bg-lightBackground rounded-md h-fit px-2 py-1 ml-2 w-[calc(100%-30px)]' onFocus={activateTextAreaChange} placeholder="Comment" rows={1} cols={40} maxLength={maxPostLenght} />
                </div>

                <div className='w-fit ml-auto'>
                    {showCommentButton &&
                        <>
                            <button onClick={deactivateTextAreaChange} className='uppercase text-sm px-4 py-2 hover:text-white'>Cancel</button>
                            <button type='submit' className='uppercase rounded-full bg-primary text-sm px-4 py-2 hover:ring-4'>Comment</button>
                        </>
                    }
                </div>
            </form>
        </>
    )
}

export default AddComment;