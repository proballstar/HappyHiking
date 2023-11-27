import { useUser } from "@clerk/nextjs";
import ProfileButton from "~/components/profile";

export default function RedesignedHeader() {
    
    const user = useUser();

    return (
        <div className="flex flex-row justify-around px-6 py-4">
                <div className="flex flex-row mr-auto pl-5">
                    <button className="text-[1.15rem]">Happy Hiking</button>
                </div>
                <div className="flex space-x-5 flex-row ml-auto pr-5">
                    <button className="text-[1.15rem]">Feed</button>
                    <button className="text-[1.15rem] px-5 py-1 bg-green-700 rounded-full text-white">Create</button>
                    <ProfileButton isSignedIn={user.isSignedIn} />
                </div>
        </div>
    )
}