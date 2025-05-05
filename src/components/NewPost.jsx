import axios from "axios";
import { useState } from "react";

function NewPost({parent}) {
    console.log(parent);
    const [image, setImage] = useState(null);
    const [content, setContent] = useState("");

    const onFileChange = (event) => {
        console.log(event.target.files);
        setImage(event.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (content != null) {
            formData.append(
                "content",
                content
            )
        }

        if (parent != null) {
            formData.append(
                "parent_id",
                parent
            )
        }

        if (image != null) {
            formData.append(
                "file",
                image
            )
        }

        console.log(formData);
        axios.post("/post/create", formData)
            .then(response => {
                location.reload();
            })
        
    }


    return (
        <form className="
                flex flex-col items-center justify-center
                text-white
                w-50 h-50
                bg-green-800
            "
            onkeydown="if(event.keyCode === 13) ;"
        >
            <input 
                className="
                    text-black
                    static
                    h-5/7
                    w-auto
                    bg-green-200
                "
                type="text" 
                onChange={({target}) => setContent(target.value)}
            />
            <input 
                className="
                    bg-white
                    text-black
                    w-1/2 static
                    mt-3
                "
                type="file" 
                name="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={onFileChange}
            />
            <button onClick={handleSubmit}
                    className="
                    bg-green-900
                    border-black
                    border-2    
                    text-white
                    w-1/2 static
                    m-2
                "
            >
                Post
            </button>
        </form>
    )
}

export default NewPost;