import { useParallax } from "react-scroll-parallax";
import imgMe from "../me.jpg";

export function Home() {
    // const { ref: refName } = useParallax({
    //     speed: 75,
    //     translateX: [100, -100],
    //     easing: [0, 1, 1, 0]
    // });
    // const { ref: refIntro } = useParallax({
    //     speed: 75,
    //     translateX: [-100, 100],
    //     easing: [0, 1, 1, 0]
    // });
    return (
        <>
            <div className="text-center pt-5 px-2">
                <span className="m-auto display-6">Hello! My name is David. I'm a software developer.</span>
            </div>
            <div className="row p-2 pt-5">
                <div className="col-sm d-flex pt-sm-0 pt-5">
                    <span className="m-auto">some text here</span>
                </div>
                <div className="col-sm d-flex justify-content-center pt-sm-0 pt-5">
                    <img className="rounded-5" src={imgMe} style={{ maxWidth: '100%', height: 'auto' }} ></img>
                </div>
            </div >
        </>
    );
}
