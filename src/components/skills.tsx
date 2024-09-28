import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const Icons = [
    <Icon title="TypeScript" href="https://www.typescriptlang.org/" src="https://www.svgrepo.com/show/374146/typescript-official.svg" />,
    <Icon title="Python" href="https://www.python.org/" src="https://www.svgrepo.com/show/452091/python.svg" />,
    <Icon title="React" href="https://react.dev/" src="https://www.svgrepo.com/show/452092/react.svg" />,
    <Icon title="Jest" href="https://jestjs.io/" src="https://www.svgrepo.com/show/373701/jest-snapshot.svg" />,
    <Icon
        title="ProseMirror"
        href="https://prosemirror.net/"
        src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22786.5%22%20height=%22899.6%22%20viewBox=%220%200%20208.1%20238.0%22%3E%3Cpath%20d=%22M104%202C47.6%202%202%2047.6%202%20104s45.6%20102%20102%20102%20102-45.6%20102-102S160.3%202%20104%202z%22%20fill=%22%23fff%22/%3E%3Cpath%20d=%22M147.1%2092.7c-6.9%2083.9%2010.8%20103.4%2010.8%20103.4s-55.1%205.5-82.7-13.4c-30.5-20.9-26-67.5-25.9-94.6.1-28.4%2025.6-45.8%2049.9-45.3%2029.1.5%2050.2%2021.6%2047.9%2049.9z%22/%3E%3Cpath%20d=%22M82.1%20139.5c12.2%2033.3%2022.5%2042.7%2040.0%2055.2%2025.3%2018.0%2036.6%2017.5%2076.3%2041.0-38.3-36.0-85.6-50.6-116.4-96.3z%22%20fill=%22%23fff%22/%3E%3Cpath%20d=%22M82.1%20139.5c3%2013.3%2017.9%2029.9%2030.4%2041.6%2024.8%2023.2%2042%2022.4%2086%2054.7-18.2-51.8-18.8-62-43.5-106.1-24.7-44-67.6-20.3-67.6-20.3S79%20126%2082.1%20139.3z%22/%3E%3Cpath%20d=%22M108.9%2076s-4-11.6-18-11.5c-30%20.2-28.8%2052.1%2016.9%2052%2039.6-.1%2039.2-49.4%2016.1-49.6-10.2-.2-15%209.1-15%209.1z%22%20fill=%22%23fff%22/%3E%3Cpath%20d=%22M109.4%2095c10.8%200%202%2014.9-.6%2020.9-1.8-8.4-10.2-20.9.6-20.9zM93.1%2080.1c-5.6%200-10.2%204.5-10.2%2010.2%200%205.6%204.5%2010.2%2010.2%2010.2%205.6%200%2010.2-4.5%2010.2-10.2%200-5.6-4.5-10.2-10.2-10.2zm30.5-.1c-4.8%200-8.8%204.5-8.8%2010.2%200%205.6%203.9%2010.2%208.8%2010.2%204.8%200%208.8-4.5%208.8-10.2%200-5.6-3.9-10.2-8.8-10.2z%22/%3E%3C/svg%3E"
    />,
    <Icon title="Flask" src="https://www.svgrepo.com/show/508915/flask.svg" />,
    <Icon title="Pytest" href="https://docs.pytest.org/en/stable/" src="https://docs.pytest.org/en/stable/_static/pytest1.png" />,
    <Icon title="Java" href="https://docs.oracle.com/en/java/" src="https://www.svgrepo.com/show/452234/java.svg" />,
    <Icon title="C#" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Logo_C_sharp.svg/512px-Logo_C_sharp.svg.png?20221121173824" />,
    <Icon title="SQL" src="https://www.svgrepo.com/show/374093/sql.svg" />,
    <Icon title="Vim/Neovim" src="https://www.svgrepo.com/show/354105/neovim.svg" />,
    <Icon title="PHP" src="https://www.svgrepo.com/show/303208/php-1-logo.svg" />,
    <Icon title="NPM" src="https://www.svgrepo.com/show/445925/npm.svg" />,
    <Icon title="Docker" src="https://www.svgrepo.com/show/452192/docker.svg" />,
    <Icon title="Bootstrap" href="https://getbootstrap.com/" src="https://www.svgrepo.com/show/353498/bootstrap.svg" />
];

export default function() {
    const [em, setEm] = useState(0);
    const emRef = useRef<null | HTMLDivElement>(null);

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['end start', 'start end']
    });

    const viewRef = useRef(null);
    const inView = useInView(viewRef);
    const [hasBeenInView, setHasBeenInView] = useState(false);

    useLayoutEffect(() => {
        if (emRef.current && em === 0) {
            setEm(emRef.current.getBoundingClientRect().height);
        }
    });

    useEffect(() => {
        if (inView && !hasBeenInView)
            setHasBeenInView(true);
    }, [inView]);

    const y = useTransform(scrollYProgress, [0, 1], [-window.innerHeight * 2, window.innerHeight * 2])

    return (
        <div ref={ref} className="d-flex flex-column justify-content-evenly w-100 pt-5">
            <motion.div className="mb-auto" style={{ y }}>
                <h2>Skills</h2>
            </motion.div>
            <div ref={viewRef} className="flex-fill d-flex pb-5">
                <div className="m-auto position-relative w-75 rounded-3 container">
                    <div ref={emRef} style={{ height: '1em' }} />
                        <div className="row row-cols-3 row-cols-md-5 row-cols-sm-3">
                            {Icons.map((Icon, index) => (
                                <div
                                    key={index}
                                    className="col pb-5 d-flex justify-content-center"
                                    ref={node => {
                                        if (node && !hasBeenInView && node.style.transform === '') {
                                            const { width, height, y, x} = node.offsetParent!.getBoundingClientRect();
                                            const midX = (width / 2);
                                            const midY = (height / 2);
                                            const { left, top, width: nodeWidth } = node.getBoundingClientRect();
                                            node.style.transform = `translateX(calc(${midX - (left - x)}px - ${nodeWidth / 2}px)) translateY(${midY - (top - y)}px)`
                                        }
                                    }}
                                    style={
                                        hasBeenInView ? {
                                            transition: 'all 1s cubic-bezier(0.12, 1.01, 0, 0.96) 0.1s',
                                            transform: ''
                                        } : undefined
                                    }
                                >
                                    {Icon}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


function Icon(props: { title: string, src: string, href?: string }) {
    const [hover, setHover] = useState(false);
    const [clockwise, setClockwise] = useState(true);
    const rotate = clockwise ? [0, 10, 0, -10, 0] : [0, -10, 0, 10, 0];
    const ref = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current && 'bootstrap' in window)
            // @ts-ignore
            window.bootstrap.Tooltip.getOrCreateInstance(ref.current);
    });

    return (
        <motion.div ref={ref} data-bs-toggle="tooltip" title={props.title} whileHover={{ scale: 1.2 }}>
            <motion.div
                className="border position-relative d-flex justify-content-center align-items-center rounded-3 bg-white"
                style={{ minWidth: '3em', minHeight: '3em', aspectRatio: 1 }}
                animate={hover ? { rotate } : {}}
                onHoverStart={() => (setHover(true), setClockwise(!clockwise))}
                onHoverEnd={() => setHover(false)}
                initial={{ rotate: 0 }}
                transition={hover ? { repeat: Infinity, ease: "linear", duration: 2 } : {}}
            >
                <a href={props.href} className="position-absolute h-100 w-100" target="_blank" />
                <img className="p-0" src={props.src} style={{ width: '2em', height: '2em' }} />
            </motion.div>
        </motion.div>
    );
}

