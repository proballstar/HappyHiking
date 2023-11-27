import { notFound, } from "next/navigation";
import PostFeed from "./post.feed";
import { api } from "~/utils/api";


export default function PostFeeder() {

    const { data, error, isLoading } = api.listings.getAll.useQuery()

    if(error) return <div className="p-12 text-red-500">Something went wrong</div>
    if(!data && isLoading) return <div className="p-12 text-xl mr-auto ml-auto mt-auto mb-auto">Loading...</div>
    if(!data && !isLoading) return notFound()

    return (
        <PostFeed feed={data} />
    )
}