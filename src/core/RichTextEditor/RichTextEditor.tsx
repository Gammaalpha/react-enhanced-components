import React, { useState, useRef } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Tooltip, MenuItem, Select, FormControl, FormHelperText, InputLabel } from '@material-ui/core';
import { Editor, EditorState, RichUtils } from 'draft-js';
import "draft-js/dist/Draft.css";
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import "./RichTextEditor.css"
import { IRichText, IToolbarButton } from './model/RichText';
import Icon from "@material-ui/core/Icon"

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
    tooltip: {
        fontSize: "12pt!important"
    },
    cmdButton: {
        marginRight: theme.spacing(1),
        backgroundColor: 'lightgray',
        minWidth: '40px',
        '&:hover': {
            backgroundColor: 'darkgray'
        }
    },
    appBar: {
        backgroundColor: '#1e272c',

    },
    selectEmpty: {
        marginRight: theme.spacing(1),
        backgroundColor: 'lightgray',
        minWidth: '40px',
        '&:hover': {
            backgroundColor: 'darkgray'
        },
        '&>.MuiInputBase-root>.MuiSelect-root': {
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 0,
            paddingLeft: 0,

        }
    },
    toolbar: {
        minHeight: '50px',
        paddingLeft: '5px',
        paddingRight: '5px',

    }
}))

type TextAlignment = "left" | "right" | "center";

export const RichTextEditor = (props: IRichText) => {
    const classes = useStyles()
    const [alignText, setAlignText] = useState<TextAlignment>('left')
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),)
    const editorRef = useRef<any>(null)

    function focusEditor() {
        editorRef.current?.focus();
    }



    const _onBoldClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
    }

    const _onItalicClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
    }
    const _onUnderlineClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
    }

    const _onLeftAlignClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setAlignText("left")
    }
    const _onCenterAlignClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setAlignText("center")
    }
    const _onRightAlignClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setAlignText("right")
    }



    const buttonsArray: IToolbarButton[] = [
        {
            key: 'BOLD',
            icon: 'format_bold',
            tooltip: 'Bold (Ctrl+B)',
            ariaLabel: 'Bold Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onBoldClick(e),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'ITALIC',
            icon: 'format_italic',
            tooltip: 'Italic (Ctrl+I)',
            ariaLabel: 'Italic Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onItalicClick(e),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'UNDERLINE',
            icon: 'format_underlined',
            tooltip: 'Underline (Ctrl+U)',
            ariaLabel: 'Underline Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onUnderlineClick(e),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'textAlign',
            icon: 'format_align_justify',
            tooltip: 'Text Alignment',
            value: alignText,
            ariaLabel: 'Text Alignment',
            position: 'top',
            buttonStyle: classes.selectEmpty,
            childButtons: [
                {
                    key: 'left',
                    icon: 'format_align_left',
                    tooltip: 'Align Left',
                    ariaLabel: 'Align Left',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onLeftAlignClick(e),
                    position: 'right',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'center',
                    icon: 'format_align_center',
                    tooltip: 'Align Center',
                    ariaLabel: 'Align Center',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onCenterAlignClick(e),
                    position: 'right',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'right',
                    icon: 'format_align_right',
                    tooltip: 'Align Right',
                    ariaLabel: 'Align Right',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onRightAlignClick(e),
                    position: 'right',
                    buttonStyle: classes.cmdButton
                },
            ]
        }
    ]

    const renderToolbarButtons = () => {
        const toolbarButtons: any[] = []
        buttonsArray.forEach((element: IToolbarButton) => {
            toolbarButtons.push(createStyleButton(element))
        });
        return toolbarButtons

    }

    const toolbar = () => {
        return (
            <div className={classes.flexGrow1}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className={`${props?.toolbarStyle ? props.toolbarStyle : classes.toolbar}`}>
                        {/* {toolbarButtons()} */}
                        {renderToolbarButtons()}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    const handleKeyCommand = (cmd: string, editorState_: EditorState) => {
        // console.log("cmd: ", cmd, " editorState: ", editorState_);
        const newState = RichUtils.handleKeyCommand(editorState_, cmd);
        if (newState) {
            onChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    const onChange = (editorState_: EditorState) => {
        setEditorState(editorState_)
    }

    const editorRender = () => {
        console.log("render editor");

        return (
            <div className={classes.editorContainer} onClick={() => focusEditor()}>
                {toolbar()}
                <Editor
                    textAlignment={alignText}
                    ref={editorRef}
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    onChange={onChange}
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


function createStyleButton(buttonData: IToolbarButton) {
    const buttonStyles = makeStyles((theme: Theme) => createStyles({
        buttonLabel: {
            justifyContent: "start"
        },
        menuWidth: {
            width: '60px'
        }
    }))
    const classes = buttonStyles()
    return (
        <div key={`${buttonData.key}`} >
            {
                buttonData.childButtons !== undefined && buttonData.childButtons.length > 0 ?
                    <FormControl variant="filled" className={buttonData.buttonStyle}>
                        <Tooltip placement={buttonData?.position ? buttonData.position : "top"} title={`${buttonData.tooltip}`}>
                            <Select
                                aria-label={buttonData.ariaLabel}
                                labelId={`${buttonData.key}_label`}
                                id={`${buttonData.key}_helper`}
                                value={buttonData.value}
                            >
                                {
                                    buttonData.childButtons.map((button) => (
                                        <MenuItem className={classes.menuWidth} key={button.key} value={button.key}>
                                            <Tooltip placement={button?.position ? button.position : "top"} title={`${button.tooltip}`}>
                                                <Button className={classes.buttonLabel} onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => button.callback(e)}>
                                                    <Icon>
                                                        {button.icon}
                                                    </Icon>
                                                </Button>
                                            </Tooltip>
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Tooltip>
                    </FormControl>
                    : <Tooltip placement={buttonData?.position ? buttonData.position : "top"} title={`${buttonData.tooltip}`}>
                        <Button aria-label={buttonData.ariaLabel} onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => buttonData.callback(e)} className={buttonData.buttonStyle}>
                            <Icon>{buttonData.icon}</Icon>
                        </Button>
                    </Tooltip>
            }
        </div >
    )
}