import React, { useState, useEffect } from 'react'
import QuillEditor from "./QuillEditor/QuillEditor";
import CustomToolbar from "./CustomToolbar/CustomToolbar";
import { IRichText } from './model/RichText';
import './RichTextEditor.css'
const randNum = Math.floor(Math.random() * 1000)

export function RichTextEditor(props: IRichText) {
    let toolbarId = `toolbar_${randNum}`;
    const editorId = `quillEditor_${randNum}`;
    const [editorRef, setEditorRef] = useState(null)
    // const handleIncomingRef = (ref: any) => {
    //     // console.log("ref handled", ref);
    //     setEditorRefState(ref)
    // }
    // useEffect(()=>{

    // }, [editorRef]);
    const render = () => {

        return (
            <div>
                <CustomToolbar editing={props.editing} editorRef={editorRef} id={toolbarId} editorId={editorId} />
                <QuillEditor  setEditorRef={setEditorRef}  editorId={editorId} toolbarId={toolbarId} editing={props.editing} />
            </div>
        )
    }

    return render();
}
