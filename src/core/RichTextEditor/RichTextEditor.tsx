import React, { useState, useRef, useEffect, useReducer } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import "./RichTextEditor.css"
import { IRichText, IToolbarButton, TextStyle, TextStyleType, IndentDir, IndentDirType } from './model/RichText';
import Icon from "@material-ui/core/Icon"
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
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
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    tooltip: {
        fontSize: "12pt!important"
    },
    cmdButton: {
        marginRight: theme.spacing(1),
        height: '40px!important',
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: 'lightgray!important',
        width: 'auto!important',
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
        marginTop: 2,
        marginBottom: 2,
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
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'

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
    let value = props?.value === '' ? '' : props.value;
    const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), { fontStyle: 'paragraph', alignment: 'left', selectedText: undefined, formats: {}, selectedUrl: undefined, })
    const classes = useStyles()
    const editorRef = useRef<ReactQuill>(null)
    let toolbarId = props?.id !== undefined ? `toolbar_${props.id}` : `toolbar_${randNum}`;
    function focusEditor() {
        editorRef.current?.focus();
    }


    const getEditor = (): any | undefined => {
        try {
            return editorRef!.current?.getEditor();
        } catch (error) {
            return undefined
        }
    }

    /**
    * Called when richtext selection changes
    */
    const handleChangeSelection = (range: any, oldRange: any, source: any) => {
        const quill = getEditor();
        try {
            if (quill && range !== null) {
                // Get the selected text
                const selectedTextTemp = quill.getText(range);

                // Get the current format
                const formatsTemp = quill.getFormat(range);

                // Get the currently selected url
                const selectedUrlTemp = formatsTemp.link ? formatsTemp.link : undefined;
                console.log("setSelectedText");

                // setSelectedText(selectedTextTemp);
                // setSelectedUrl(selectedUrlTemp);
                // setFormats(formatsTemp)
                setState({
                    selectedText: selectedTextTemp,
                    selectedUrl: selectedUrlTemp,
                    formats: formatsTemp
                });
                // if (this._propertyPaneRef && this.state.morePaneVisible) {
                //     this._propertyPaneRef.onChangeSelection(range, oldRange, source);
                // }
            }
        } catch (error) {
            console.error(error);

        }
    }

    const applyFormat = (name: string, value: any) => {
        const quill = getEditor();
        quill.format(name, value);
        setTimeout(() => {
            handleChangeSelection(quill.getSelection(), undefined, undefined)
        }, 100);
    }

    const CustomEditor =
    {
        _onChangeIndentClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, direction: IndentDir) {
            // e.preventDefault();
            const quill = getEditor();
            const current = +(quill.getFormat(quill.getSelection()).indent || 0);
            applyFormat("indent", current + direction)
        },
        _onScriptStyleMarkClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, style: TextStyle) {
            // e.preventDefault()
            let scriptStyle = ''
            if (style === TextStyleType.sub) {
                scriptStyle = state.formats!.script === 'sub' ? '' : 'sub';
            }
            if (style === TextStyleType.super) {
                scriptStyle = state.formats!.script === 'super' ? '' : 'super';
            }
            applyFormat('script', scriptStyle)
        },

        _onStyleMarkClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, style: TextStyle) {
            // e.preventDefault()
            const newStyleValue = !state.formats[`${style}`];
            applyFormat(style, newStyleValue)
        },
        _onAlignmentClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: AlignSetting) {
            e.preventDefault()

        }
    }


    const toolbarArray: IToolbarButton[] = [
        {
            key: 'header',
            className: 'ql-header',
            value: state.fontStyle,
            icon: '',
            tooltip: 'Text Format',
            ariaLabel: 'Format Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onStyleMarkClick(e, TextStyleType.bold),
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
                    position: 'top',
                    buttonStyle: '',
                },

                {
                    key: 'pullQuote',
                    icon: '',
                    tooltip: '',
                    buttonText: "Pull Quote",
                    value: 'pullQuote',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault()
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
                    position: 'top',
                    buttonStyle: '',
                }
            ]
        },
        {
            key: 'bold',
            className: 'bold',
            value: '',
            icon: 'format_bold',
            tooltip: 'Bold (Ctrl+B)',
            buttonText: '',
            ariaLabel: 'Bold Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onStyleMarkClick(e, TextStyleType.bold),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'italic',
            className: 'italic',
            value: '',
            icon: 'format_italic',
            tooltip: 'Italic (Ctrl+I)',
            buttonText: '',
            ariaLabel: 'Italic Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onStyleMarkClick(e, TextStyleType.italic),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'underline',
            className: 'underline',
            value: '',
            icon: 'format_underline',
            tooltip: 'underline (Ctrl+I)',
            buttonText: '',
            ariaLabel: 'underline Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onStyleMarkClick(e, TextStyleType.underline),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'strike',
            className: 'strike',
            value: '',
            icon: 'strikethrough_s',
            tooltip: 'Strikethrough',
            buttonText: '',
            ariaLabel: 'Strike Through Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onStyleMarkClick(e, TextStyleType.strike),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'superscript',
            className: 'script',
            value: 'super',
            icon: 'superscript',
            tooltip: 'Superscript',
            buttonText: '',
            ariaLabel: 'Superscript Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onScriptStyleMarkClick(e, TextStyleType.super),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'subscript',
            className: 'script',
            value: 'sub',
            icon: 'subscript',
            tooltip: 'Subscript',
            buttonText: '',
            ariaLabel: 'Subscript Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onScriptStyleMarkClick(e, TextStyleType.sub),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'bulleted',
            className: 'list',
            value: 'bulleted',
            icon: 'format_list_bulleted',
            tooltip: 'Bullet points',
            buttonText: '',
            ariaLabel: 'Bullet points',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'numbered',
            className: 'list',
            value: 'numbered',
            icon: 'format_list_numbered',
            tooltip: 'Strikethrough',
            buttonText: '',
            ariaLabel: 'Strike Through Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'textAlign',
            icon: 'format_align_justify',
            tooltip: '',
            value: state.alignment,
            ariaLabel: 'Text Alignment',
            position: 'top',
            buttonStyle: classes.selectEmpty,
            childButtons: [
                {
                    key: 'left',
                    icon: 'format_align_left',
                    tooltip: 'Align Left',
                    ariaLabel: 'Align Left',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onChangeIndentClick(e, IndentDirType.left),
                    position: 'right',
                    value: 'left',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'center',
                    icon: 'format_align_center',
                    tooltip: 'Align Center',
                    ariaLabel: 'Align Center',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
                    position: 'right',
                    value: 'center',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'justify',
                    icon: 'format_align_justify',
                    tooltip: 'Justify',
                    ariaLabel: 'Justify',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
                    position: 'right',
                    value: 'justify',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'right',
                    icon: 'format_align_right',
                    tooltip: 'Align Right',
                    ariaLabel: 'Align Right',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
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
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
            position: 'top',
            value: 'insertLink',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'link_off',
            icon: 'link_off',
            tooltip: 'Remove link',
            ariaLabel: 'Remove link',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
            position: 'top',
            value: 'removeLink',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'table_insert',
            icon: 'table_chart',
            tooltip: 'Add table',
            ariaLabel: 'Add Table.',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
            position: 'top',
            value: '',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'indent_left',
            icon: 'format_indent_decrease',
            tooltip: 'Indent left',
            ariaLabel: 'Indent left',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onChangeIndentClick(e, IndentDirType.left),
            position: 'top',
            value: 'indent_left',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'indent_right',
            icon: 'format_indent_increase',
            tooltip: 'Indent right',
            ariaLabel: 'Indent right',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onChangeIndentClick(e, IndentDirType.right),
            position: 'top',
            value: 'indent_right',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'format_clear',
            icon: 'format_clear',
            tooltip: 'Format Clear',
            ariaLabel: 'Clear all formatting',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'abbreviation',
            icon: '',
            tooltip: 'Abbreviation',
            buttonText: '<abbr>',
            ariaLabel: 'Add Abbreviation over selected text',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'horizontal_line',
            icon: '',
            tooltip: 'Horizontal line',
            buttonText: '<hr/>',
            ariaLabel: 'Add horizontal line',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
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
        console.log('toolbar re-render');
        return (
            <div id={toolbarId} className={classes.flexGrow1}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className={`${props?.toolbarStyle ? props.toolbarStyle : classes.toolbar}`}>
                        {renderToolbarButtons()}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

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
        ['clean'],                                        // remove formatting button
    ];

    // const modules = {
    //     toolbar: {
    //         container: toolbarOptions,
    //         handlers: {
    //             'linkOff': (value: any) => {
    //                 console.log("linkOff: ", value);
    //             }
    //         }
    //     }
    // }
    const modules = {
        toolbar: {
            container: '#' + toolbarId
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

    const handleChange = (updatedValue: string) => {
        console.log("handleChange");

        if (props.value) {
            value = props.value;
        }
        else {
            value = updatedValue
        }
    }

    const editorRender = () => {
        const editorId = props?.id !== undefined ? `$quillEditor_${props.id}` : `quillEditor_${randNum}`;
        return (
            <div>
                <div className={classes.editorContainer} onClick={() => focusEditor()}>
                {toolbar()}
                    <ReactQuill
                        ref={editorRef}
                        id={editorId}
                        onChange={handleChange}
                        onChangeSelection={handleChangeSelection}
                        modules={modules}
                        defaultValue={value}
                    />
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