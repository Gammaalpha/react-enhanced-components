import React, { useState, useRef, useMemo, useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Tooltip, MenuItem, Select, FormControl, FormHelperText, InputLabel } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import "./RichTextEditor.css"
import { IRichText, IToolbarButton } from './model/RichText';
import Icon from "@material-ui/core/Icon"
import { createEditor, Editor, Transforms, Range } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'



const useStyles = makeStyles((theme: Theme) => createStyles({
    editorContainer: {
        width: '100%',
        // minHeight: '350px',
        border: '2px solid black',
        borderRadius: 8
    },
    slateEditor: {
        paddingLeft: 5,
        paddingRight: 5,
        minHeight: 150
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
    const slateEditor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState<any[]>([
        {
            type: 'paragraph',
            children: [{ text: 'Type here to add your content.' }],
        },
    ]);

    // const getLastPoint = (editor_: Editor & ReactEditor) => {
    //     const children: any = editor_.children[editor_.children.length - 1].children;
    //     const index = children[0].text.length;
    //     return {
    //         path: [editor_.children.length - 1, 0],
    //         offset: index
    //     }

    // }

    function focusEditor() {
        // console.log(slateEditor);
        // let end = getLastPoint(slateEditor)
        // const point = {
        //     anchor: end,
        //     focus: end
        // }
        ReactEditor.focus(slateEditor)
        // Transforms.select(slateEditor, point)
    }



    const _onBoldClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }

    const _onItalicClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }
    const _onUnderlineClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }
    const _onCodeClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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


    const callbacks: any = {}

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
            key: 'CODE',
            icon: 'code',
            tooltip: 'Code (Ctrl+`)',
            ariaLabel: 'Code Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onCodeClick(e),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'textAlign',
            icon: 'format_align_justify',
            tooltip: '',
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
                    position: 'left',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'center',
                    icon: 'format_align_center',
                    tooltip: 'Align Center',
                    ariaLabel: 'Align Center',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onCenterAlignClick(e),
                    position: 'center',
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


    function pseudoSwitch(value: any) {
        if (callbacks[value]) {
            callbacks[value].forEach(function (fn: any) {
                fn()
            });
        }
    }

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

    // const handleKeyCommand = (cmd: string, editorState_: EditorState) => {
    //     const newState = RichUtils.handleKeyCommand(editorState_, cmd);
    //     if (newState) {
    //         onChange(newState)
    //         return 'handled'
    //     }
    //     return 'not-handled'
    // }

    const CustomEditor = {
        isBoldMarkActive(editor: any) {
            const [match] = Editor.nodes(editor, {
                match: n => n.bold === true,
                universal: true,
            })
            return !!match
        },
        isItalicMarkActive(editor: any) {
            const [match] = Editor.nodes(editor, {
                match: n => n.italic === true,
                universal: true,
            })
            return !!match
        },
        isCodeBlockActive(editor: any) {
            const [match] = Editor.nodes(editor, {
                match: n => n.type === 'code',
            })

            return !!match
        },
        toggleBoldMark(editor: any) {
            const isActive = CustomEditor.isBoldMarkActive(editor)
            Transforms.setNodes(
                editor,
                { bold: isActive ? null : true },
                {
                    match: n => typeof n?.text === 'string'
                    , split: true
                }
            )
        },
        toggleItalicMark(editor: any) {
            const isActive = CustomEditor.isItalicMarkActive(editor)
            Transforms.setNodes(
                editor,
                { italic: isActive ? null : true },
                {
                    match: n => typeof n?.text === 'string'
                    , split: true
                }
            )
        },
        toggleCodeBlock(editor: any) {
            const isActive = CustomEditor.isCodeBlockActive(editor)
            Transforms.setNodes(
                editor,
                { type: isActive ? null : 'code' },
                { match: n => Editor.isBlock(editor, n) }
            )
        }
    }

    const handleKeyCommand = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!event.ctrlKey) {
            return
        }
        switch (event.key) {
            case '`':
                event.preventDefault()
                CustomEditor.toggleCodeBlock(slateEditor)
                break
            case 'b':
                event.preventDefault()
                CustomEditor.toggleBoldMark(slateEditor)
                break
            case 'i':
                event.preventDefault()
                CustomEditor.toggleItalicMark(slateEditor)
                break
            default:
                break;
        }
    }

    const CodeElement = (props: any) => {
        return (
            <pre {...props.attributes}>
                <code>{props.children}</code>
            </pre>
        )
    }

    const DefaultElement = (props: any) => {
        return <p {...props.attributes}>{props.children}</p>
    }

    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.
    const renderElement = useCallback((props: any) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, []);

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, []);
    // Define a React component to render leaves with bold text.
    const Leaf = (props: any) => {
        return (
            <span
                {...props.attributes}
                style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
            >
                {props.children}
            </span>
        )
    }

    const editorRender = () => {
        const editorId = props?.id !== undefined ? `$slateEditor_${props.id}` : `slateEditor_${Math.floor(Math.random() * 1000)}`;
        return (
            <div className={classes.editorContainer} onClick={() => focusEditor()}>
                {toolbar()}
                <Slate editor={slateEditor}
                    value={value}
                    onChange={newValue => setValue(newValue)}>
                    <Editable
                        className={classes.slateEditor}
                        id={editorId}
                        renderLeaf={renderLeaf}
                        renderElement={renderElement}
                        onKeyDown={event => {
                            handleKeyCommand(event)
                        }} />
                </Slate>
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