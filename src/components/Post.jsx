import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import NewPost from "./NewPost";
import axios from "axios";
import Timestamp from "react-timestamp";
import Autolink from "react-autolink-text2"

function PostGrid({posts}) {

    return (
        <main className='bg-green-300 w-screen min-h-screen absolute flex flex-col items-center justify-center'>
            {
                posts.map((post) => {
                    return (
                        <Post 
                            key={post.id}
                            post_id={post.id}
                            content={post.content}
                            image={post.image_url}
                            created_at={post.created_at}
                            parent_id={post.parent_id}
                            creator_id={post.creator_id}
                        />
                    )
                })
            }
        </main>
    )
}

function Post({post_id, content, image, creator_id, created_at}) {
    const [user, setUser] = useState({});

    const [replies, setReplies] = useState([]);

    const getReplies = async () => {
        const response = await axios.get(`/post/${post_id}`);
        setReplies(response.data.payload);
    };

    useEffect(() => {
        getReplies();
    }, []);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, []);

    return (
        <>
        <section className="
                    relative
                    content-center
                    w-full sm:w-2/3
                    p-2 m-0.2 rounded-md
                    bg-green-200 border-1 border-green-500
        ">
            <div className="relative my-2">
                <span className="text-blue-900 border-1 p-1 rounded-md">
                    {"Anonymous"}
                    {
                        <Timestamp relative date={created_at}
                            className="text-gray-500 m-2"
                        />
                        
                    }
                {
                    creator_id == user?.id &&
                    <button className="absolute right-2 text-red-500">
                        Delete
                    </button>
                }
                </span>
            </div>
            <div className="relative h-full p-1">
                {image && <img src={image} className="float-left max-h-100 max-w-1/3 m-0.5 hover:max-h-full hover:max-w-full hover:w-1/2 hover:position-absolute"/>}
                <Autolink className="p-0 text-black text-md whitespace-pre-line overflow-x-hidden overflow-y-auto min-h-5 max-h-100"
                    text={content}
                    linkProps={{target: '_blank'}}
                    
                />
                {
                replies.map((post) => {
                    if (!post || !post.id) return null;
                    return (
                        <Post 
                            key={post.id}
                            post_id={post.id}
                            content={post.content}
                            image={post.image_url}
                            created_at={post.created_at}
                            parent_id={post.parent_id}
                            creator_id={post.creator_id}
                        />
                    )
                })
            }
            </div>
            <Popup 
                trigger= {
                    <button className="relative bg-green-300 m-1 p-0.5 border-green-600 border-1 text-green-900 hover:bg-green-100 hover:cursor-pointer">
                        Reply
                    </button>
                    
                }
                position="bottom left"
            >
                    <NewPost 
                        parent={post_id}
                    />
            </Popup>
            
        </section>
        </>
    )
}


export default PostGrid;