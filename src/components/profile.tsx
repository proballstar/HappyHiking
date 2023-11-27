import { UserButton, SignInButton } from "@clerk/nextjs"

function SB() {
    return (
       <SignInButton mode="modal" />
    )
}
function UB() {
    return (
        <div className="flex justify-center">
            <UserButton />
        </div>
    )
}

export default function ProfileButton({ isSignedIn }: { isSignedIn: boolean | undefined }) {
    return (
        <div className="mt-auto mb-auto">
            {!isSignedIn && <SB />}
            {!!isSignedIn && <UB />}
        </div>
    )
}