import React, { useState, useRef, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import { IQuillEditor } from '../model/RichText';
import './QuillEditor.css'
import 'react-quill/dist/quill.snow.css';


export default function QuillEditor(props: IQuillEditor) {

    let initialValue = props?.value !== '' ? props.value : '';
    const editorRef = useRef<ReactQuill>(null)

    const [value, setValue] = useState(initialValue)
    const handleChange = (_value: any) => {
        setValue(_value)
    }
    const modules = {
        toolbar: {
            container: `#${props.toolbarId}`,
            handlers: [
                "link"
            ]
        }
    }

    const renderReactQuill = () => {
        return (
            <ReactQuill
                ref={editorRef}
                id={props.editorId}
                defaultValue={value}
                onChange={handleChange}
                modules={modules}
            />
        )
    }

    const render = () => {
        return (
            <div className={`${props.editing ? 'ql-active' : ""}`}>
                {renderReactQuill()}
            </div>
        )
    }

    useEffect(() => {
        props.callback(editorRef)
    }, [props])

    return render();
}
