import React from "react";
import { useStateValue } from "../state/state";
import { Post, ProfileModel } from "../types";
import AddComment from "./AddComment";

interface Props {
    post: Post;
}

const Comment: React.FC<Props> = ({ post }) => {
    const [{ comment,profile,email }] = useStateValue();
    const [newComment, setForm] = React.useState<boolean>(false);

    const addComment = () => {
        setForm(!newComment)
    }

    const comments = Object.values(comment).filter(comm => Number(comm.PostId) === Number(post.PostId));
    const currentUser = Object.values(profile).find(prof => prof.Email === email) as ProfileModel;

    return (
        <>
            <div>
                <button onClick={addComment}>Comment</button>
                {newComment && <AddComment currentUser={currentUser} thisPost={post} toggleForm={addComment} />}
            </div>
            <ul>
                {comments.map(comment =>
                    <li key={comment.Id}>
                        <p>
                            {comment.CommentContent}
                        </p>
                        <div>
                            Comment by {Object.values(profile).find(prof => Number(prof.ProfileId) === Number(comment.CommentingProfile))?.Nickname}
                        </div>
                    </li>)}
            </ul>
        </>
    )
}

export default Comment;