import LoginForm from "@/components/LoginForm";
import { LockKeyholeIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto mt-[25vh] bg-[#282c34] w-96 h-fit rounded-3xl pb-16">
      <LockKeyholeIcon className="m-auto w-20 h-auto text-[#005ce4] pt-20 text-4xl" />
      <h1 className="text-4xl font-bold text-white m-auto w-fit pt-6">
        Finance Manager
      </h1>
      <LoginForm />
    </div>
  )
}
