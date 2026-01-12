import React, { useState } from 'react'
import GenerateWallet from './GenerateWallet';

const Startup = () => {

    type ChainType = "solana" | "ethereum" | null
    const [selectedChain, setSelectedChain] = useState<ChainType>(null);
    return (
        <>
            {!selectedChain && (
                <div className="h-full w-full flex mt-15 sm:mt-20 animate-slideIn" style={{ fontFamily: '"Manrope", sans-serif' }}>
                    <div className="flex flex-col gap-2">
                        <h1 className="m-0 tracking-tighter text-black dark:text-white text-4xl md:text-5xl font-bold">
                            Orbix supports multiple blockchains
                        </h1>

                        <span className="m-0 text-xl tracking-normal font-semibold dark:text-white/80 text-gray-600">
                            Choose a blockchain to get Started
                        </span>

                        <div className='flex gap-2 mt-2'>
                            <div className='bg-black dark:text-black font-semibold dark:hover:bg-white/80 dark:bg-white hover:bg-black/80  cursor-pointer  text-white py-3 px-5 rounded-md'>
                                <button className='cursor-pointer' onClick={() => setSelectedChain("solana")} >Solana</button>
                            </div>
                            <div className='bg-black dark:text-black font-semibold dark:hover:bg-white/80 dark:bg-white hover:bg-black/80 cursor-pointer text-white py-3 px-5 rounded-md'>
                                <button className='cursor-pointer' onClick={() => setSelectedChain("ethereum")} >Ethereum</button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
            {selectedChain && (
                <div className='animate-slideIn'>
                    <GenerateWallet />
                </div>
            )}
        </>


    )
}

export default Startup