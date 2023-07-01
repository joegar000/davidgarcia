import imgMe from "../me.jpg";

export function Home() {
    return (
        <>
            <div className="text-center pt-5 px-2">
                <span className="m-auto display-6">Hello! My name is David. I'm a software developer.</span>
            </div>
            <div className="row p-2 pt-5">
                <div className="col-md d-flex pt-md-0 pt-5 px-5" style={{ flexDirection: 'column' }}>
                    <p className="mt-auto px-5" style={{ fontSize: '1.5rem' }}>
                        Welcome to my personal website! Here's where I post my ideas, reflections, projects, and anything I feel inclined to write about!
                    </p>
                    <p className="mb-auto px-5" style={{ fontSize: '1.5rem' }}>
                        My programming journey began in 2018 when I started college. Since then, I've gotten my bachelors in computer science,
                        had two internships, and started working full-time.
                    </p>
                </div>
                <div className="col-md d-flex justify-content-center pt-md-0 pt-5">
                    <img className="rounded-5" src={imgMe} style={{ maxWidth: '70%', height: 'auto', objectFit: 'cover' }} ></img>
                </div>
            </div >
        </>
    );
}
