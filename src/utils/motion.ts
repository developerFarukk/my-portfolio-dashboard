

export const staggerContainer = (staggerChildren?: number, delayChildren?: number) => ({
    hidden: {},
    show: {
        transition: {
            staggerChildren: staggerChildren || 0.1,
            delayChildren: delayChildren || 0
        }
    }
})

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', type: string, delay: number, duration: number) => ({
    hidden: {
        y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
        x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
        opacity: 0
    },
    show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            type: type,
            delay: delay,
            duration: duration,
            ease: 'easeOut'
        }
    }
})