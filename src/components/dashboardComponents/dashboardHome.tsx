/* eslint-disable @typescript-eslint/no-explicit-any */


"use client"

import { fadeIn, staggerContainer } from "@/utils/motion"
import { motion } from "framer-motion"

export function DashboardHome({ data }: { data: any }) {
    const datas = data?.data

    return (
        <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-4 md:p-6"
        >
            <StatCard
                title="Total Blogs"
                value={datas?.totalBlog}
                index={0}
            />
            <StatCard
                title="Total Projects"
                value={datas?.totalProjects}
                index={1}
            />
            <StatCard
                title="Total Skills"
                value={datas?.totalSkills}
                index={2}
            />
            <StatCard
                title="Total Soft Skills"
                value={datas?.totalSoftSkills}
                index={3}
            />
            <StatCard
                title="Total Technical Skills"
                value={datas?.totalTacknicalSkills}
                index={4}
            />
        </motion.div>
    )
}

interface StatCardProps {
    title: string
    value: string
    index: number
}

function StatCard({ title, value, index }: StatCardProps) {
    return (
        <motion.div
            variants={fadeIn("up", "spring", index * 0.2, 0.75)}
            className="relative group"
        >
            <div className="
                relative overflow-hidden
                flex flex-col items-center justify-center
                p-6 sm:p-8
                h-48 sm:h-56 md:h-64
                rounded-3xl
                bg-gradient-to-br from-neutral-900 to-neutral-800
                shadow-lg
                border border-neutral-700
                transition-all duration-300
                group-hover:shadow-xl group-hover:border-amber-500/30
                before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] before:from-amber-600/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500
                group-hover:before:opacity-100
            ">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-800 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                {/* Content */}
                <span className="text-neutral-300 text-xl font-medium mb-4 z-10">{title}</span>
                <span className="
                    z-10 text-4xl sm:text-5xl md:text-6xl
                    font-bold bg-clip-text text-transparent
                    bg-gradient-to-r from-amber-400 to-orange-500
                    drop-shadow-lg
                ">
                    {value}
                </span>

                {/* Animated dots */}
                <motion.div
                    className="absolute bottom-4 left-4 flex space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                >
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-amber-500/80"
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    )
}