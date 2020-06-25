import React, { useState } from 'react'
import { Editor, EditorState } from 'draft-js';
import "draft-js/dist/Draft.css";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    editorContainer: {
        width: '100%',
        minHeight: '350px',
        border: '2px solid black',
        borderRadius: 8
    },
    fullWidth: {
        minWidth: '100%'
    }
})

export const RichTextEditor = () => {
    const classes = useStyles()
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),)

    const onEditorStateChange = (editorState_: EditorState) => {
        setEditorState(editorState_)
    }

    const editorRender = () => {
        return (
            <div className={classes.editorContainer}>
                <Editor
                    editorState={editorState} onChange={(state) => onEditorStateChange(state)}
                />
            </div>
        )
    }


    const render = () => {
        return (
            <div className={classes.fullWidth}>
                Rich Text Editor
                {editorRender()}
            </div>
        )
    }

    return render();
}
