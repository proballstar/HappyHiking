import { api } from "~/utils/api";
import RedesignedHeader from "./components/redesigned/header";
import PostFeeder from "./components/redesigned/post.feeder";

export default function Redesign() {

    const { data } = api.listings.getAll.useQuery()

    return (
        <div className="flex flex-col">
            {/* Header */}
            <RedesignedHeader />
            {/* Feed */}
            <PostFeeder />
        </div>
    )
}

