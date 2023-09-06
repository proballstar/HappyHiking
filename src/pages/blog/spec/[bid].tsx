/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useRouter, NextRouter } from "next/router";
import { api } from "~/utils/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import type { RouterOutputs } from "~/utils/api";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { LoadingPage } from "~/components/loading";


type Comment = RouterOutputs["blog"]["retrieve"][number]["Comments"][number]

export default function SpecificBlog() {
    const router: NextRouter = useRouter();
    const { user } = useUser();
    const { bid } = router.query;

    const [comment, setComment] = React.useState("")

    const { data, isLoading } = api.blog.findOne.useQuery({ id: parseInt(bid as string) });
    const { mutate, isLoading: commentLoading } = api.blog.comment.useMutation();

    function handleComment() {
        mutate({
            message: comment,
            blog_id: parseInt(bid as string),
            email: user!.primaryEmailAddress!.emailAddress
        })
    }

    if(isLoading) return <LoadingPage />
    if(!data) return <div>Something went wrong</div>

    return (
        <div>
            <div className="flex flex-col">
                <h1 className="font-bold text-2xl">{data?.title}</h1>
                <p className="font-semibold text-xl">{data?.main_topic}</p>
                <p>{data?.desc}</p>
            </div>
            <div>
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkDirective]} children={data?.content!} />
            </div>
            <div className="flex flex-col">
                <h2>Comments</h2>
                <div className="flex flex-col">
                    <label className="font-semibold text-2xl">Message:</label>
                    <input 
                        placeholder='Comment here...' 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setComment(event.target.value)}
                        value={comment}
                        className="px-5 py-2 rounded-md border border-blue-500"
                    />
                    <button onClick={() => handleComment()} className="px-5 py-2 rounded-md border border-green-500">
                        {commentLoading ? "Loading..." : "Comment"}
                    </button>
                </div>
                {data?.Comments.map((comment: Comment) => {
                    const fullName = `${comment.Person?.fname} ${comment.Person?.lname}`
                    return (
                        <div key={`Comment-${comment.comment_id_}`}>
                            <div>
                                <h1>{fullName}</h1>
                            </div>
                            <p>{comment.message}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )


}