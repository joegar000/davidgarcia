import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export default function() {
    const ref = useRef<null | HTMLDivElement>(null);
    const listener = useCallback(() => {
        if (ref.current) {
            const maxScroll = document.body.getBoundingClientRect().height - window.innerHeight;
            ref.current.style.width = `${(window.scrollY / maxScroll) * 100}%`;
        }
    }, [ref]);

    useLayoutEffect(() => {
        document.addEventListener('scroll', listener);
        listener();
        return () => {
            document.removeEventListener('scroll', listener);
        }
    }, []);


    return (
        <div className="progress position-fixed w-75" style={{ left: '12.5%', bottom: '1em' }}>
            <div className="progress-bar h-100 m-auto" ref={ref} />
        </div>
    );
}
