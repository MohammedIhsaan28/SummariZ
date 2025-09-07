'use client';

import UploadFormInput from "./upload-form-input";

export default function UploadForm(){
    const handleSubmit=()=>{
        console.log("Subnitted");
    }
    return (
        <div>
            <UploadFormInput onSubmit={handleSubmit}/>
        </div>
    )
}