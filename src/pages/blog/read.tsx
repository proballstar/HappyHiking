/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { LoadingPage } from "~/components/loading"
import { api } from "~/utils/api"
import { NextRouter, useRouter } from "next/router"
import { getAnalytics, logEvent } from "firebase/analytics"

function Feed() {
    
    const { data, isLoading } = api.blog.retrieve.useQuery()
    const router: NextRouter = useRouter()

    if(!data) return <div>Something went wrong</div>

    if(isLoading) return <LoadingPage />

    function changePage(id: number) {
        logEvent(getAnalytics(), "moving_to_spec", {
            page_id: id
        })
        void router.push(`/blog/spec/${id}`)
            .then((_) => console.log("Changed page"))
    }

    return (
        <div className="flex flex-col">
            {data.map((i, k) => {
                const fullName = `${i.Person!.fname!} ${i.Person!.lname!}`
                return (
                    <button className="flex flex-col" key={`blog-site-${k}`} onClick={() => changePage(i.blog_id)}>
                        <h2>{i.title} by {fullName}</h2>
                        <p>{i.desc}</p>
                    </button>
                )
            })}
        </div>
    )
}

export default function ReadPage() {

    api.blog.retrieve.useQuery()

    return (
        <div>
            <h1>Read</h1>
            <Feed />
        </div>
    )
}