import { generateMnemonic } from 'bip39';
import React, { useEffect, useState } from 'react'
import SecretPhrase from './SecretPhrase';

const GenerateWallet = ({ onReset }: { onReset: () => void }) => {

    const [mnemonicWords, setMnemonicWords] = useState<string[]>([
        ...Array(12).fill(""),
    ]);
    const [secretPhrase, setSecretPhrase] = useState<string>("");
    const [error, setError] = useState<string>("");


    const onPaste = (e: any) => {
        const pastedText = e.clipboardData.getData("text");
        const words = pastedText.trim().split(" ");
        if (words.length === 12 || words.length === 24) {
            e.preventDefault();
            setMnemonicWords(words);
            setSecretPhrase(pastedText);
        }
    }

    useEffect(() => {
        if (!secretPhrase.trim()) {
            return;
        }

        const words = secretPhrase.trim().split(/\s+/);
        if (words.length === 12 || words.length === 24) {
            setMnemonicWords(words);
            setError("");
        } else {
        }
    }, [secretPhrase]);

    const generateRandom = async () => {
        const mnemonic = generateMnemonic(128);
        const words = mnemonic.split(" ");

        setMnemonicWords(words);
        setSecretPhrase(mnemonic);
        setError("");
    }

    const handleGenerate = () => {
        if (!secretPhrase.trim()) {
            generateRandom();
            return;
        }
        const words = secretPhrase.trim().split(/\s+/);
        if (words.length !== 12 && words.length !== 24) {
            setError("Invalid recovery phrase. Must be 12 or 24 words.");
            return;
        }
        setError("");
    }

    useEffect(() => {
        if (mnemonicWords.some(word => word.trim() !== "")) {
            localStorage.setItem('phrase', JSON.stringify(mnemonicWords));
        }
    }, [mnemonicWords]);


    useEffect(() => {
        const stored = localStorage.getItem("phrase");

        if (stored) {
            const parsed = JSON.parse(stored);

            if (
                Array.isArray(parsed) &&
                (parsed.length === 12 || parsed.length === 24) &&
                parsed.some(word => word.trim() !== "")
            ) {
                setMnemonicWords(parsed);
                setSecretPhrase(parsed.join(" "));
            }
        }
    }, []);


    const hasMnemonic = mnemonicWords.some(word => word.trim() !== "");


    return (
        <>

            {!hasMnemonic && (
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
                                value={secretPhrase}
                                onChange={(e) => setSecretPhrase(e.target.value)}
                                type="password"
                                onPaste={onPaste}
                                className="sm:w-[1120px] w-full rounded-md border border-gray-400 py-2 px-3 
             transition-all duration-300  text-sm
             focus:outline-none dark:text-white/80 dark:focus:border-white dark:focus:ring-white focus:border-black focus:ring-1 focus:ring-black"
                                placeholder="Enter your secret phrase (or leave blank to generate)"
                            />


                            <div className='bg-black w-full sm:w-fit dark:text-black font-semibold text-[12px] dark:hover:bg-white/80 dark:bg-white hover:bg-black/80 items-center justify-center flex cursor-pointer text-white py-3 px-5 rounded-md'>
                                <button onClick={handleGenerate} className='cursor-pointer'>Generate Wallet</button>
                            </div>
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm mt-1">
                            {error}
                        </p>
                    )}
                </div>
            )}
            {hasMnemonic && (

                <div>
                    <SecretPhrase onReset={onReset} />
                </div>

            )}


        </>
    )
}

export default GenerateWallet


