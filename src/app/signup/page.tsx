"use client";

import { Button } from "../../components/ui/button";
import Image from "next/image";
import { GoogleLogo } from "@/assets/images"; // Import Google logo from assets
import Link from "next/link";

export default function SignupPage() {

  const handleGoogleLogin = () => {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${apiBase}/auth/google`;
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-foreground p-5">
      <div className="flex flex-col w-full max-w-[80%] h-[60vh] bg-card absolute rounded-xl shadow-lg p-6 justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-white  mb-3 sm:mb-6">Sign In to Pamas Ai</h2>

        {/* Redirect to backend Google OAuth */}
        {/* <Link href={process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/google'}> */}
          <Button
            className="w-full bg-primary text-sm sm:text-xl hover:bg-primary/80 text-white font-bold py-5 px-4 rounded-xl mt-4"
         onClick={handleGoogleLogin}
         >
            <Image src={GoogleLogo} alt="Google Logo" width={20} height={20} />
            Continue with Google
          </Button>
        {/* </Link> */}

        <p className="text-sm text-gray-400 mt-4">
          To access your account, we’ll send you a secure sign-in link via email.
          You won’t need a password—just click the link, and you’ll be logged in instantly.
          <br />
          <span className="text-sm text-primary mt-4">
            Link expires in 15 minutes for your security.
          </span>
        </p>

        <p className="text-sm text-gray-400 mt-2">
          New to Pamas Ai? No problem! We’ll automatically create an account for you the first time you sign in with Google.
        </p>
      </div>
    </div>
  );
}