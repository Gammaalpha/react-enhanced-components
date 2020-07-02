import React, { useState, useMemo, useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Tooltip, MenuItem, Select, FormControl } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import "./RichTextEditor.css"
import { IRichText, IToolbarButton, TextStyleType, TextStyle, BlockFormat, BlockFormatType } from './model/RichText';
import Icon from "@material-ui/core/Icon"
import { createEditor, Editor, Transforms, Text } from 'slate'
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
    monospacedStyle: {
        backgroundColor: 'lightgray',
        padding: 10,
        // borderLeft: '5px solid gray'
    },
    pullQuoteStyle: {
        padding: 32,
        textAlign: 'center',
        fontSize: 24,
        fontStyle: 'italic',
        borderLeft: 'none',
        borderRight: 'none',
        margin: '28px 0 28px 0'
    },

    headingOneStyle: {
        backgroundColor: 'lightgray',
        padding: 10,
        // borderLeft: '5px solid gray'
    },
    headingTwoStyle: {
        backgroundColor: 'lightgray',
        padding: 10,
        // borderLeft: '5px solid gray'
    },
    headingThreeStyle: {
        backgroundColor: 'lightgray',
        padding: 10,
        // borderLeft: '5px solid gray'
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
            // paddingRight: 0,
            paddingLeft: 0,

        }
    },
    toolbar: {
        minHeight: '50px',
        paddingLeft: '5px',
        paddingRight: '5px',

    }
}))


