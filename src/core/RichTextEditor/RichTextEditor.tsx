import React, { useState, useMemo, useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import "./RichTextEditor.css"
import { IRichText, IToolbarButton, TextStyleType, TextStyle, BlockFormat, BlockFormatType, TextAlignment, TextAlignmentType, LIST_TYPES } from './model/RichText';
import { createEditor, Editor, Transforms, Text, Node, Path } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { CreateStyleButton } from './CreateStyleButton';
import { format } from 'path';



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
        minHeight: 150,
        fontFamily: 'inherit'
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
        height: 40,
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
        borderLeft: 'none',
        borderRight: 'none',
        textAlign: 'center',
        fontSize: 24,
        margin: '28px 0 28px 0',
        borderTop: '2px solid lightgray',
        borderBottom: '2px solid lightgray',
        '& span': {
            fontStyle: 'italic',
        }

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
        // minHeight: '25px',
        minWidth: '40px',
        '&:hover': {
            backgroundColor: 'darkgray'
        },
        '&>.MuiInputBase-root>.MuiSelect-root': {
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 0,
            height: 25,
            marginTop: 5
        }
    },
    paragraph: {
        fontSize: '12pt'
    },
    blockStyle: {
        marginRight: theme.spacing(1),
        backgroundColor: 'lightgray',
        // minHeight: '25px',
        minWidth: '135px',
        '&:hover': {
            backgroundColor: 'darkgray'
        },
        '&>.MuiInputBase-root>.MuiSelect-root': {
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 0,
            height: 25,
            marginTop: 5
        }
    },
    toolbar: {
        minHeight: '50px',
        paddingLeft: '5px',
        paddingRight: '5px',

    }
}))
const randNum = Math.floor(Math.random() * 1000)

