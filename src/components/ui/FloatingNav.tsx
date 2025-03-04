"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../../utils/cn";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";



export const FloatingNav = () => {
    const { scrollYProgress } = useScroll();
    const { data } = useSession();

    const [visible, setVisible] = useState(false);
    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                setVisible(false);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-10 py-5  items-center justify-center space-x-4 bg-black-100",
                )}
            >
                <Link
                    href={"/"}
                    className={cn(
                        "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                    )}
                >
                    <span className="block sm:hidden">Home</span>
                    <span className="text-sm !cursor-pointer">{"Home"}</span>
                </Link>

                {!data ? (
                    <>
                        <Link
                            href={"/sing-in"}
                            className={cn(
                                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                            )}
                        >
                            <span className="block sm:hidden">Login</span>
                            <span className="text-sm !cursor-pointer">{"Login"}</span>
                        </Link>
                        <Link
                            href={"/sign-up"}
                            className={cn(
                                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                            )}
                        >
                            <span className="block sm:hidden">Sign Up</span>
                            <span className="text-sm !cursor-pointer">{"Sign Up"}</span>
                        </Link>
                    </>

                ) : (
                    <>
                    <Link
                        href={"/app/allvideos"}
                        className={cn(
                            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                        )}
                    >
                        <span className="block sm:hidden">All Videos</span>
                        <span className="text-sm !cursor-pointer">{"All Videos"}</span>
                    </Link>
                    <Link
                        href={"/app/dashboard"}
                        className={cn(
                            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                        )}
                    >
                        <span className="block sm:hidden">Dashboard</span>
                        <span className="text-sm !cursor-pointer">{"Dashboard"}</span>
                    </Link>
                    <Link
                        href={"/"}
                        onClick={() => signOut()}
                        className={cn(
                            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                        )}
                    >
                        <span className="block sm:hidden">Sign Out</span>
                        <span className="text-sm !cursor-pointer">{"Sign Out"}</span>
                    </Link>
                    </>
                )}



            </motion.div>
        </AnimatePresence>
    );
};
