import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import TypescriptIcon from "react-devicons/typescript/plain";
import PythonIcon from "react-devicons/python/plain";
import ReactIcon from "react-devicons/react/original";
import JestIcon from "react-devicons/jest/plain";
import FlaskIcon from "react-devicons/flask/original";
import PytestIcon from "react-devicons/pytest/plain";
import JavaIcon from "react-devicons/java/plain";
import CSharpIcon from "react-devicons/csharp/plain";
import PostgresIcon from "react-devicons/postgresql/plain";
import NeovimIcon from "react-devicons/neovim/plain";
import PHPIcon from "react-devicons/php/plain";
import NPMIcon from "react-devicons/npm/original-wordmark";
import DockerIcon from "react-devicons/docker/plain";
import BootstrapIcon from "react-devicons/bootstrap/plain";

const Icons = [
    { title: "Typescript", src: <TypescriptIcon size="2em" />, href: "https://www.typescriptlang.org/" },
    { title: "Python", src: <PythonIcon size="2em" />, href: "https://www.python.org/" },
    { title: "React", src: <ReactIcon size="2em" />, href: "https://react.dev/" },
    { title: "Jest", src: <JestIcon size="2em" />, href: "https://jestjs.io/"  },
    {
        title: "ProseMirror",
        src: `data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22786.5%22%20height=%228
            99.6%22%20viewBox=%220%200%20208.1%20238.0%22%3E%3Cpath%20d=%22M104%202C47.6%202%202%2047.6%202%20104s45.6%20102%2
            0102%20102%20102-45.6%20102-102S160.3%202%20104%202z%22%20fill=%22%23fff%22/%3E%3Cpath%20d=%22M147.1%2092.7c-6.9%2
            083.9%2010.8%20103.4%2010.8%20103.4s-55.1%205.5-82.7-13.4c-30.5-20.9-26-67.5-25.9-94.6.1-28.4%2025.6-45.8%2049.9-4
            5.3%2029.1.5%2050.2%2021.6%2047.9%2049.9z%22/%3E%3Cpath%20d=%22M82.1%20139.5c12.2%2033.3%2022.5%2042.7%2040.0%2055
            .2%2025.3%2018.0%2036.6%2017.5%2076.3%2041.0-38.3-36.0-85.6-50.6-116.4-96.3z%22%20fill=%22%23fff%22/%3E%3Cpath%20d
            =%22M82.1%20139.5c3%2013.3%2017.9%2029.9%2030.4%2041.6%2024.8%2023.2%2042%2022.4%2086%2054.7-18.2-51.8-18.8-62-43.
            5-106.1-24.7-44-67.6-20.3-67.6-20.3S79%20126%2082.1%20139.3z%22/%3E%3Cpath%20d=%22M108.9%2076s-4-11.6-18-11.5c-30%
            20.2-28.8%2052.1%2016.9%2052%2039.6-.1%2039.2-49.4%2016.1-49.6-10.2-.2-15%209.1-15%209.1z%22%20fill=%22%23fff%22/%
            3E%3Cpath%20d=%22M109.4%2095c10.8%200%202%2014.9-.6%2020.9-1.8-8.4-10.2-20.9.6-20.9zM93.1%2080.1c-5.6%200-10.2%204
            .5-10.2%2010.2%200%205.6%204.5%2010.2%2010.2%2010.2%205.6%200%2010.2-4.5%2010.2-10.2%200-5.6-4.5-10.2-10.2-10.2zm3
            0.5-.1c-4.8%200-8.8%204.5-8.8%2010.2%200%205.6%203.9%2010.2%208.8%2010.2%204.8%200%208.8-4.5%208.8-10.2%200-5.6-3.
            9-10.2-8.8-10.2z%22/%3E%3C/svg%3E
        `.replace(/\s/g, ''),
        href: "https://prosemirror.net/"
    },
    { title: "Flask", src: <FlaskIcon size="2em" />, href: "https://flask.palletsprojects.com/en/stable/" },
    { title: "Pytest", src: <PytestIcon size="2em" />, href: "https://docs.pytest.org/en/stable/" },
    { title: "Java", src: <JavaIcon size="2em" />, href: "https://docs.oracle.com/en/java/" },
    { title: "CSharp", src: <CSharpIcon size="2em" />, href: "https://dotnet.microsoft.com/en-us/languages/csharp" },
    { title: "Postgres", src: <PostgresIcon size="2em" />, href: "https://www.postgresql.org/" },
    { title: "Neovim", src: <NeovimIcon size="2em" />, href: "https://neovim.io/" },
    { title: "PHP", src: <PHPIcon size="2em" />, href: "https://www.php.net/" },
    { title: "NPM", src: <NPMIcon size="2em" />, href: "https://www.npmjs.com/" },
    { title: "Docker", src: <DockerIcon size="2em" />, href: "https://www.docker.com/" },
    { title: "Bootstrap", src: <BootstrapIcon size="2em" />, href: "https://getbootstrap.com/" }
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

    useLayoutEffect(() => {
        if (emRef.current && em === 0) {
            setEm(emRef.current.getBoundingClientRect().height);
        }
    });

    const y = useTransform(scrollYProgress, [0, 1], [-window.innerHeight * 2, window.innerHeight * 2])
    const [iconTransforms, setIconTransforms] = useState<string[]>([]);

    return (
        <div ref={ref} className="d-flex flex-column justify-content-evenly w-100 pt-5">
            <motion.div className="mb-auto" style={{ y }}>
                <h2>Skills</h2>
            </motion.div>
            <div ref={viewRef} className="flex-fill d-flex pb-5">
                <div className="m-auto position-relative w-75 rounded-3 container">
                    <div ref={emRef} style={{ height: '1em' }} />
                        <div className="row row-cols-3 row-cols-md-5 row-cols-sm-3">
                            {Icons.map((iconProps, index) => (
                                <div
                                    key={index}
                                    className="col pb-5 d-flex justify-content-center"
                                    ref={node => {
                                        if (node && !inView && !iconTransforms[index]) {
                                            const { width, height, y, x} = node.offsetParent!.getBoundingClientRect();
                                            const midX = (width / 2);
                                            const midY = (height / 2);
                                            const { left, top, width: nodeWidth } = node.getBoundingClientRect();
                                            setIconTransforms(arr => {
                                                const newArr = [...arr];
                                                newArr[index] = `translateX(calc(${midX - (left - x)}px - ${nodeWidth / 2}px)) translateY(${midY - (top - y)}px)`;
                                                return newArr;
                                            });
                                            // node.style.transform = `translateX(calc(${midX - (left - x)}px - ${nodeWidth / 2}px)) translateY(${midY - (top - y)}px)`
                                        }
                                    }}
                                    style={{
                                        transition: 'all 1s cubic-bezier(0.12, 1.01, 0, 0.96) 0.1s',
                                        transform: inView ? '' : iconTransforms[index]
                                    }}
                                >
                                    <Icon {...iconProps} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


function Icon(props: { title: string, src: string | JSX.Element, href?: string }) {
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
                {typeof props.src === 'string' ? 
                    <img className="p-0" src={props.src} style={{ width: '2em', height: '2em' }} />
                    :
                    props.src
                }
            </motion.div>
        </motion.div>
    );
}

