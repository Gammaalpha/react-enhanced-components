import React, { useState, useRef, useEffect } from 'react'
import ReactQuill from 'react-quill';
import { IQuillEditor } from '../model/RichText';
import './QuillEditor.css'
import 'react-quill/dist/quill.snow.css';


export default function QuillEditor(props: IQuillEditor) {

    const editorRef = useRef<ReactQuill>(null)

    const [value, setValue] = useState(props.value !== undefined ? props.value : '')
    const handleChange = (_value: any) => {
        setValue(_value)
        props.contentCallback(_value)
    }
    const modules = {
        clipboard: {
            matchVisual: false
        },
        toolbar: {
            container: `#${props.toolbarId}`,
            handlers: [
                "link"
            ]
        }
    }

    useEffect(() => {
        // if (editorRef !== null && editorRef !==undefined) {
        props.callback(editorRef);
        if (editorRef.current !== null) {
            editorRef.current.getEditor().enable(props.editing)
        }
        // }
    }, [editorRef, props.editing]);
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

    // useEffect(() => {
    //     props.callback(editorRef)
    // }, [props])

    return render();
}
