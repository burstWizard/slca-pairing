import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from "next-auth/react"
import { ArrowLeftIcon, ArrowRightCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

export default function Signup() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid h-screen place-items-center bg-black ">
        
        <div className='border-2 border-white p-6'>
          <Image src="/slca_logo.png" height={150} width={248}/>
          <h1 className='text-2xl font-bold text-purple-500 mt-2 mb-4'>Login.</h1>
          <button onClick={() => signIn("google",  { callbackUrl: 'http://localhost:3000/player' })} className="flex items-center bg-blue-500 text-white font-bold rounded-lg p-2">
            <ArrowRightCircleIcon className='h-5 w-5 mr-2'/>
            <p>Sign up with Google</p>
          </button>
          <Link href = "/" >
            <div className='text-white font-bold mt-4 flex space-x-2 items-center cursor-pointer'>
              <ArrowLeftIcon className='h-5 w-5'/>
              <p>Back Home</p>
            </div>
          </Link>
        </div>
      </div>

    </div>
  )
}
