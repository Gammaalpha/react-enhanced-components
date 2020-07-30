import React, { useReducer, useEffect } from 'react'
import { IndentDir, TextStyle, TextStyleType, IToolbarButton, IndentDirType, TextAlignmentType, TextAlignment, ListFormat, ListFormatType, BlockFormat, BlockFormatType, IAbbr, ILink } from '../model/RichText';
import { makeStyles, createStyles, Theme, AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { CreateStyleButton } from '../CreateStyleButton';
import './CustomToolbar.css'
import { Quill } from 'react-quill';
import AbbrDialog from '../AbbrDialog/AbbrDialog';
import { NoteAdd } from '@material-ui/icons';
import LinkDialog from '../LinkDialog/LinkDialog';
import FontColorButton from '../FontColorButton/FontColorButton';
import { FontColorButtonType } from '../model/ColorPicker';


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

let Delta = Quill.import('delta');
//Set custom class marking
let Parchment = Quill.import('parchment');
let config = {
    scope: Parchment.Scope.BLOCK,
};
let MClass = new Parchment.Attributor.Class('mark', 'style', config);
Quill.register(MClass, true)

// Set headers and add blockquote capability
let header = Quill.import('formats/header');
header.tagName = [
    'H1',
    'H2',
    'H3',
    'H4',
    'blockquote'];
Quill.register(header, true);

// Set font sizes
let SizeClass = Quill.import('formats/size');
SizeClass.whitelist = [
    'small',
    'medium',
    'mediumplus',
    'large',
    'xlarge',
    'xlargeplus',
    'xxlarge',
    'xxxlarge',
    'xxlargeplus',
    'super'];
Quill.register(SizeClass, true);

// Horizontal line
let Embed = Quill.import('blots/block/embed');
class Hr extends Embed {
    static create(value: any) {
        let node: Element = super.create(value);
        node.setAttribute('style', 'height:0px;margin-top:10px;margin-bottom:10px;');
        return node;
    }
}
Hr.blotName = 'hr';
Hr.className = 'rec-hr';
Hr.tagName = 'hr'
Quill.register({
    'formats/hr': Hr
})
let blockEmbed = Quill.import('blots/embed')
class Abbr extends blockEmbed {
    static create(value: IAbbr) {
        let node: Element = super.create();
        node.setAttribute('title', value.title);
        node.innerHTML = value.text;
        return node;
    }
    static value(node: Element) {
        return node
    }
}
Abbr.blotName = "abbr";
Abbr.className = "rec-abbr";
Abbr.tagName = "abbr";
Quill.register(Abbr);

let Link = Quill.import('formats/link');
class ATag extends Link {
    static create(value: ILink) {
        let node: Element = super.create();
        node.setAttribute('href', value.url);
        if (value?.target) {
            node.setAttribute('target', value.target);
            node.setAttribute('rel', "noreferrer noopener");
            node.setAttribute('data-interception', 'off');
        }
        node.innerHTML = value.text.trim();
        return node;
    }
    static value(node: Element) {
        return node;
    }
}
ATag.blotName = "a";
ATag.className = "rec-a";
ATag.tagName = "a";
Quill.register(ATag);

export default function CustomToolbar(props: IToolbar) {
    const classes = useStyles();
    const [state, setState] = useReducer((state: any, newState: any) =>
        ({ ...state, ...newState }),
        { fontStyle: 'paragraph', alignment: 'left', selectedText: undefined, formats: {}, selectedUrl: undefined, abbrDialog: false, fontColor: "#000000", highlightColor: "#FFFFFF", fontColorDialog: false, highlightDialog: false, urlDialog: false, tableDialog: false });

    useEffect(() => {
        console.log("state updated:", state);

    }, [state])
    const getEditor = (): any | undefined => {
        try {
            return props.editorRef!.current?.getEditor();
        } catch (error) {
            return undefined
        }
    }
    const quill = getEditor();

    /**
    * Called when richtext selection changes
    */
    const handleChangeSelection = (range: any, oldRange: any, source: any) => {

        // const quill = getEditor();
        try {
            if (quill && range !== null) {
                // Get the selected text
                const selectedTextTemp = quill.getText(range);

                // Get the current format
                const formatsTemp = quill.getFormat(range);
                // console.log("formatsTemp", formatsTemp);

                // Get the currently selected url
                const selectedUrlTemp = formatsTemp.link ? formatsTemp.link : undefined;
                setState({
                    selectedText: selectedTextTemp,
                    selectedUrl: selectedUrlTemp,
                    formats: quill.getFormat(range)
                });

            }
        } catch (error) {
            console.error(error);
        }
    }

    const applyFormat = (name: string, value: any) => {
        // const quill = getEditor();
        if (name === 'mark') {
            quill.format('mark', value);
        }
        else {
            quill.format(name, value);
        }
        setTimeout(() => {
            // console.log("applyFormat");
            handleChangeSelection(quill.getSelection(), undefined, undefined)
            // handleChangeSelection(quill.getSelection())
        }, 100);
    }

    const clearFormatting = () => {
        // const quill = getEditor();
        const range = quill.getSelection();
        let [leaf, offset] = quill.getLeaf(range.index);
        console.log(leaf, offset);

        if (range.length === 0) {
            quill.removeFormat(range.index - offset, range.index + leaf?.domNode.length)
        }
        else {
            quill.removeFormat(range.index, range.length)
            if (leaf.domNode.tagName === "ABBR") {
                const innerLeaf: string = (leaf.domNode.innerText).trim();
                quill.insertText(range.index, innerLeaf, 'user');
            }
        }
        applyFormat('color', '#000000');
        applyFormat('background', '#FFFFFF');

    }

    const CustomEditor =
    {
        _onTextFormatClick(type: BlockFormat) {
            if (type !== BlockFormatType.pullQuote) {
                clearFormatting();
            }
            switch (type) {
                case BlockFormatType.paragraph:
                    applyFormat("header", false);
                    break;
                case BlockFormatType.pullQuote:
                    applyFormat("mark", type);
                    break;
                default:
                    applyFormat("header", type);
                    break;
            }
        },
        _onChangeIndentClick(direction: IndentDir) {
            // e.preventDefault();
            // const quill = getEditor();
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
            const newStyleValue = !state.formats[`${style}`];
            applyFormat(style, newStyleValue)
        },
        _onClearFormattingClick() {
            clearFormatting()
        },
        _onAlignmentClick(alignValue: TextAlignment) {
            // e.preventDefault()
            const newAlignValue = alignValue === 'left' ? false : alignValue;
            applyFormat("align", newAlignValue)
        },
        _onListClick(listType: ListFormat) {
            const newListValue = (listType === 'bullet' && state.formats.list === 'bullet') || (listType === 'ordered' && state.formats.list === 'ordered') ? false : listType;
            applyFormat('list', newListValue);
        },
        _onTextFormatColor(color: string, type: FontColorButtonType, range: any) {
            if (quill !== undefined) {
                // const range = quill.getSelection();
                if (range) {
                    switch (type) {
                        case "Font":
                            if (state.fontColor !== color) {
                                // applyFormat('color', color);
                                quill.format(range.index, range.length, 'color', color);
                                setState({
                                    fontColor: color
                                });
                            }
                            break;
                        case "Highlight":
                            if (state.highlightColor !== color) {
                                applyFormat('background', color);
                                setState({
                                    highlightColor: color
                                });
                            }
                            break;
                        default:
                            console.error("Error in _onTextFormatColor");
                            break;
                    }
                }
            }
        },
        _onAbbrInsert(params: IAbbr) {
            if (params.range) {
                if (params.range.length > 0) {
                    quill.deleteText(params.range.index, params.range.length, 'user');
                }
            }
            quill.insertEmbed(params?.range?.index ? params.range.index : 0, 'abbr', {
                title: params.title,
                text: params.text
            }, 'user');

        },
        _onLinkInsert(params: ILink) {
            if (params.range) {
                if (params.range.length > 0) {
                    quill.deleteText(params.range.index, params.range.length, 'user');
                }
            }
            quill.insertEmbed(params?.range?.index ? params.range.index : 0, 'a', {
                text: params.text,
                url: params.url,
                target: params.target
            }, 'user');
        },
        // format version
        // _onLinkInsert(params: ILink) {
        //     debugger;
        //     const cursorPosition = params.range!.index;
        //     if (params.range) {
        //         if (params.range.length > 0) {
        //             quill.deleteText(params.range.index, params.range.length, 'user');
        //         }
        //     }
        //     quill.insertText(cursorPosition, params.text);
        //     quill.setSelection(cursorPosition, params.text.length);
        //     quill.formatText(cursorPosition, params.text.length, 'link', params.url);
        // },
        _onHrInsert() {
            // const quill = getEditor();
            let range = quill.getSelection();
            if (range) {
                quill.insertEmbed(range.index, "hr", "null")
            }
        }
    };


    // const insertEmbeddedTag = (params: IAbbr | ILink, tag: string) => {
    //     if (params.range) {
    //         if (params.range.length > 0) {
    //             quill.deleteText(params.range.index, params.range.length, 'user');
    //         }
    //     }
    //     quill.insertEmbed(params?.range?.index ? params.range.index : 0, tag, {
    //         ...params
    //     }, 'user');
    // }


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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onTextFormatClick(BlockFormatType.headingOne),
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onTextFormatClick(BlockFormatType.headingTwo),
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onTextFormatClick(BlockFormatType.headingThree),
                    position: 'top',
                    buttonStyle: '',
                },
                {
                    key: 'header4',
                    className: 'header4',
                    value: 3,
                    icon: '',
                    tooltip: '',
                    buttonText: 'Header 4',

                    ariaLabel: 'Header 4 Selection',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onTextFormatClick(BlockFormatType.headingFour),
                    position: 'top',
                    buttonStyle: '',
                },
                {
                    key: 'blockquote',
                    icon: '',
                    tooltip: '',
                    buttonText: "Block Quote",
                    value: 'blockquote',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onTextFormatClick(BlockFormatType.blockquote),
                    ariaLabel: 'Block Quote formatting',
                    position: 'top',
                    buttonStyle: '',
                },
                {
                    key: 'pullQuote',
                    icon: '',
                    tooltip: '',
                    buttonText: "Pull Quote",
                    value: 'pullQuote',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onTextFormatClick(BlockFormatType.pullQuote),
                    ariaLabel: 'Pull Quote formatting',
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onTextFormatClick(BlockFormatType.paragraph),
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
            tooltip: 'Bulleted List',
            buttonText: '',
            ariaLabel: 'Bulleted List',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onListClick(ListFormatType.bulletedList),
            position: 'top',
            buttonStyle: `${classes.cmdButton}`,
        },
        {
            key: 'ordered',
            className: 'list',
            value: 'ordered',
            icon: 'format_list_numbered',
            tooltip: 'ordered List',
            buttonText: '',
            ariaLabel: 'ordered List',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onListClick(ListFormatType.orderedList),
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
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onAlignmentClick(TextAlignmentType.left),
                    position: 'right',
                    value: 'left',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'center',
                    icon: 'format_align_center',
                    tooltip: 'Align Center',
                    ariaLabel: 'Align Center',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onAlignmentClick(TextAlignmentType.center),
                    position: 'right',
                    value: 'center',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'justify',
                    icon: 'format_align_justify',
                    tooltip: 'Justify',
                    ariaLabel: 'Justify',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onAlignmentClick(TextAlignmentType.justify),
                    position: 'right',
                    value: 'justify',
                    buttonStyle: classes.cmdButton
                },
                {
                    key: 'right',
                    icon: 'format_align_right',
                    tooltip: 'Align Right',
                    ariaLabel: 'Align Right',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onAlignmentClick(TextAlignmentType.right),
                    position: 'right',
                    value: 'right',
                    buttonStyle: classes.cmdButton
                },

            ]
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
        // {
        //     key: 'abbreviation',
        //     icon: '',
        //     tooltip: 'Abbreviation',
        //     buttonText: '<abbr>',
        //     ariaLabel: 'Add Abbreviation over selected text',
        //     callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onAbbrInsert(),
        //     position: 'top',
        //     buttonStyle: classes.cmdButton
        // },
        {
            key: 'horizontal_line',
            icon: '',
            tooltip: 'Horizontal line',
            buttonText: '<hr/>',
            ariaLabel: 'Add horizontal line',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onHrInsert(),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
    ]

    const FontColorButtonArray: any = {
        textFormat: {
            key: 'text_format',
            icon: 'text_format',
            tooltip: 'Format text color',
            ariaLabel: 'Format text color',
            callback: null,
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        highlight: {
            key: 'highlight',
            icon: 'highlight',
            tooltip: 'Highlight text',
            ariaLabel: 'Highlight text',
            callback: null,
            position: 'top',
            buttonStyle: classes.cmdButton
        }
    }

    const renderToolbarButtons = () => {
        const toolbarButtons: any[] = []
        toolbarArray.forEach((element: IToolbarButton) => {
            toolbarButtons.push(CreateStyleButton(element))
        });
        // add Abbr btn
        toolbarButtons.push(<AbbrDialog key="dialog_abbr" quillEditor={quill} btnStyle={classes.cmdButton} callback={CustomEditor._onAbbrInsert}></AbbrDialog>);
        toolbarButtons.push(
            <LinkDialog key="dialog_link" quillEditor={quill} btnStyle={classes.cmdButton} callback={CustomEditor._onLinkInsert}></LinkDialog>
        );
        toolbarButtons.push(
            <FontColorButton defaultColor={state.fontColor} key="fontTextFormatColor" callback={CustomEditor._onTextFormatColor} buttonType="Font" buttonParams={FontColorButtonArray.textFormat}></FontColorButton>
        );
        toolbarButtons.push(
            <FontColorButton defaultColor={state.highlightColor} key="fontTextFormatHighlight" callback={CustomEditor._onTextFormatColor} buttonType="Highlight" buttonParams={FontColorButtonArray.highlight}></FontColorButton>
        );
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
