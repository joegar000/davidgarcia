import { useParallax } from "react-scroll-parallax";

export function Home() {
    const { ref: refName } = useParallax({
        speed: 75,
        translateX: [100, -100],
        easing: [0, 1, 1, 0]
    });
    const { ref: refIntro } = useParallax({
        speed: 75,
        translateX: [-100, 100],
        easing: [0, 1, 1, 0]
    });
    return (
        <div className="h-100">
            <div className="h-100 w-100 d-flex">
                <span className="display-3 m-auto">Hello!</span>
            </div>
            <div className="row h-100 w-100 overflow-hidden">
                <div className="col-sm my-sm-auto mt-auto text-sm-end text-center" ref={refIntro}>
                    <span className="display-3">my name is</span>
                </div>
                <div className="col-sm my-sm-auto mb-auto text-sm-start text-center" ref={refName}>
                    <span className="display-3">David Garcia</span>
                </div>
            </div>
            <div className="h-100 d-flex text-center">
                <span className="display-3 m-auto">I'm a software developer</span>
            </div>
        </div>
    );
}