export const RichTextEditor = (props: IRichText) => {

    const classes = useStyles()
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

    // const callbacks: any = {}

    const buttonsArray: IToolbarButton[] = [
        {
            key: 'formatText',
            icon: '',
            tooltip: '',
            value: 0,
            ariaLabel: 'Format Text selection',
            position: 'top',
            buttonStyle: classes.selectEmpty,
            childButtons: [
                {
                    key: 'normal',
                    icon: '',
                    tooltip: '',
                    buttonText: "Normal Text",
                    value: 0,
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onBlockStyleClick(e, BlockFormatType.normal),
                    ariaLabel: 'Normal text formatting',
                    position: 'top',
                    buttonStyle: '',
                },
                {
                    key: 'heading_1',
                    icon: '',
                    tooltip: '',
                    buttonText: "Heading 1",
                    value: 1,
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onBlockStyleClick(e, BlockFormatType.headingOne),
                    ariaLabel: 'Heading 1 formatting',
                    position: 'top',
                    buttonStyle: '',
                }
                ,
                {
                    key: 'heading_2',
                    icon: '',
                    tooltip: '',
                    buttonText: "Heading 2",
                    value: 2,
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onBlockStyleClick(e, BlockFormatType.headingTwo),
                    ariaLabel: 'Heading 2 formatting',
                    position: 'top',
                    buttonStyle: '',
                },
                {
                    key: 'heading_3',
                    icon: '',
                    tooltip: '',
                    buttonText: "Heading 3",
                    value: 3,
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onBlockStyleClick(e, BlockFormatType.headingThree),
                    ariaLabel: 'Heading 3 formatting',
                    position: 'top',
                    buttonStyle: '',
                }
                ,
                {
                    key: 'pullQuote',
                    icon: '',
                    tooltip: '',
                    buttonText: "Pull Quote",
                    value: 4,
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onBlockStyleClick(e, BlockFormatType.pullQuote),
                    ariaLabel: 'Pull Quote formatting',
                    position: 'top',
                    buttonStyle: '',
                }
                ,
                {
                    key: 'monospaced',
                    icon: '',
                    tooltip: '',
                    buttonText: "Monospaced",
                    value: 5,
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onBlockStyleClick(e, BlockFormatType.monospaced),
                    ariaLabel: 'Heading 3 formatting',
                    position: 'top',
                    buttonStyle: '',
                }
            ]
        },
        {
            key: 'bold',
            icon: 'format_bold',
            tooltip: 'Bold (Ctrl+B)',
            ariaLabel: 'Bold Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onStyleButtonClick(e, TextStyleType.bold),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'italic',
            icon: 'format_italic',
            tooltip: 'Italic (Ctrl+I)',
            ariaLabel: 'Italic Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onStyleButtonClick(e, TextStyleType.italic),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'underline',
            icon: 'format_underlined',
            tooltip: 'Underline (Ctrl+U)',
            ariaLabel: 'Underline Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onStyleButtonClick(e, TextStyleType.underline),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'strikeThrough',
            icon: 'strikethrough_s',
            tooltip: 'Strike Through',
            ariaLabel: 'Underline Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onStyleButtonClick(e, TextStyleType.strikeThrough),
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onLeftAlignClick(e),
                    position: 'right',
                    value: 'left',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'center',
                    icon: 'format_align_center',
                    tooltip: 'Align Center',
                    ariaLabel: 'Align Center',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onCenterAlignClick(e),
                    position: 'right',
                    value: 'center',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'justify',
                    icon: 'format_align_justify',
                    tooltip: 'Align Center Justify',
                    ariaLabel: 'Align Center Justify',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onCenterAlignClick(e),
                    position: 'right',
                    value: 'justify',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'right',
                    icon: 'format_align_right',
                    tooltip: 'Align Right',
                    ariaLabel: 'Align Right',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onRightAlignClick(e),
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onUnOrderedListClick(e),
                    position: 'right',
                    value: 'unordered_list',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'format_list_numbered',
                    icon: 'format_list_numbered',
                    tooltip: 'Ordered list',
                    ariaLabel: 'Ordered list',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onOrderedListClick(e),
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
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onInsertLinkClick(e),
            position: 'top',
            value: 'insertLink',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'link_off',
            icon: 'link_off',
            tooltip: 'Remove link',
            ariaLabel: 'Remove link',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onRemoveLinkClick(e),
            position: 'top',
            value: 'removeLink',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'indent_left',
            icon: 'format_indent_decrease',
            tooltip: 'Indent left',
            ariaLabel: 'Indent left',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onLeftIndentClick(e),
            position: 'top',
            value: 'indent_left',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'indent_right',
            icon: 'format_indent_increase',
            tooltip: 'Indent right',
            ariaLabel: 'Indent right',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onRightIndentClick(e),
            position: 'top',
            value: 'indent_right',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'format_clear',
            icon: 'format_clear',
            tooltip: 'Format Clear',
            ariaLabel: 'Clear all formatting',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onClearFormatClick(e),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
    ]



    const renderToolbarButtons = () => {
        const toolbarButtons: any[] = []
        buttonsArray.forEach((element: IToolbarButton) => {
            toolbarButtons.push(CreateStyleButton(element))
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
    const manageIndent = (indentValue: any, type: string) => {
        let tempIndentVal = 0;
        if (typeof indentValue === 'number') {
            tempIndentVal = indentValue
            switch (type) {
                case 'add':
                    tempIndentVal++;
                    break;
                case 'remove':
                    if (indentValue > 0) {
                        tempIndentVal--;
                    }
                    break
                default:
                    console.error("error encountered in indent function");
                    break;
            }
        }
        return tempIndentVal
    }
    const CustomEditor = {
        isTextStyleActive(editor: any, textStyle: TextStyle) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n[textStyle] === true,
            })
            return !!match
        },
        isBlockStyleActive(editor: any, styleFormat: BlockFormat) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n.type === styleFormat,
            })
            return !!match
        },
        isPullQuoteBlockActive(editor: any) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n.type === 'pullQuote',
            })
            return !!match
        },
        isMonospacedBlockActive(editor: any) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n.type === 'monospaced',
            })
            return !!match
        },
        toggleTextStyleMark(editor: any, textStyle: TextStyle) {
            const isActive = CustomEditor.isTextStyleActive(editor, textStyle)
            Transforms.setNodes(
                editor,
                { [textStyle]: isActive ? null : true },
                {
                    match: (n: any) => Text.isText(n), split: true
                }
            )
        },
        toggleBlockStyle(editor: any, styleFormat: BlockFormat) {
            const isActive = CustomEditor.isBlockStyleActive(editor, styleFormat)
            const normalCheck = (style: string) =>
                style === "normal" ? null : style
            Transforms.setNodes(
                editor,
                { type: isActive ? null : normalCheck(styleFormat) },
                {
                    match: (n: any) => Editor.isBlock(editor, n)
                }
            )
        },
        currentIndent(editor: any) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n?.indent ? n.indent : 0
            })
            return match !== undefined ? match[0]?.indent : 0;
        },
        rightIndent(editor: any) {
            const currentIndent = CustomEditor.currentIndent(editor);
            console.log(currentIndent);
            Transforms.setNodes(
                editor,
                {
                    indent: manageIndent(currentIndent, 'add')
                },
                {
                    match: (n: any) => Text.isText(n) || Editor.isBlock(editor, n)
                }
            )
        },
        leftIndent(editor: any) {
            const currentIndent = CustomEditor.currentIndent(editor);
            Transforms.setNodes(
                editor,
                {
                    indent: manageIndent(currentIndent, 'remove')
                },
                {
                    match: (n: any) => Text.isText(n) || Editor.isBlock(editor, n)
                }
            )
        },
        clearFormat(editor: any) {
            Transforms.setNodes(
                editor,
                {
                    indent: 0,
                    bold: false,
                    italic: false,
                    underline: false,
                    strikeThrough: false,
                },
                {
                    match: (n: any) => Text.isText(n) || Editor.isBlock(editor, n), split: true
                }
            )
        }
    }
    const ButtonActions = {
        _onStyleButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, styleFormat: TextStyle) {
            e.preventDefault();
            CustomEditor.toggleTextStyleMark(slateEditor, styleFormat);
        },
        _onBlockStyleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, blockFormat: BlockFormat) {
            e.preventDefault();
            ;
            CustomEditor.toggleBlockStyle(slateEditor, blockFormat);
        },
        _onLeftAlignClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
        },
        _onCenterAlignClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();

        },
        _onRightAlignClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
        },
        _onCenterJustifiedAlignClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
        },
        _onUnOrderedListClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
        },
        _onOrderedListClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
        },
        _onInsertLinkClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
        },
        _onRemoveLinkClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
        },
        _onRightIndentClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
            CustomEditor.rightIndent(slateEditor);

        },
        _onLeftIndentClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
            CustomEditor.leftIndent(slateEditor);

        },
        _onClearFormatClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
            CustomEditor.clearFormat(slateEditor);

        }


    }

    const handleKeyCommand = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!event.ctrlKey) {
            return
        }
        switch (event.key) {
            case '`':
                {
                    event.preventDefault()
                    CustomEditor.toggleBlockStyle(slateEditor, BlockFormatType.monospaced)
                    break
                }
            case 'b':
                {
                    event.preventDefault()
                    CustomEditor.toggleTextStyleMark(slateEditor, TextStyleType.bold)
                    break
                }
            case 'i':
                {
                    event.preventDefault()
                    CustomEditor.toggleTextStyleMark(slateEditor, TextStyleType.italic)
                    break
                }
            case 'u':
                {
                    event.preventDefault()
                    CustomEditor.toggleTextStyleMark(slateEditor, TextStyleType.underline)
                    break
                }
            default:
                break;
        }
    }

    const MonospacedElement = (props: any) => {
        return (
            <pre {...props.attributes} className={classes.monospacedStyle}>
                <code>{props.children}</code>
            </pre>
        )
    }

    const PullQuote = (props: any) => {
        return (
            <pre {...props.attributes} >
                <blockquote className={classes.pullQuoteStyle}>
                    {props.children}
                </blockquote>
            </pre>
        )
    }
    // const NormalText = (props: any) => {
    //     ;
    //     return (
    //         <pre {...props.attributes} >
    //             <p>
    //                 {props.children}
    //             </p>
    //         </pre>
    //     )
    // }

    const Heading = (props: any, headingType: string) => {
        let heading;
        switch (headingType) {
            case 'heading_1':
                heading = (<h1>
                    {props.children}
                </h1>)
                break;
            case 'heading_2':
                heading = (<h2>
                    {props.children}
                </h2>)
                break;
            case 'heading_3':
                heading = (<h3>
                    {props.children}
                </h3>)
                break;
            default:
                console.error("Error in header setting.ks")

                break;
        }

        return (
            <pre {...props.attributes} >
                {heading}
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
            case 'monospaced':
                return <MonospacedElement {...props} />
            case 'pullQuote':
                return <PullQuote {...props} />
            // case 'normal':
            //     return <NormalText {...props} />
            case 'heading_1':
                return Heading(props, 'heading_1')
            // return <Heading {...props, 'heading_1'} />
            case 'heading_2':
                return Heading(props, 'heading_2')

            // return <Heading {...props, 'heading_2'} />
            case 'heading_3':
                return Heading(props, 'heading_3')

            // return <Heading {...props, 'heading_3'} />
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
                    paddingLeft: (`${props.leaf.indent * 40}px`)
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


function CreateStyleButton(buttonData: IToolbarButton) {
    const [selection, setSelection] = useState(buttonData.value)
    const buttonStyles = makeStyles(() => createStyles({
        buttonLabel: {
            justifyContent: "start",
            padding: '0 0 0 6px',
            minWidth: 'auto'
        },
        menuWidth: {
            minWidth: 'auto',
            paddingLeft: '0 0 0 3px'
        }
    }))

    const handleCallback = (event: any) => {
        ;
        if (buttonData?.childButtons) {
            const item = buttonData.childButtons.filter((x) => x.value === event.target.value)
            // console.log(item[0].buttonText);
            item[0].callback(event);
            setSelection(event.target.value)
        }
    }
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
                                id={`${buttonData.key}_Id`}
                                value={selection}
                                onChange={(event: any) => {

                                    handleCallback(event);
                                }}
                            >
                                {
                                    buttonData.childButtons.map((button) => (
                                        <MenuItem

                                            disabled={button.disabled} className={classes.menuWidth} key={button.key} value={button.value}>
                                            <Tooltip placement={button?.position ? button.position : "top"} title={`${button.tooltip}`}>
                                                <div className={classes.buttonLabel}>
                                                    {button?.icon ?
                                                        <div>
                                                            <Icon>
                                                                {button.icon}
                                                            </Icon> {button?.buttonText}
                                                        </div>
                                                        : button?.buttonText}
                                                </div>
                                            </Tooltip>
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Tooltip>
                    </FormControl>
                    : <Tooltip placement={buttonData?.position ? buttonData.position : "top"} title={`${buttonData.tooltip}`}>
                        <Button disabled={buttonData.disabled} aria-label={buttonData.ariaLabel} onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => buttonData.callback(e)} className={buttonData.buttonStyle}>
                            <Icon>{buttonData.icon}</Icon>
                            {buttonData?.buttonText}
                        </Button>
                    </Tooltip>
            }
        </div >
    )
}