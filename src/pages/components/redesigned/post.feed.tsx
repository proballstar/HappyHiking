import { RouterOutputs } from "~/utils/api";
import Post from "./post";

type PostWithUser = RouterOutputs["listings"]["getAll"][number]; 

export default function PostFeed({ feed }: { feed: PostWithUser[] }) {
    return (
        <div className="grid grid-cols-4 gap-5 p-8">
            {feed?.map((post) => {
                return (
                    <Post key={post.post.id} post={post} />
                )
            })}
        </div>
    
    )
}