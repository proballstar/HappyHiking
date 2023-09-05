/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { LoadingPage } from "~/components/loading"
import { api } from "~/utils/api"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";

function Feed() {
    
    const { data, isLoading } = api.blog.retrieve.useQuery()

    if(!data) return <div>Something went wrong</div>

    if(isLoading) return <LoadingPage />

    return (
        <div>
            {data.map((i, k) => {
                const fullName = `${i.Person!.fname!} ${i.Person!.lname!}`
                return (
                    <div key={`blog-site-${k}`}>
                        <h2>{i.title} by {fullName}</h2>
                        <p>{i.desc}</p>
                         <article className="content">
                                <ReactMarkdown remarkPlugins={[remarkGfm, remarkDirective]}>
                                    {i.content!}
                                </ReactMarkdown>
                        </article>
                    </div>
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