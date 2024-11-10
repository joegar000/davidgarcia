import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.7, 1], [0, 0.2, 1, 0.2, 0]);

    return (
        <div ref={ref} className="d-flex flex-column justify-content-evenly w-100 pt-5">
            <motion.div className="mb-auto" style={{ opacity }}>
                <h2>About Me</h2>
            </motion.div>
            <motion.div className="flex-fill d-flex flex-column align-items-center pb-5" style={{ opacity }}>
                <div className="m-auto container">
                    <p className="lead w-50 text-start mx-auto">
                        Hello! My name is David. I'm a software developer.
                    </p>
                    <p className="w-50 text-start mx-auto">
                        Welcome to my personal website! My programming journey began in 2018 when I started college.
                        Since then, I've gotten my bachelors in computer science, had two internships, and started working full-time.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
