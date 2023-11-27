import { useRouter } from "next/navigation";
import { RouterOutputs } from "~/utils/api";

type PostWithUser = RouterOutputs["listings"]["getAll"][number]; 

export default function Post({ post }: { post: PostWithUser}) {

    const router = useRouter();

    return (
        <div onClick={() => router.push(`/hike/${post.post.id}`)} key={post.post.id} className="hover:cursor-pointer border-2 border-slate-200 rounded-lg shadow-md p-5">
            <h1 className="font-bold text-xl capitalize">{post.post.name}</h1>
            <h2 className="text-xs capitalize">Hosted by {post.author.firstName} {post.author.lastName}</h2>
            <h3 className="text-md my-2">{post.post.desc}</h3>
        </div>
    )
}