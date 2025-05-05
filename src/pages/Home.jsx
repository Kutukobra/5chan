import PostGrid from "../components/Post";
import axios from "axios";
import { useState, useEffect } from "react";
import NewPost from "../components/NewPost";
import Popup from "reactjs-popup";

function Home() {

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const response = await axios.get("/post");
        setPosts(response.data.payload);
    };

    useEffect(() => {
        getPosts();
    }, []);
    
    return (
        <div >
            <header className="bg-green-500 sticky top-0 flex justify-center">
                <Popup trigger={<button className="bg-green-200 m-2 p-2 cursor-pointer">
                    Create Post
                </button>}>
                    <NewPost />
                </Popup>
                
            </header>
            <PostGrid 
                posts={posts}
            />
        </div>
    )
}

export default Home;