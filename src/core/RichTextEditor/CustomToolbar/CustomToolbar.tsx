import React, { useReducer } from 'react'
import { IndentDir, TextStyle, TextStyleType, IToolbarButton, IndentDirType } from '../model/RichText';
import { makeStyles, createStyles, Theme, AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { CreateStyleButton } from '../CreateStyleButton';
import './CustomToolbar.css'


export interface IToolbar {
    id: string,
    editorRef: any,
    toolbarStyle?: string,
}


const useStyles = makeStyles((theme: Theme) => createStyles({
    flexGrow1: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    tooltip: {
        fontSize: "12pt!important"
    },
    toolbar: {
        minHeight: '50px',
        paddingLeft: '5px',
        paddingRight: '5px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'

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
    appBar: {
        backgroundColor: '#1e272c',

    },
}));

export default function CustomToolbar(props: IToolbar) {
    const classes = useStyles();
    const [state, setState] = useReducer((state: any, newState: any) =>
        ({ ...state, ...newState }),
        { fontStyle: 'paragraph', alignment: 'left', selectedText: undefined, formats: {}, selectedUrl: undefined, urlDialog: false, tableDialog: false });


    const getEditor = (): any | undefined => {
        try {
            return props.editorRef!.current?.getEditor();
        } catch (error) {
            return undefined
        }
    }


    /**
* Called when richtext selection changes
*/
    const handleChangeSelection = (range: any) => {
        const quill = getEditor();
        try {
            if (quill && range !== null) {
                // Get the selected text
                const selectedTextTemp = quill.getText(range);

                // Get the current format
                const formatsTemp = quill.getFormat(range);

                // Get the currently selected url
                const selectedUrlTemp = formatsTemp.link ? formatsTemp.link : undefined;

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
            // handleChangeSelection(quill.getSelection(), undefined, undefined)
            console.log("applyFormat");

            handleChangeSelection(quill.getSelection())
        }, 100);
    }

    const clearFormatting = () => {
        const quill = getEditor();
        const range = quill.getSelection();
        if (range.length === 0) {
            console.log(quill.getLeaf(range.index))
            let [leaf, offset] = quill.getLeaf(range.index);
            console.log(leaf, offset);
            quill.removeFormat(range.index - offset, range.index + leaf?.domNode.length)
        }
        else {
            quill.removeFormat(range.index, range.length)
        }
    }

    const CustomEditor =
    {
        _onChangeIndentClick(direction: IndentDir) {
            // e.preventDefault();
            const quill = getEditor();
            const current = +(quill.getFormat(quill.getSelection()).indent || 0);
            applyFormat("indent", current + direction)
        },
        _onScriptStyleMarkClick(style: TextStyle) {
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

        _onStyleMarkClick(style: TextStyle) {
            // e.preventDefault()
            const newStyleValue = !state.formats[`${style}`];
            applyFormat(style, newStyleValue)
        },
        _onClearFormattingClick() {
            clearFormatting()
        },
        _onAlignmentClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault()

        }
    }


    const toolbarArray: IToolbarButton[] = [
        {
            key: 'header',
            className: 'ql-header',
            value: state.fontStyle,
            icon: '',
            tooltip: '',
            ariaLabel: 'Format Selection',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onStyleMarkClick(TextStyleType.bold),
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
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onStyleMarkClick(TextStyleType.bold),
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
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onStyleMarkClick(TextStyleType.italic),
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
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onStyleMarkClick(TextStyleType.underline),
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
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onStyleMarkClick(TextStyleType.strike),
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
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onScriptStyleMarkClick(TextStyleType.super),
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
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onScriptStyleMarkClick(TextStyleType.sub),
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onChangeIndentClick(IndentDirType.left),
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
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onChangeIndentClick(IndentDirType.left),
            position: 'top',
            value: 'indent_left',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'indent_right',
            icon: 'format_indent_increase',
            tooltip: 'Indent right',
            ariaLabel: 'Indent right',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onChangeIndentClick(IndentDirType.right),
            position: 'top',
            value: 'indent_right',
            buttonStyle: classes.cmdButton
        },
        {
            key: 'format_clear',
            icon: 'format_clear',
            tooltip: 'Format Clear',
            ariaLabel: 'Clear all formatting',
            callback: () => CustomEditor._onClearFormattingClick(),
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
    const render = () => {
        console.log('toolbar render');
        console.log('Editor Ref: ', getEditor());
        return (
            <div id={props.id} className={classes.flexGrow1}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className={`${props?.toolbarStyle ? props.toolbarStyle : classes.toolbar}`}>
                        {renderToolbarButtons()}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    return render();
}
