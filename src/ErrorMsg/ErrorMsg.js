import React from 'react';
import './ErrorMsg.css'

export default function ErrorMsg(props) {
    return (
        <p className="input_errormsg">
            {props.errorMsg}
        </p>
    )
}