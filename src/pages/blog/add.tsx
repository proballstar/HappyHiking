/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUser } from "@clerk/nextjs";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Dispatch, SetStateAction, useState } from "react";
import { ChangeEvent } from "react";
import Input from "~/components/input";
import { api } from "~/utils/api";

export default function AddPost() {
    const [title, setTitle] = useState("");
    const { user } = useUser();
    const [description, setDescription] = useState("");
    const [main_topic, setMainTopic]   = useState("");
    const [content, setContent] = useState("");
    const { mutate, isLoading } = api.blog.add.useMutation();

    function handleChange(e: ChangeEvent<HTMLInputElement>, set: Dispatch<SetStateAction<any>>) {
        set(e.target.value)
    }

    function handleFormSubmit() {
        if(user?.primaryEmailAddress?.emailAddress === undefined) return alert("Please update your email address to create a post")
        mutate({
            title: title,
            desc: description,
            tag: main_topic,
            content: content,
            email: user?.primaryEmailAddress.emailAddress
        })
        logEvent(getAnalytics(), "added_new_post")
    }

    return (
        <div className="flex flex-col p-5 bg-blue-300 w-screen">
            <Input 
                name="Title" 
                onChange={e => handleChange(e, setTitle)} 
                value={title} 
                placeholder="Enter the title of the post"
            />
            <Input 
                name="Description" 
                onChange={e => handleChange(e, setDescription)} 
                value={description} 
                placeholder="Enter the description of the post"
            />
            <Input 
                name="Main Topic" 
                onChange={e => handleChange(e, setMainTopic)} 
                value={main_topic}
                placeholder="Enter the main topic of the post"
            />
            <Input 
                name="Content (in Markdown)" 
                onChange={e => handleChange(e, setContent)} 
                value={content}
                placeholder="Enter the content of the post"
                method="textarea"
            />
            <button onClick={() => handleFormSubmit()} className="px-5 py-3 rounded-md border-2 border-black">
                {isLoading ? "Loading..." : "Submit"}
            </button>
        </div>
    )
}