export const RichTextEditor = (props: IRichText) => {
    const [fontStyle, setFontStyle] = useState('paragraph');
    const [alignment, setAlignment] = useState('left')
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

    let buttonsArray: IToolbarButton[] = [
        {
            key: 'formatText',
            icon: '',
            tooltip: '',
            value: fontStyle,
            ariaLabel: 'Format Text selection',
            position: 'top',
            buttonStyle: classes.blockStyle,
            childButtons: [
                {
                    key: 'normal',
                    icon: '',
                    tooltip: '',
                    buttonText: "Normal Text",
                    value: 'paragraph',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onBlockStyleClick(e, BlockFormatType.paragraph),
                    ariaLabel: 'Normal text formatting',
                    position: 'top',
                    buttonStyle: '',
                },
                {
                    key: 'heading_1',
                    icon: '',
                    tooltip: '',
                    buttonText: "Heading 1",
                    value: 'heading_1',
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
                    value: 'heading_2',
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
                    value: 'heading_3',
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
                    value: 'pullQuote',
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
                    value: 'monospaced',
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
            value: alignment,
            ariaLabel: 'Text Alignment',
            position: 'top',
            buttonStyle: classes.selectEmpty,
            childButtons: [
                {
                    key: 'left',
                    icon: 'format_align_left',
                    tooltip: 'Align Left',
                    ariaLabel: 'Align Left',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onTextAlignClick(e, TextAlignmentType.left),
                    position: 'right',
                    value: 'left',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'center',
                    icon: 'format_align_center',
                    tooltip: 'Align Center',
                    ariaLabel: 'Align Center',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onTextAlignClick(e, TextAlignmentType.center),
                    position: 'right',
                    value: 'center',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'justify',
                    icon: 'format_align_justify',
                    tooltip: 'Justify',
                    ariaLabel: 'Justify',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onTextAlignClick(e, TextAlignmentType.justify),
                    position: 'right',
                    value: 'justify',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'right',
                    icon: 'format_align_right',
                    tooltip: 'Align Right',
                    ariaLabel: 'Align Right',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onTextAlignClick(e, TextAlignmentType.right),
                    position: 'right',
                    value: 'right',
                    buttonStyle: classes.cmdButton
                },

            ]
        },
        {
            key: 'format_list_bulleted',
            icon: 'format_list_bulleted',
            tooltip: 'Unordered list',
            ariaLabel: 'Unordered list',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onBlockStyleClick(e, BlockFormatType.bulletedList),
            position: 'right',
            value: 'bulleted-list',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'format_list_numbered',
            icon: 'format_list_numbered',
            tooltip: 'Ordered list',
            ariaLabel: 'Ordered list',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onBlockStyleClick(e, BlockFormatType.numberedList),
            position: 'right',
            value: 'numbered-list',
            buttonStyle: classes.cmdButton
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
        {
            key: 'abbreviation',
            icon: '',
            tooltip: 'Abbreviation',
            buttonText: '<abbr>',
            ariaLabel: 'Add Abbreviation over selected text',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => ButtonActions._onAddAbbrClick(e),
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
        isTextStyleMarksActive(editor: any, textStyle: TextStyle) {
            // const [match] = Editor.nodes(editor, {
            //     match: (n: any) => n[textStyle] === true,
            // })
            // return !!match
            const marks = Editor.marks(editor);
            return marks ? marks[textStyle] === true : false;
        },
        isBlockStyleActive(editor: any, styleFormat: BlockFormat) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n.type === styleFormat,
            })
            return !!match
        },
        getCurrentAlignment(editor: any, textAlignment: TextAlignment) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n.alignment === textAlignment,
            })
            return !!match
        },
        toggleTextStyleMark(editor: any, textStyle: TextStyle) {
            const isActive = CustomEditor.isTextStyleMarksActive(editor, textStyle)
            if (isActive) {
                slateEditor.removeMark(textStyle)
            }
            else {
                slateEditor.addMark(textStyle, true)
            }
        },
        toggleTextAlignment(editor: any, textAlignment: TextAlignment) {
            const isActive = CustomEditor.getCurrentAlignment(editor, textAlignment)
            Transforms.setNodes(
                editor,
                { alignment: isActive ? TextAlignmentType.left : textAlignment },
                {
                    match: (n: any) => Editor.isBlock(editor, n)
                }
            )
        },
        toggleBlockStyle(editor: any, styleFormat: BlockFormat) {
            const isActive = CustomEditor.isBlockStyleActive(editor, styleFormat)
            const isList = LIST_TYPES.includes(styleFormat)
            Transforms.unwrapNodes(editor, {
                match: (n: any) => LIST_TYPES.includes(n.type),
                split: true,
            })
            // Transforms.setNodes(
            //     editor,
            //     { type: isActive ? BlockFormatType.paragraph : styleFormat },
            //     {
            //         match: (n: any) => Editor.isBlock(editor, n)
            //     }
            // )
            Transforms.setNodes(editor,
                {
                    type: isActive ? BlockFormatType.paragraph : isList ? 'list-item' : styleFormat,
                })

            if (!isActive && isList) {
                const block = { type: styleFormat, children: [] }
                Transforms.wrapNodes(editor, block)
            }
        },
        currentIndent(editor: any) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n?.indent ? n.indent : 0
            })
            return match !== undefined ? match[0]?.indent : 0;
        },
        indent(editor: any, type: string) {
            const currentIndent = CustomEditor.currentIndent(editor);
            Transforms.setNodes(
                editor,
                {
                    indent: manageIndent(currentIndent, type)
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
                    alignment: 'left'
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
            CustomEditor.toggleBlockStyle(slateEditor, blockFormat);
        },
        _onTextAlignClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, alignmentType: TextAlignment) {
            e.preventDefault();
            CustomEditor.toggleTextAlignment(slateEditor, alignmentType)
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
            CustomEditor.indent(slateEditor, 'add');

        },
        _onLeftIndentClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
            CustomEditor.indent(slateEditor, 'remove');

        },
        _onClearFormatClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
            CustomEditor.clearFormat(slateEditor);

        },
        _onAddAbbrClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();
            console.log("Add Abbreviation");

        }


    }


    const setFontStyleDropdown = (data: any) => {
        setFontStyle(data)
    }

    const updateValue = (value: Node[]) => {
        // event.preventDefault()
        // console.log('value:', value);

        // console.log("fragment: ", slateEditor.getFragment());
        // console.log("slate: ", slateEditor.selection);
        let path: Path | undefined = slateEditor?.selection?.focus.path!

        if (path !== undefined) {
            const style = value[path[0]]
            setFontStyleDropdown(style?.type)
        }
    }

    const handleKeyCommand = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const key = event.key;
        console.log("key press:", key);
        if (event.ctrlKey) {
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
                    return;
                // break;
            }

        }
        if (key === "Enter") {
            // event.preventDefault();
            // debugger;
            console.log("Derp");
            return;
        }

    }


    const BlockSection = (props: any, headingType: string) => {
        let section;
        switch (headingType) {
            case 'monospaced':
                section = <code>{props.children}</code>
                break;
            case 'pullQuote':
                section = <blockquote className={classes.pullQuoteStyle}>
                    {props.children}
                </blockquote>
                break;
            case 'paragraph':
                section = <p>{props.children}</p>
                break;
            case 'heading_1':
                section = (<h1>
                    {props.children}
                </h1>)
                break;
            case 'heading_2':
                section = (<h2>
                    {props.children}
                </h2>)
                break;
            case 'heading_3':
                section = (<h3>
                    {props.children}
                </h3>)
                break;
            case 'bulleted-list':
                section = (<ul>
                    {props.children}
                </ul>)
                break;

            case 'numbered-list':
                section = (<ol>
                    {props.children}
                </ol>)
                break;
            case 'list-item':
                section = (<li>
                    {props.children}
                </li>)
                break;
            default:
                section = <p>{props.children}</p>
                break;
        }

        return (
            <pre {...props.attributes} className={headingType === 'monospaced' ? classes.monospacedStyle : ''} style={{
                textAlign: props.element.alignment
            }}>
                {section}
            </pre>
        )
    }


    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.
    const renderElement = useCallback((props: any) => {
        console.log("Block props: ", props);

        return BlockSection(props, props.element.type)
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
                    paddingLeft: (`${props.leaf.indent * 40}px`),
                }}
            >
                {props.children}
            </span>
        )
    }



    const editorRender = () => {
        const editorId = props?.id !== undefined ? `$slateEditor_${props.id}` : `slateEditor_${randNum}`;
        return (
            <div className={classes.editorContainer} onClick={() => focusEditor()}>
                {toolbar()}
                <Slate
                    editor={slateEditor}
                    value={value}
                    onChange={(newValue: any) => {
                        updateValue(newValue)
                        setValue(newValue)
                    }}
                >
                    <Editable
                        placeholder="Enter some rich text…"
                        spellCheck
                        className={classes.slateEditor}
                        id={editorId}
                        renderLeaf={renderLeaf}
                        renderElement={renderElement}
                        onKeyDown={(event: any) => {
                            handleKeyCommand(event)
                        }} />
                </Slate>
            </div >
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


