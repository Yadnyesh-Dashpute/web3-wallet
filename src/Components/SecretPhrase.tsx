import { Check, ChevronDown, ChevronUp, CircleCheck, Copy, Eye, EyeOff } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

const SecretPhrase = ({ onReset }: { onReset: () => void }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [words, setWords] = useState<string[]>([]);
    const [counter, setCounter] = useState(1);
    const [newWallets, setNewWallets] = useState<{ index: number, publicKey: string, privateKey: string }[]>([]);
    const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);


    useEffect(() => {
        const storedCounter = localStorage.getItem("counter");
        const storedWallets = localStorage.getItem("wallets");

        if (storedCounter) {
            setCounter(Number(storedCounter));
        }

        if (storedWallets) {
            setNewWallets(JSON.parse(storedWallets))
        }
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem("counter", counter.toString());
        localStorage.setItem("wallets", JSON.stringify(newWallets));
    }, [counter, newWallets, isHydrated]);

    const handleCreate = () => {
        const newIndex = counter;

        const stored = localStorage.getItem("phrase");
        if (!stored) {
            console.log("No mnemonic found in localStorage");
            return;
        }

        const parsed = JSON.parse(stored);

        if (
            !Array.isArray(parsed) ||
            !(parsed.length === 12 || parsed.length === 24) &&
            !parsed.some(word => word.trim() !== "")) {
            console.log("Invalid mnemonic format");
            return;
        }

        const mnemonic = parsed.join(" ");
        const seed = mnemonicToSeedSync(mnemonic);

        const path = `m/44'/501'/${newIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const keypair = Keypair.fromSecretKey(
            nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
        );
        const publicKey = keypair.publicKey.toBase58();
        const privateKey = bs58.encode(keypair.secretKey);

        const newWallet = {
            index: newIndex,
            publicKey,
            privateKey
        };

        setNewWallets((prev) => [...prev, newWallet]);
        setCounter((prev) => (prev + 1));

    }

    const handleDelete = () => {

        localStorage.removeItem('counter');
        localStorage.removeItem('phrase');
        localStorage.removeItem('wallets');
        setCounter(0);
        setNewWallets([]);
        setWords([]);
        setVisibleIndex(null);
        setIsHydrated(false);
        onReset();
    }


    useEffect(() => {
        const stored = localStorage.getItem("phrase");
        if (stored) {
            setWords(JSON.parse(stored));
        }
    }, [])


    const handleCopyAll = (): void => {
        const phrase = words.join(" ");
        navigator.clipboard.writeText(phrase);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000)
    };



    return (
        <div className='relative w-full h-full py-15  tracking-tighter' style={{ fontFamily: '"Manrope", sans-serif' }}>
            <div>
                {/* Container */}
                <div className='flex flex-col'>

                    <div className='w-full border border-neutral-200 rounded-md overflow-hidden transition-all duration-300'>

                        {/* Title */}

                        <div className=' relative p-8 flex justify-between items-center cursor-pointer'
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <div>
                                <h1 className='text-3xl font-bold leading-tight dark:text-white text-black'>
                                    Your Secret Phrase
                                </h1>
                            </div>
                            <div className="hover:bg-gray-100 dark:hover:bg-gray-100/20 dark:text-white text-black w-10 h-10 flex items-center justify-center transition-all duration-300 ease-in-out rounded-md">
                                {isOpen ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </div>

                        {/* Phrase */}


                        <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>

                            <div className='px-8 mt-5 pb-8'>

                                <div className='grid grid-cols-4 gap-4'>

                                    {words.map((word: string, index: number) =>
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
                    </div>
                    {/* Wallet */}

                    <div className="py-15 overflow-hidden">
                        <div className='flex justify-between'>
                            <div>
                                <h1 className='text-3xl font-extrabold leading-tight text-black dark:text-white'>
                                    Solana Wallet
                                </h1>
                            </div>
                            <div className='flex gap-2'>
                                <div className='bg-black w-full sm:w-fit dark:text-black font-semibold text-sm dark:hover:bg-white/80 dark:bg-white hover:bg-black/80 items-center justify-center flex cursor-pointer text-white py-3 px-5 rounded-md'>
                                    <button className='cursor-pointer' onClick={handleCreate}>Add Wallet</button>
                                </div>
                                <div className='bg-red-700 w-full sm:w-fit dark:text-black font-semibold text-sm hover:bg-red-500  items-center justify-center flex cursor-pointer text-white py-3 px-5 rounded-md'>
                                    <button className='cursor-pointer' onClick={handleDelete}>Clear Wallet</button>
                                </div>
                            </div>
                        </div>
                        {newWallets.map((w) =>

                            <div className='border border-gray-500 mt-5 rounded-2xl'>
                                <div className='px-8 py-5 mb-5'>
                                    <h3 className='font-semibold text-3xl text-black dark:text-white'>Wallet {w.index}</h3>
                                </div>
                                <div>
                                    <div className='px-8 flex flex-col py-5 rounded-2xl dark:bg-[#181818] bg-black/10' key={w.index}>
                                        <div className='flex flex-col mb-8'>
                                            <span className='font-bold text-[17px] text-black/90 dark:text-white'>Public Key</span>
                                            <span className='font-medium text-sm dark:text-white/60 mt-1 leading-relaxed tracking-normal'>{w.publicKey}</span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <div>
                                                <span className='font-bold text-[17px] dark:text-white'>Private Key</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className='font-medium text-sm dark:text-white/60 mt-1 '>{visibleIndex === w.index ? w.privateKey : "•".repeat(w.privateKey.length)}</span>

                                                <div className='flex'>
                                                    {visibleIndex === w.index ? (
                                                        <div className='w-8 h-8 hover:bg-gray-100 rounded-md  dark:hover:bg-gray-100/20 flex items-center justify-center'
                                                            onClick={() => setVisibleIndex(visibleIndex === w.index ? null : w.index)}

                                                        >
                                                            <EyeOff
                                                                className=" dark:text-white text-black scale-70 cursor-pointer "
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className='w-8 h-8 hover:bg-gray-100 rounded-md  dark:hover:bg-gray-100/20 flex items-center justify-center'>
                                                            <Eye
                                                                className=" dark:text-white text-black scale-70 cursor-pointer"
                                                                onClick={() => setVisibleIndex(visibleIndex === w.index ? null : w.index)}

                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>



                </div>

            </div>
            <div
                className={`absolute bottom-10 right-0 z-50 transform transition-all duration-300 ease-out
                                ${copied ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"}`}
            >
                <div className="bg-white w-[300px] border border-gray-200 shadow-lg rounded-md px-4 py-3 flex items-center gap-2 text-sm font-semibold">
                    <CircleCheck className="" size={18} />
                    Copied to clipboard!
                </div>
            </div>
        </div >
    )
}

export default SecretPhrase