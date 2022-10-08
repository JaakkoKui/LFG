import React from "react"
import Posts from "./Posts";

const HomePage: React.FC = () => {
    return (
        <div className='bg-darkBackground min-h-[calc(100vh-65px)]  p-10 text-gray-200'>
            <div className='font-bold text-3xl pb-7 flex w-full'>
                <h1>Posts</h1>
                <hr className='border-2 border-gray-300 w-full mt-5 mx-5 rounded-md'></hr>
            </div>
            <Posts currentUser={undefined} />
        </div>
    )
}

export default HomePage;