import React, { useState } from 'react'
import QuillEditor from "./QuillEditor/QuillEditor";
import CustomToolbar from "./CustomToolbar/CustomToolbar";
import { IRichText } from './model/RichText';
import './RichTextEditor.css'

const randNum = Math.floor(Math.random() * 1000)

export default function RichTextEditor(props: IRichText) {
    let toolbarId = `toolbar_${randNum}`;
    const editorId = `quillEditor_${randNum}`;
    const [editorRefState, setEditorRefState] = useState(null)
    const handleIncomingRef = (ref: any) => {
        console.log("ref handled", ref);
        setEditorRefState(ref)
    }
    const render = () => {

        return (
            <div>
                <CustomToolbar editorRef={editorRefState} id={toolbarId} />
                <QuillEditor callback={handleIncomingRef} editorId={editorId} toolbarId={toolbarId} editing={props.editing} />
            </div>
        )
    }

    return render();
}
