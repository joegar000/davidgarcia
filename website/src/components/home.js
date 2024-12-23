import imgMe from "../me.jpg";

export function Home() {
    return (
        <>
            <div className="text-center pt-5 px-2">
                <span className="m-auto display-6">Hello! My name is David. I'm a software developer.</span>
            </div>
            <div className="row p-2 pt-5">
                <div className="col-12 col-lg d-flex pt-md-5 px-lg-5 flex-column">
                    <p className="px-sm-5" style={{ fontSize: '1.5rem' }}>
                        Welcome to my personal website! Here's where I post my ideas, reflections, projects, and anything I feel inclined to write about!
                    </p>
                    <p className="px-sm-5" style={{ fontSize: '1.5rem' }}>
                        My programming journey began in 2018 when I started college. Since then, I've gotten my bachelors in computer science,
                        had two internships, and started working full-time.
                    </p>
                </div>
                <div className="col d-none d-lg-flex justify-content-center">
                    <img className="rounded-5" src={imgMe} style={{ maxWidth: '50%', height: 'auto', objectFit: 'cover', aspectRatio: 1 }}></img>
                </div>
                <div className="col d-flex d-lg-none justify-content-center pt-5 pb-5">
                    <img src={imgMe} style={{ maxWidth: '50%', height: 'auto', objectFit: 'cover', borderRadius: '100%' }}></img>
                </div>
            </div>
        </>
    );
}
