import { useState, useEffect } from "react";

function PostGrid({posts}) {

    return (
        <main className='bg-green-200 w-screen min-h-screen absolute flex flex-col items-center justify-center'>
            {
                posts.map((post) => {
                    return (
                        <Post 
                            key={post.id}
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

function Post({content, image, creator_id, created_at, parent_id}) {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, []);

    return (
        <>
        <section className="
                    relative
                    content-center
                    w-full sm:w-2/3 h-full
                    p-2 m-1 
                    bg-green-400 border-1 border-green-500
        ">
            <div className="relative my-2">
                <span className="text-blue-900">
                    {creator_id != "00000000-0000-0000-0000-000000000000"? creator_id : "Anonymous"}
                {
                    creator_id == user.id &&
                    <button className="absolute right-2 text-red-500">
                        Delete
                    </button>
                }
                </span>
            </div>
            <div className="relative h-full">
                {image && <img src={image} className="float-left w-1/3 m-1"/>}
                <p className="mx-2 text-black text-md">{content}</p>
            </div>
            <button className="relative bg-green-300 m-1 p-1 border-black border-1 text-blue-900 hover:bg-green-200 hover:cursor-pointer">
                Reply
            </button>
        </section>
        </>
    )
}


export default PostGrid;