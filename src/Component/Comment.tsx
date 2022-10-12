import React from "react";
import { getComments } from "../services/commentService";
import { getPosts } from "../services/postService";
import { getProfiles } from "../services/profileService";
import { useStateValue } from "../state/state";
import { Comments, Post, ProfileModel } from "../types";
import AddComment from "./AddComment";

interface Props {
    post: Post;
}

const Comment: React.FC<Props> = ({ post }) => {
    const [{ comment,profile,email }, dispatch] = useStateValue();
    const [newComment, setForm] = React.useState<boolean>(true);
    const [showComments, commentArea] = React.useState<boolean>(false);

    const addComment = () => {
        setForm(!newComment)
    }

    const toggleComments = () => {
        commentArea(!showComments)
    }

    React.useEffect(() => {
        getProfiles().then(data => {

            const profiles: ProfileModel[] = data as ProfileModel[];
            dispatch({ type: "GET_PROFILES", payload: profiles });
        });

        getPosts().then(post => {
            const posts: Post[] = post as Post[];
            posts.sort((a, b) => Number(b.PostId) - Number(a.PostId));
            dispatch({ type: "GET_POSTS", payload: posts });
        });

        getComments().then(comment => {
            const comments: Comments[] = comment as Comments[];
            comments.map(comment => {
                comment.Date = comment.Date.replace("T", " | ");
            })
            dispatch({type: "GET_COMMENTS", payload: comments})
        });

    }, [dispatch]);
 
    const comments = Object.values(comment).filter(comm => Number(comm.PostId) === Number(post.PostId));
    const currentUser = Object.values(profile).find(prof => prof.Email === email) as ProfileModel;

    return (
        <>
            <div>
                <div className='flex'>
                    {!showComments &&
                        <button onClick={toggleComments} className='font-semibold text-gray-400 mb-1.5'>Show {comments.length} Comments</button>
                    }
                    {showComments &&
                        <button onClick={toggleComments}  className='font-semibold text-gray-400'>Hide Comments</button>
                    }
                </div>
            </div>
            {showComments &&
                <div className='ml-10 h-fit'>
                    <AddComment currentUser={currentUser} thisPost={post} toggleForm={addComment} />

                    {comments.map(comment =>
                        <div key={comment.Id} className='my-5 w-1/2 flex'>
                            <img className='h-[35px] mt-1 object-contain rounded-full' src={'/images/DefaultAvatars/' + currentUser.Nickname + '.png'} alt='logo' />
                            <div>
                                <div className='flex'>
                                    <h4 className='font-bold h-fit ml-[7px]'>{Object.values(profile).find(prof => Number(prof.ProfileId) === Number(comment.CommentingProfile))?.Nickname}</h4>
                                    <h6 className='italic text-xs font-semobold mt-1 ml-2'>({comment.Date})</h6>
                                </div>
                                <div>
                                <p className='ml-[7px]'>
                                    {comment.CommentContent}
                                </p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            }
        </>
    )
}

export default Comment;