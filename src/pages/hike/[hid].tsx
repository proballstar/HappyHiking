/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { LoadingPage } from "~/components/loading";
import Modal from "~/components/modal";
import { api } from "~/utils/api";
import Input from "~/components/input";
import Head from 'next/head'

export default function SpecificHikePage() {
    const router = useRouter()
    const { user } = useUser()
    const [modalOpen, setModalOpen] = React.useState(false)
    const hid = router.query.hid as string
    const { data, isLoading: postLoading } = api.listings.getPost.useQuery({ 
        id: hid
    })
    const [comments, setComments] = React.useState("")
    const { mutate, isLoading: joinLoading } = api.listings.joinEvent.useMutation();

    if(!data || postLoading ) return <LoadingPage />

    function joinEvent() {
        if(!user?.primaryEmailAddress?.emailAddress) return <div>Please update your email address to join this event</div>
        mutate({
            email: user.primaryEmailAddress?.emailAddress,
            event_id: hid,
            comment: comments
        })
        setComments("")
    }

    function modalClose() {
        setModalOpen(false)
        router.reload()
    }

    function route(url: string) {
        window.open(url, "_blank")
    }

    return (
        <>
            <Head>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5539865102402934"
     crossOrigin="anonymous"></script>
            </Head>
            <div className="flex flex-col px-10 py-4">
                <h1 className="text-4xl font-semibold capitalize">{data.post.name}</h1>
                <div className="flex flex-col py-3">
                    <p>Created by {`${data.author.firstName} ${data.author.lastName}`}</p>
                    <p>{data.post.desc}</p>
                    <p>{data.post.date?.toDateString()}</p>
                    <p>Number of attendees: {data.post.Attendees.length}</p>
                    <div>
                        <h2 className="font-semibold">Attendees</h2>
                        <div className="flex flex-col">
                            {data.post.Attendees.map((attendee) => {
                                const fullName = `${attendee.Person!.fname!} ${attendee.Person!.lname!}`
                                return (
                                    <div className="flex flex-row" key={`Attendee-${attendee.Person?.fname}-${attendee.Person?.lname}`}>
                                        {fullName}: {attendee.comment}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <a onClick={() => route(data?.post!.route)} className="flex justify-center px-6 py-2 border-2 border-slate-600 rounded-md">
                        Route
                    </a>
                    <button onClick={() => setModalOpen(true)} data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="px-6 py-2 bg-green-500 my-2 rounded-lg text-white">
                        Join Event
                    </button>
                    <Modal header="Join Event" sub_message={joinLoading ? "Loading..." : "Submit"} close={() => modalClose()} open={() => setModalOpen(true)} isOpen={modalOpen}>
                        <div className="p-4 flex flex-col">
                            <Input name="Comments" placeholder="Enter any comments here" value={comments} onChange={(e) => setComments(e.target.value)}  />
                            <button className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">
                                Submit
                            </button>
                        </div>
                    </Modal>
                </div>
                
            </div>
        </>
    )
}
