"use client"
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const Context = () => {
    const router = useRouter();

    return (
        <>
        <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{duration:0.5,ease:"easeInOut"}}
         className="w-full h-auto mt-16 bg-gray-100 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-10 justify-center w-11/12 mx-auto">
            <div className="bg-white w-full lg:w-3/5 h-auto lg:h-[600px] flex flex-col justify-center p-8 rounded-xl shadow-lg border border-gray-200">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Ready Set Pack...
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Your ultimate travel companion for international trips. With ReadySetPack, you can easily plan and manage your travel experience. Get important information about your destination, such as weather updates, local customs, safety tips, and more. Start your journey with confidence by creating your personalized trip checklist!
              </p>
            </div>
            <div className="bg-white w-full lg:w-3/5 h-auto lg:h-[600px] flex flex-col justify-center p-8 gap-4 rounded-xl shadow-lg border border-gray-200">
              <button className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-all duration-300 text-lg">
                Learn More
              </button>
              <button 
                onClick={() => router.push('/sign-up')} 
                className="bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 transition-all duration-300 text-lg"
              >
                Create Account
              </button>
              <button 
                onClick={() => router.push('/login')}
                className="bg-orange-600 text-white py-3 px-8 rounded-md hover:bg-orange-700 transition-all duration-300 text-lg"
              >
                Login
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )
}