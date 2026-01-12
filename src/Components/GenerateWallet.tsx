import React from 'react'

const GenerateWallet = () => {
    return (
        <div className="h-full w-full flex mt-20" style={{ fontFamily: '"Manrope", sans-serif' }}>

            <div className="flex flex-col gap-2">
                <h1 className="m-0 tracking-tighter text-black dark:text-white text-4xl md:text-5xl font-bold">
                    Secret Recovery Phrase
                </h1>

                <span className="m-0 sm:text-xl tracking-normal font-semibold dark:text-white/80 text-gray-600">
                    Save these words in a safe place.
                </span>

                <div className='flex gap-3 mt-2 items-center sm:flex-row flex-col'>

                    <input
                        type="password"
                        className="sm:w-[1120px] w-full rounded-md border border-gray-400 py-2 px-3 
             transition-all duration-300  text-sm
             focus:outline-none dark:text-white/80 dark:focus:border-white dark:focus:ring-white focus:border-black focus:ring-1 focus:ring-black"
                        placeholder="Enter your secret phrase (or leave blank to generate)"
                    />


                    <div className='bg-black w-full sm:w-fit dark:text-black font-semibold text-[12px] dark:hover:bg-white/80 dark:bg-white hover:bg-black/80 items-center justify-center flex cursor-pointer text-white py-3 px-5 rounded-md'>
                        <button className='cursor-pointer'>Generate Wallet</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default GenerateWallet


