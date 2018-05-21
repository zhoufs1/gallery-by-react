import React from 'react';
import PDFJS from 'pdfjs-dist/build/pdf'

class PDF extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            pdf: null,
            scale: 1.2
        }
    }
    getChildContext () {
        return {
            pdf: this.state.pdf,
            scale: this.state.scale
        }
    }
    componentDidMount () {
        PDFJS.getDocument(this.props.src).then((pdf) => {
            console.log(pdf)
            this.setState({ pdf })
        })
    }
    render () {
        return (<div className='pdf-context'>{this.props.children}</div>)
    }
}

PDF.propTypes = {
    src: React.PropTypes.string.isRequired
}

PDF.childContextTypes = {
    pdf: React.PropTypes.object,
    scale: React.PropTypes.number
}

export default PDF;
