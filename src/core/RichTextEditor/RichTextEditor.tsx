import React, { useState, useRef, useMemo, useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Tooltip, MenuItem, Select, FormControl, FormHelperText, InputLabel } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import "./RichTextEditor.css"
import { IRichText, IToolbarButton } from './model/RichText';
import Icon from "@material-ui/core/Icon"
import { createEditor, Editor, Transforms, Range, Text } from 'slate'
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
    codeStyle: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderLeft: '5px solid gray'
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
    function focusEditor() {
        ReactEditor.focus(slateEditor)
    }

    const callbacks: any = {}

    const buttonsArray: IToolbarButton[] = [
        {
            key: 'bold',
            icon: 'format_bold',
            tooltip: 'Bold (Ctrl+B)',
            ariaLabel: 'Bold Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onBoldClick(e),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'italic',
            icon: 'format_italic',
            tooltip: 'Italic (Ctrl+I)',
            ariaLabel: 'Italic Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onItalicClick(e),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'underline',
            icon: 'format_underlined',
            tooltip: 'Underline (Ctrl+U)',
            ariaLabel: 'Underline Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onUnderlineClick(e),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'strikeThrough',
            icon: 'strikethrough_s',
            tooltip: 'Strike Through',
            ariaLabel: 'Underline Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onStrikeThroughClick(e),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'textAlign',
            icon: 'format_align_justify',
            tooltip: '',
            value: 'left',
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
                    value: 'left',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'center',
                    icon: 'format_align_center',
                    tooltip: 'Align Center',
                    ariaLabel: 'Align Center',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onCenterAlignClick(e),
                    position: 'right',
                    value: 'center',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'justify',
                    icon: 'format_align_justify',
                    tooltip: 'Align Center Justify',
                    ariaLabel: 'Align Center Justify',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onCenterAlignClick(e),
                    position: 'right',
                    value: 'justify',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'right',
                    icon: 'format_align_right',
                    tooltip: 'Align Right',
                    ariaLabel: 'Align Right',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onRightAlignClick(e),
                    position: 'right',
                    value: 'right',
                    buttonStyle: classes.cmdButton
                },

            ]
        },
        {
            key: 'order',
            icon: 'format_list_bulleted',
            tooltip: '',
            value: 'unordered_list',
            ariaLabel: 'Text Alignment',
            position: 'top',
            buttonStyle: classes.selectEmpty,
            childButtons: [
                {
                    key: 'format_list_bulleted',
                    icon: 'format_list_bulleted',
                    tooltip: 'Unordered list',
                    ariaLabel: 'Unordered list',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onLeftAlignClick(e),
                    position: 'right',
                    value: 'unordered_list',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'format_list_numbered',
                    icon: 'format_list_numbered',
                    tooltip: 'Ordered list',
                    ariaLabel: 'Ordered list',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onCenterAlignClick(e),
                    position: 'right',
                    value: 'ordered_list',
                    buttonStyle: classes.cmdButton
                }
            ],

        },
        {
            key: 'insert_link',
            icon: 'insert_link',
            tooltip: 'Insert link',
            ariaLabel: 'Insert link',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onRightAlignClick(e),
            position: 'right',
            value: 'insertLink',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'link_off',
            icon: 'link_off',
            tooltip: 'Remove link',
            ariaLabel: 'Remove link',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => _onRightAlignClick(e),
            position: 'right',
            value: 'removeLink',
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

    const CustomEditor = {
        isBoldMarkActive(editor: any) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n.bold === true,
            })
            return !!match
        },
        isItalicMarkActive(editor: any) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n.italic === true,
            })
            return !!match
        },
        isUnderlineMarkActive(editor: any) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n.underline === true,
            })
            return !!match
        },
        isStrikeThroughMarkActive(editor: any) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n.strikeThrough === true,
            })
            return !!match
        },
        isCodeBlockActive(editor: any) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n.type === 'code',
            })
            return !!match
        },
        toggleBoldMark(editor: any) {
            const isActive = CustomEditor.isBoldMarkActive(editor)
            Transforms.setNodes(
                editor,
                { bold: isActive ? null : true },
                {
                    match: (n: any) => Text.isText(n), split: true
                }
            )
        },
        toggleItalicMark(editor: any) {
            const isActive = CustomEditor.isItalicMarkActive(editor)
            Transforms.setNodes(
                editor,
                { italic: isActive ? null : true },
                {
                    match: (n: any) => Text.isText(n), split: true
                }
            )
        },
        toggleUnderlineMark(editor: any) {
            const isActive = CustomEditor.isUnderlineMarkActive(editor)
            Transforms.setNodes(
                editor,
                { underline: isActive ? null : true },
                {
                    match: (n: any) => Text.isText(n), split: true
                }
            )
        },
        toggleStrikeThoughMark(editor: any) {
            const isActive = CustomEditor.isStrikeThroughMarkActive(editor)
            Transforms.setNodes(
                editor,
                { strikeThrough: isActive ? null : true },
                {
                    match: (n: any) => Text.isText(n), split: true
                }
            )
        },
        toggleCodeBlock(editor: any) {
            const isActive = CustomEditor.isCodeBlockActive(editor)
            Transforms.setNodes(
                editor,
                { type: isActive ? null : 'code' },
                {
                    match: (n: any) => Editor.isBlock(editor, n)
                }
            )
        }
    }
    const _onBoldClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        CustomEditor.toggleBoldMark(slateEditor);
    }

    const _onItalicClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        CustomEditor.toggleItalicMark(slateEditor);

    }
    const _onUnderlineClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        CustomEditor.toggleUnderlineMark(slateEditor)
    }
    const _onStrikeThroughClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        CustomEditor.toggleStrikeThoughMark(slateEditor)
    }
    const _onCodeClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        CustomEditor.toggleCodeBlock(slateEditor);
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

    const handleKeyCommand = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!event.ctrlKey) {
            return
        }
        switch (event.key) {
            case '`':
                {
                    event.preventDefault()
                    CustomEditor.toggleCodeBlock(slateEditor)
                    break
                }
            case 'b':
                {
                    event.preventDefault()
                    CustomEditor.toggleBoldMark(slateEditor)
                    break
                }
            case 'i':
                {
                    event.preventDefault()
                    CustomEditor.toggleItalicMark(slateEditor)
                    break
                }
            case 'u':
                {
                    event.preventDefault()
                    CustomEditor.toggleUnderlineMark(slateEditor)
                    break
                }
            default:
                break;
        }
    }

    const CodeElement = (props: any) => {
        return (
            <pre {...props.attributes} className={classes.codeStyle}>
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
        console.log("leaf: ", props);
        const textDecoration = () => {
            const decoration = []
            if (props.leaf.underline) {
                decoration.push('underline')
            }
            if (props.leaf.strikeThrough) {
                decoration.push('line-through')
            }            
            return decoration.length > 0 ? decoration.join(" ") : 'none'
        }
        return (
            <span
                {...props.attributes}
                style={{
                    fontWeight: props.leaf.bold ? 'bold' : 'normal',
                    fontStyle: props.leaf.italic ? 'italic' : 'normal',
                    textDecoration: textDecoration(),
                }}
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
                    onChange={(newValue: any) => setValue(newValue)}>
                    <Editable
                        className={classes.slateEditor}
                        id={editorId}
                        renderLeaf={renderLeaf}
                        renderElement={renderElement}
                        onKeyDown={(event: any) => {
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
                                        <MenuItem className={classes.menuWidth} key={button.key} value={button.value}>
                                            <Tooltip placement={button?.position ? button.position : "top"} title={`${button.tooltip}`}>
                                                <Button className={classes.buttonLabel} onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => button.callback(e)}>
                                                    <Icon>
                                                        {button.icon}
                                                    </Icon>
                                                    {button?.buttonText}
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