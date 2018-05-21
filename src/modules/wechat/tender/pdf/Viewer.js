import React from 'react';
import Page from './Page'
import PDF from './PDF'

class Viewer extends React.Component {
    render () {
        let { pdf } = this.context
        let numPages = pdf ? pdf.pdfInfo.numPages : 0
        let fingerprint = pdf ? pdf.pdfInfo.fingerprint : 'none'
        let pages = Array.apply(null, { length: numPages })
            .map((v, i) => (<Page index={i + 1} key={`${fingerprint}-${i}`}/>))

        return (
            <div className='pdf-viewer'>
                {pages}
            </div>
        )
    }
}
Viewer.contextTypes = PDF.childContextTypes;

export default Viewer;
