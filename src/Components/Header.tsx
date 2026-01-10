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
        <div className="w-full h-full p-5 sm:p-10">
            <div className="w-full h-full flex justify-between sm:px-20 items-center">
                {/* Left Side */}
                <div className="flex items-center gap-2 dark:text-white text-black cursor-pointer">
                    <Box className="sm:scale-125 cursor-pointer" />
                    <h1
                        className="sm:text-3xl text-xl font-bold"
                        style={{ fontFamily: '"Manrope", sans-serif' }}
                    >
                        Orbix
                    </h1>

                    <div className="flex justify-center text-xs sm:text-[12px]">
                        <span className="rounded-full bg-primary/10 dark:bg-[#202223] border border-primary/50 dark:border-[#828181] px-2">v1.3</span>
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