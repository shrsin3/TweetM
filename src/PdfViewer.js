import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pdf from './TwitterTaskSteps.pdf'

function PdfViewer() {
    const source = pdf+"#toolbar=0"
    return (
        <div style={{width: "80%"}}>
            <embed src={source} width={"100%"} height={500}/>
        </div>
    );
}

export default PdfViewer;