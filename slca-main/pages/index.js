import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightOnRectangleIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import { InstagramEmbed } from 'react-social-media-embed';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Home() {

    const router = useRouter();

    const { data: session, status } = useSession()


    if (status === "loading") {
        console.log("yuh")
        return <div></div>
      }
    
      if (status === "authenticated") {
        console.log("hello")
        router.push("/player")
      }
  return (
    <div>
      <Head>
        <title>Student Led Chess Association</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=''>

        <div className=''>
          <div className='flex bg-black space-x-16 py-16 px-16 items-center'>
            <Image src = "/slca_logo.png" height = {300} width = {496} />
            <div className=''>
              <h1 className='text-6xl font-bold text-white mb-8'> Using chess to make a <span className='  text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>difference.</span></h1>
              <div className='flex space-x-4'>
                <Link href = "/login">
                <button className='bg-white rounded-lg text-xl font-bold p-2 flex space-x-2 items-center text-purple-500'>
                  <ArrowRightOnRectangleIcon className="h-6 w-6 "/>
                  <p>Login</p>
                </button>
                </Link>
                <Link href = "/signup">
                  <button className='bg-purple-500 rounded-lg text-xl font-bold p-2 flex space-x-2 items-center text-white'>
                    <PlusCircleIcon className="h-6 w-6 "/>
                    <p>Create an Account</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className = "px-16">
            <h1 className='text-white font-bold text-3xl mt-4 text-blue-500 pb-4'>News.</h1>
            <div className='flex space-x-16'>
              <InstagramEmbed url="https://www.instagram.com/p/Ciq9pU5ugCX/" width={328} />
              <InstagramEmbed url="https://www.instagram.com/p/Ci8mOiprpEa/" width={328} />
              <InstagramEmbed url="https://www.instagram.com/p/CmsqincrM_t/" width={328} />
            </div>
          </div>
          <div className='px-16 bg-black pb-12 pt-4'>
            <h1 className='text-white font-bold text-3xl mt-4 text-white pb-4'>Contact.</h1>
            <div className=' text-white space-y-2'>
              <p><span className='font-bold text-green-500'>General Inquires: </span> <a href = "mailto:contact@studentledca.org" className='underline'>contact@studentledca.org</a></p>
              <p><span className='font-bold text-purple-500'>Affiliate with SLCA: </span> <a href = "mailto:ourreach@studentledca.org" className='underline'>outreach@studentledca.org</a></p>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  )
}