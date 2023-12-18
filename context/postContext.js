import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const PostContext = createContext();

const PostProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState([]);

    const getAllPost = async () => {
        setLoading(true);
        try {

            const { data } = await axios.get('/post/getAllPosts');
            setLoading(false);
            //console.log("Data is:", data?.post.length);
            setPost(data?.post);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllPost();
    }, []);


    return (
        <PostContext.Provider value={[post, setPost, getAllPost, loading]} >
            {children}
        </PostContext.Provider>
    );
};

export { PostContext, PostProvider };
