import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Tilt from "react-parallax-tilt";

const experiences = [
    {
        company: "Mometrix Test Preparation",
        title: "Software Engineer",
        years: ["June 2022", "Present"]
    },
    {
        company: "Mometrix Test Preparation",
        title: "Software Engineering Intern",
        years: ["October 2021", "June 2022"]
    },
    {
        company: "Application Factory, Inc",
        title: "Software Engineering Intern",
        years: ["April 2021", "October 2021"]
    }
];

export default function() {
    const ref = useRef(null);
    const viewRef = useRef(null);
    const inView = useInView(viewRef);

    return (
        <div ref={ref} className="d-flex flex-column justify-content-evenly w-100 pt-5">
            <motion.div className="mb-auto">
                <h2>Experience</h2>
            </motion.div>
            <motion.div ref={viewRef} className="flex-fill d-flex flex-column align-items-center pb-5">
                <div className="m-auto container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                        {experiences.map((e, i) => (
                            <div key={e.years[0]} className="col pb-3">
                                <Tilt className="h-100">
                                    <div
                                        className="card text-bg-light text-start border h-100"
                                        style={{
                                            transition: `all 0.75s ease-out ${i / 10}s`,
                                            opacity: inView ? 1 : 0,
                                            transform: inView ? '' : 'translateY(100px)'
                                        }}
                                    >
                                      <div className="card-body">
                                        <h5 className="card-title">{e.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">{e.company}</h6>
                                        <p className="card-text">{`${e.years[0]} - ${e.years[1] ?? 'Present'}`}</p>
                                      </div>
                                    </div>
                                </Tilt>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
