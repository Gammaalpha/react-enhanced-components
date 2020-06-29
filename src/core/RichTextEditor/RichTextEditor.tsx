import React, { useState, useRef } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Tooltip, MenuItem, Select, FormControl } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import "./RichTextEditor.css"
import { IRichText, IToolbarButton } from './model/RichText';
import Icon from "@material-ui/core/Icon"
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const useStyles = makeStyles((theme: Theme) => createStyles({
    editorContainer: {
        width: '100%',
        // minHeight: '350px',
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
        backgroundColor: 'lightgray!important',
        minWidth: '40px',
        height: '28px!important',
        '&:hover': {
            backgroundColor: 'darkgray'
        }
    },
    appBar: {
        backgroundColor: '#1e272c!important',

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
            paddingRight: '0px!important',
            paddingLeft: '0px!important',

        }
    },
    toolbar: {
        minHeight: '50px',
        paddingLeft: '5px',
        paddingRight: '5px',

    }
}))
const Font = Quill.import("formats/font");
Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida",
    "SegoeUI"
]
Quill.register(Font, true);
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

export const RichTextEditor = (props: IRichText) => {
    const editorId = props.id === undefined ? `editor_${Math.floor(Math.random() * 1000)}` : props.id;
    const classes = useStyles()
    const [value, setValue] = useState('');
    const editorRef = useRef<any>(null)

    function focusEditor() {
        editorRef.current?.focus();
    }



    const _onBoldClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(editorRef.current);
        console.log(value);


    }

    const _onItalicClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

    }
    const _onUnderlineClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }

    const _onLeftAlignClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }
    const _onCenterAlignClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }
    const _onRightAlignClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }



    const buttonsArray: IToolbarButton[] = [
        {
            key: 'BOLD',
            icon: 'format_bold',
            tooltip: 'Bold (Ctrl+B)',
            ariaLabel: 'Bold Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onBoldClick(e),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`
        },
        {
            key: 'ITALIC',
            icon: 'format_italic',
            tooltip: 'Italic (Ctrl+I)',
            ariaLabel: 'Italic Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onItalicClick(e),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`
        },
        {
            key: 'UNDERLINE',
            icon: 'format_underlined',
            tooltip: 'Underline (Ctrl+U)',
            ariaLabel: 'Underline Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onUnderlineClick(e),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`
        },
        {
            key: 'textAlign',
            icon: 'format_align_justify',
            tooltip: '',
            ariaLabel: 'Text Alignment',
            value: 'left',
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
            <div id="toolbar" className={classes.flexGrow1}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className={`${props?.toolbarStyle ? props.toolbarStyle : classes.toolbar}`}>
                        {/* {toolbarButtons()} */}
                        {renderToolbarButtons()}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    const modules = {
        toolbar: {
            container: "#toolbar",
            handlers: {
            }
        }
    }

    // const formats = [
    //     "header",
    //     "font",
    //     "size",
    //     "bold",
    //     "italic",
    //     "underline",
    //     "strike",
    //     "blockquote",
    //     "list",
    //     "bullet",
    //     "indent",
    //     "link",
    //     "image",
    //     "color"
    // ];

    const editorRender = () => {
        console.log("render editor");

        return (
            <div className={classes.editorContainer} onClick={() => focusEditor()}>
                {toolbar()}
                <ReactQuill
                    ref={editorRef}
                    id={editorId}
                    // formats={formats}    
                    // modules={modules}
                    // theme="snow"
                    value={value}
                    onChange={setValue} />
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
    const buttonStyles = makeStyles(() => createStyles({
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