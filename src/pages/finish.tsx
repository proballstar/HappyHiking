import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { api } from '~/utils/api';
import { logEvent, getAnalytics } from 'firebase/analytics';

export default function Page() {

    const { user } = useUser();
    const router = useRouter()
    const { mutate, isLoading } = api.user.createUser.useMutation()

    const [numHours, setNumHours] = React.useState(0)
    const [about, setAbout] = React.useState("")

    function submit() {
        mutate({
            weekly_hours: numHours,
            about: about,
            email: user!.primaryEmailAddress!.emailAddress,
            fname: user!.firstName!,
            lname: user!.lastName!,
        })

        logEvent(getAnalytics(), "finish_registration")

        router.push('/')
    }

  return (
    <div>
        <h1>Finish registration</h1>
        <div>
            <UserButton />
            <form className='flex flex-col p-5'>
                <div className='flex flex-col p-3'>
                    <p className='font-semibold font-display'>Number of Hours Hiking per Week</p>
                    <input 
                        className='px-2 py-1 bg-white rounded-md border border-black' 
                        value={numHours}
                        onChange={(e) => setNumHours(parseInt(e.target.value))}
                    />
                </div>
                <div className='flex flex-col p-3'>
                    <p className='font-semibold font-display'>About You</p>
                    <textarea 
                        className='px-2 py-1 bg-white rounded-md border border-black' 
                        value={about} 
                        onChange={(e) => setAbout(e.target.value)}
                    />
                </div>               
                <button type="button" onClick={() => submit()}>
                    {isLoading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    </div>
  );
}