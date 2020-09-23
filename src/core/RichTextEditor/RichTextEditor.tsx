import React, { useState } from 'react'
import QuillEditor from "./QuillEditor/QuillEditor";
import CustomToolbar from "./CustomToolbar/CustomToolbar";
import { IRichText } from './model/RichText';
import './RichTextEditor.css'
const randNum = Math.floor(Math.random() * 1000)

export function RichTextEditor(props: IRichText) {
    let toolbarId = `toolbar_${randNum}`;
    const editorId = `quillEditor_${randNum}`;
    const [editorRefState, setEditorRefState] = useState(null)
    const handleIncomingRef = (ref: any) => {
        // console.log("ref handled", ref);
        setEditorRefState(ref)
    }

    const handleIncomingContent = (_data: any) => {
        props.callback(_data);
    }
    const render = () => {
        const id = props.id === undefined ? "main_container_rich_text_editor" : props.id;
        let value = props.value === undefined ? "" : props.value;
        return (
            <div id={id}>
                <CustomToolbar editing={props.editing} editorRef={editorRefState} id={toolbarId} editorId={editorId} />
                <QuillEditor value={value} callback={handleIncomingRef} contentCallback={handleIncomingContent} editorId={editorId} toolbarId={toolbarId} editing={props.editing} />
            </div>
        )
    }

    return render();
}
