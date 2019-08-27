import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            hasError: false
        }
    }
    
    static getDerivedStateFromError(error) {
        console.log(error)
        return {
            hasError: true
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error">
                    <h1><b>¯\_</b>(ツ)<b>_/¯</b></h1>
                    <h2>Oops, looks like you broke it</h2>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary;