import React, { useState, useRef } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Editor, EditorState } from 'draft-js';
import "draft-js/dist/Draft.css";
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import "./RichTextEditor.css"
import { IRichText } from './model/RichText';

const useStyles = makeStyles((theme: Theme) => createStyles({
    editorContainer: {
        width: '100%',
        minHeight: '350px',
        border: '2px solid black',
        borderRadius: 8
    },
    fullWidth: {
        minWidth: '100%'
    },
    flexGrow1: {
        flexGrow: 1
    },
    toolbarBtn: {
        marginRight: theme.spacing(2)
    },
    blackToolbar: {
        backgroundColor: 'black'
    }
}))

export const RichTextEditor = (props: IRichText) => {
    const classes = useStyles()
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),)
    const editorRef = useRef<any>(null)

    function focusEditor() {
        editorRef.current?.focus();
    }

    const toolbar = () => {
        return (
            <div className={classes.flexGrow1}>
                <AppBar position="static">
                    <Toolbar className={props?.toolbarStyle ? props.toolbarStyle : classes.blackToolbar}>
                        {/* <IconButton edge="start" className={classes.toolbarBtn} color="inherit" aria-label="menu">
                        </IconButton>
                        <Button color="inherit">Login</Button> */}

                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    const editorRender = () => {
        return (
            <div className={classes.editorContainer} onClick={() => focusEditor()}>
                {toolbar()}
                <Editor
                    ref={editorRef}
                    editorState={editorState}
                    onChange={(state) => setEditorState(state)}
                />
            </div>
        )
    }


    const render = () => {
        return (
            <div className={classes.fullWidth}>
                {editorRender()}
            </div>
        )
    }

    return render();
}
