import Image from "next/image";

import AuthFormContainer from "@/components/containers/AuthFormContainer";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
     
        {/* Auth Component (Handles Login & Reset Password) */}
        <AuthFormContainer />

       
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      
        <a className="flex items-center gap-2 hover:underline" href="https://nextjs.org">
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to MetaFlow.Com →
        </a>
      </footer>
    </div>
  );
}
