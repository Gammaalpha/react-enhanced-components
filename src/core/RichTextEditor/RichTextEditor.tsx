import React, { useState, useRef } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import "./RichTextEditor.css"
import { IRichText, IToolbarButton, TextStyle } from './model/RichText';
import Icon from "@material-ui/core/Icon"
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CreateStyleButton } from './CreateStyleButton';
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
const randNum = Math.floor(Math.random() * 1000)

export const RichTextEditor = (props: IRichText) => {
    const [fontStyle, setFontStyle] = useState('paragraph');
    const [alignment, setAlignment] = useState('left')
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

    const CustomEditor =
        [
            function _onStyleMarkClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, style: TextStyle) {

            }
        ]



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

    const toolbarArray: IToolbarButton[] = [
        {
            key: 'ql-header',
            className: 'ql-header',
            value: fontStyle,
            icon: '',
            tooltip: 'Text Format',
            ariaLabel: 'Format Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            buttonStyle: classes.blockStyle,
            childButtons: [
                {
                    key: 'header1',
                    className: 'header1',
                    value: 1,
                    icon: '',
                    tooltip: '',
                    buttonText: 'Header 1',
                    ariaLabel: 'Header 1 Selection',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
                    position: 'top',
                    buttonStyle: '',
                },
                {
                    key: 'header2',
                    className: 'header2',
                    value: 2,
                    icon: '',
                    tooltip: '',
                    buttonText: 'Header 2',

                    ariaLabel: 'Header 2 Selection',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
                    position: 'top',
                    buttonStyle: '',
                },
                {
                    key: 'header3',
                    className: 'header3',
                    value: 3,
                    icon: '',
                    tooltip: '',
                    buttonText: 'Header 3',

                    ariaLabel: 'Header 3 Selection',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
                    position: 'top',
                    buttonStyle: '',
                },

                {
                    key: 'pullQuote',
                    icon: '',
                    tooltip: '',
                    buttonText: "Pull Quote",
                    value: 'pullQuote',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist()
                    ,
                    ariaLabel: 'Pull Quote formatting',
                    position: 'top',
                    buttonStyle: '',
                },
                {
                    key: 'monospaced',
                    icon: '',
                    tooltip: '',
                    buttonText: "Monospaced",
                    value: 'monospaced',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
                    ariaLabel: 'Heading 3 formatting',
                    position: 'top',
                    buttonStyle: '',
                },
                {
                    key: 'normal',
                    className: 'normal',
                    value: 'paragraph',
                    icon: '',
                    tooltip: '',
                    buttonText: 'Normal',

                    ariaLabel: 'Normal Selection',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
                    position: 'top',
                    buttonStyle: '',
                }
            ]
        },
        {
            key: 'ql-bold',
            className: 'ql-bold',
            value: '',
            icon: 'format_bold',
            tooltip: 'Bold (Ctrl+B)',
            buttonText: '',
            ariaLabel: 'Bold Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'ql-italic',
            className: 'ql-italic',
            value: '',
            icon: 'format_italic',
            tooltip: 'Italic (Ctrl+I)',
            buttonText: '',
            ariaLabel: 'Italic Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'ql-underline',
            className: 'ql-underline',
            value: '',
            icon: 'format_underline',
            tooltip: 'underline (Ctrl+I)',
            buttonText: '',
            ariaLabel: 'underline Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'ql-strike',
            className: 'ql-strike',
            value: '',
            icon: 'strikethrough_s',
            tooltip: 'Strikethrough',
            buttonText: '',
            ariaLabel: 'Strike Through Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'bulleted',
            className: 'ql-list',
            value: 'bulleted',
            icon: 'format_list_bulleted',
            tooltip: 'Bullet points',
            buttonText: '',
            ariaLabel: 'Bullet points',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'numbered',
            className: 'ql-list',
            value: 'numbered',
            icon: 'format_list_numbered',
            tooltip: 'Strikethrough',
            buttonText: '',
            ariaLabel: 'Strike Through Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
                    position: 'right',
                    value: 'left',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'center',
                    icon: 'format_align_center',
                    tooltip: 'Align Center',
                    ariaLabel: 'Align Center',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
                    position: 'right',
                    value: 'center',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'justify',
                    icon: 'format_align_justify',
                    tooltip: 'Justify',
                    ariaLabel: 'Justify',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
                    position: 'right',
                    value: 'justify',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'right',
                    icon: 'format_align_right',
                    tooltip: 'Align Right',
                    ariaLabel: 'Align Right',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
                    position: 'right',
                    value: 'right',
                    buttonStyle: classes.cmdButton
                },

            ]
        }, {
            key: 'insert_link',
            icon: 'insert_link',
            tooltip: 'Insert link',
            ariaLabel: 'Insert link',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            value: 'insertLink',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'link_off',
            icon: 'link_off',
            tooltip: 'Remove link',
            ariaLabel: 'Remove link',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            value: 'removeLink',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'indent_left',
            icon: 'format_indent_decrease',
            tooltip: 'Indent left',
            ariaLabel: 'Indent left',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            value: 'indent_left',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'indent_right',
            icon: 'format_indent_increase',
            tooltip: 'Indent right',
            ariaLabel: 'Indent right',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            value: 'indent_right',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'format_clear',
            icon: 'format_clear',
            tooltip: 'Format Clear',
            ariaLabel: 'Clear all formatting',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'abbreviation',
            icon: '',
            tooltip: 'Abbreviation',
            buttonText: '<abbr>',
            ariaLabel: 'Add Abbreviation over selected text',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.persist(),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
    ]


    const renderToolbarButtons = () => {
        const toolbarButtons: any[] = []
        toolbarArray.forEach((element: IToolbarButton) => {
            toolbarButtons.push(CreateStyleButton(element))
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

    const linkOff = () => <Icon>link_off</Icon>

    const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        // [{ 'header': 1 }, { 'header': 2 }],            // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ['image', 'video'],
        [{ 'align': [] }],
        ['link'],                                         // link
        ['linkOff'],
        ['clean'],                                        // remove formatting button
    ];

    const modules = {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                'linkOff': (value: any) => {
                    console.log("linkOff: ", value);
                }
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
        const editorId = props?.id !== undefined ? `$quillEditor_${props.id}` : `quillEditor_${randNum}`;

        // icons['linkOff'] = linkOff;
        return (
            <div>
                {/* <Button onClick={() => {
                    console.log(editorRef);
                }}>Ref</Button> */}
                <div className={classes.editorContainer} onClick={() => focusEditor()}>
                    {toolbar()}
                    <ReactQuill
                        ref={editorRef}
                        id={editorId}
                        // formats={formats}
                        modules={modules}
                        theme={"snow"}
                        value={value}
                        onChange={setValue} />
                </div>
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


