import React from 'react';
import './ErrorMsg.css'

export default function ErrorMsg(props) {
    const msg = props && props.errorMsg
    return (
        <p className="input_errormsg">
            {msg}
        </p>
    )
}