import { Check, ChevronDown, ChevronUp, CircleCheck, Copy } from 'lucide-react'
import React, { useState } from 'react'
import { generateMnemonic, validateMnemonic } from "bip39";


const SecretPhrase = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [mnemonicWords, setMnemonicWords] = useState<string[]>([...Array(12).fill(""),]);


    const words: string[] = [
        "crumble",
        "apple",
        "river",
        "shadow",
        "planet",
        "silver",
        "forest",
        "tiger",
        "stone",
        "cloud",
        "future",
        "light",
    ];

    const handleCopyAll = (): void => {
        const phrase = words.join(" ");
        navigator.clipboard.writeText(phrase);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000)
    };

    const generateRandom = async () => {
        const words = generateMnemonic(mnemonicWords.length === 12 ? 128 : 256); setMnemonicWords(words.split(" "));
    }

    return (
        <div className='w-full h-full p-5' style={{ fontFamily: '"Manrope", sans-serif' }}>
            <div>
                {/* Container */}
                <div className='w-full border border-neutral-200 rounded-md overflow-hidden transition-all duration-300'>

                    {/* Title */}

                    <div className='p-8 flex justify-between items-center cursor-pointer'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div>
                            <h1 className='text-3xl font-bold leading-tight'>
                                Your Secret Phrase
                            </h1>
                        </div>
                        <div className="hover:bg-gray-100 w-10 h-10 flex items-center justify-center transition-all duration-300 ease-in-out rounded-md">
                            {isOpen ? <ChevronUp /> : <ChevronDown />}
                        </div>
                    </div>

                    {/* Phrase */}

                    <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>

                        <div className='px-8 mt-5 pb-8'>

                            <div className='grid grid-cols-4 gap-4'>

                                {mnemonicWords.map((word: string, index: number) =>
                                    <div
                                        key={index}
                                        onClick={handleCopyAll}
                                        className="bg-gray-100 p-3 py-4 rounded-md  text-lg font-medium cursor-pointer hover:bg-gray-200 transition select-none"
                                    >
                                        {word}
                                    </div>

                                )}

                            </div>

                            <div className='flex justify-between items-center mt-8 '>

                                <p className='text-sm text-gray-500 flex items-center gap-2'>
                                    <button
                                        onClick={handleCopyAll}
                                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer transition"
                                    >
                                        <Copy className="cursor-pointer" size={16} />
                                        Click AnyWhere To Copy
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`fixed bottom-8 right-8 z-50 transform transition-all duration-300 ease-out
                                ${copied ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"}`}
                    >
                        <div className="bg-white w-[300px] border border-gray-200 shadow-lg rounded-md px-4 py-3 flex items-center gap-2 text-sm font-semibold">
                            <CircleCheck className="" size={18} />
                            Copied to clipboard!
                        </div>
                    </div>

                </div>

            </div>
        </div >
    )
}

export default SecretPhrase