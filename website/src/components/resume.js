import { Document, Page } from "react-pdf";
import { useLoaderData } from "react-router-dom";
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function Resume() {
    const file = useLoaderData();
    return (
        <div className="d-flex justify-content-center my-4">
            <div className="container overflow-auto">
                <div className="position-fixed" style={{ zIndex: 1000 }}>
                    <a className="btn btn-primary" href="resume.pdf" download={true}>
                        <i className="bi bi-download" />
                    </a>
                </div>
                <div style={{ width: 'fit-content' }}>
                    <Document className="d-flex justify-content-center overflow-x-auto" file={file}>
                        <Page pageNumber={1} />
                    </Document>
                </div>
            </div>
        </div>
    );
}

export async function resumeLoader() {
    const file = await fetch('resume.pdf').then(res => res.blob());
    return file;
}
