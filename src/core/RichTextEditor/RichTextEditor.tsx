import React, { useState } from 'react'
import QuillEditor from "./QuillEditor/QuillEditor";
import CustomToolbar from "./CustomToolbar/CustomToolbar";
import { IRichText } from './model/RichText';
import './RichTextEditor.css'
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
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
        if (props.callback !== undefined) {
            props.callback(_data);
        }
    }

    const generateClassName = createGenerateClassName({
        productionPrefix: 'rte_',
    });
    const render = () => {
        const id = props.id === undefined ? "main_container_rich_text_editor" : props.id;
        let value = props.value === undefined ? "" : props.value;
        return (
            <div id={id}>
                <StylesProvider generateClassName={generateClassName}>
                    <CustomToolbar editing={props.editing} editorRef={editorRefState} id={toolbarId} editorId={editorId} />
                    <QuillEditor value={value} callback={handleIncomingRef} contentCallback={handleIncomingContent} editorId={editorId} toolbarId={toolbarId} editing={props.editing} />
                </StylesProvider>
            </div>
        )
    }

    return render();
}
