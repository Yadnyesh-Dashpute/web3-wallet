import { Box, Moon, SunMedium } from "lucide-react"
import { useEffect, useState } from "react"


const Header = () => {

    const [isDark, setIsDark] = useState<boolean>(false);


    useEffect(() => {
        const theme = localStorage.getItem("theme");

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex justify-between items-center">
                {/* Left Side */}
                <div className="flex items-center gap-2 dark:text-white text-black cursor-pointer">
                    <Box className="scale-135 cursor-pointer" />
                    <h1
                        className="text-3xl font-extrabold"
                        style={{ fontFamily: '"Manrope", sans-serif' }}
                    >
                        Orbix
                    </h1>

                    <div className="flex justify-center text-xs sm:text-[14px]">
                        <span className="rounded-full bg-neutral-400/30 dark:bg-[#202223] border border-primary/50 dark:border-[#828181] px-2 py-[4px] font-bold">v1.3</span>
                    </div>
                </div>


                {/* Right Side */}

                <div className="flex sm:gap-3 gap-1 items-center">
                    <SunMedium className="dark:text-white text-black scale-80 sm:scale-none" />

                    <button
                        onClick={toggleTheme}
                        className="sm:w-10 w-8 h-5 cursor-pointer sm:h-6 flex items-center bg-black dark:bg-white rounded-full p-1 transition-all duration-300"
                    >
                        <div
                            className={`w-4 h-4 bg-white dark:bg-black  rounded-full shadow-md transform transition-all duration-300 ${isDark ? "sm:translate-x-4 translate-x-2" : "translate-x-0"}`}
                        >

                        </div>
                    </button>

                    <div className="dark:text-white text-black ">
                        <Moon className="scale-80 sm:scale-none" />
                    </div>

                </div>

            </div>


        </div>
    )
}

export default Header