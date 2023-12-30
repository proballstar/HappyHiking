import { useUser } from "@clerk/nextjs";
import ProfileButton from "~/components/profile";
import { useRouter } from "next/navigation";

export default function RedesignedHeader() {
  const user = useUser();
  const router = useRouter();

  return (
    <div className="flex flex-row justify-around px-6 py-4">
      <div className="mr-auto flex flex-row pl-5">
        <button
          onClick={() => router.push("/")}
          className="text-[1.5rem] font-bold text-green-700"
        >
          Happy Hiking
        </button>
      </div>
      <div className="ml-auto flex flex-row space-x-5 pr-5">
        <button onClick={() => router.push("/")} className="text-[1.15rem]">
          Feed
        </button>
        <button
          onClick={() => router.push("/create")}
          className="rounded-full bg-green-700 px-5 py-1 text-[1.15rem] text-white"
        >
          Create
        </button>
        <ProfileButton isSignedIn={user.isSignedIn} />
      </div>
    </div>
  );
}
