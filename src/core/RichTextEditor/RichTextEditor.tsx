import React, { useState } from 'react'
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

export const RichTextEditor = () => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (editorState_: EditorState) => {
        setEditorState(editorState_)
    }

    const editorRender = () => {
        return (
            <Editor
                editorState={editorState} onChange={(state) => onEditorStateChange(state)}
            />
        )
    }


    const render = () => {
        return (
            <div>
                {editorRender()}
            </div>
        )
    }

    return render();
}
