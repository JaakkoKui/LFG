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
    const [,dispatch] = useStateValue();

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
            PhotoFileName: "jep"
        }

        editPost(updatedPost).then(mes => {
            console.log(mes)
            getPosts().then(post => {
                const posts: Post[] = post as Post[];
                posts.sort((a, b) => Number(b.PostId) - Number(a.PostId));
                dispatch({ type: "GET_POSTS", payload: posts });
        })});

        window.location.reload();
        toggleForm();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Title: <input name="title" id="title" defaultValue={currentPost.Title} placeholder="Title" />
                    </label>
                </div>
                <div>
                    <label>
                        Content: <textarea name="content" id="content" defaultValue={currentPost.Content} placeholder="Content" rows={4} cols={40}/>
                    </label>
                </div>
                <div>
                    <button type="submit">Edit post</button>
                </div>
            </form>
        </>
    )
}

export default EditPostForm;