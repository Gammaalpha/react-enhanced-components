import React, { useReducer, useEffect } from 'react'
import { IndentDir, TextStyle, TextStyleType, IToolbarButton, IndentDirType, TextAlignmentType, TextAlignment, ListFormat, ListFormatType, BlockFormat, BlockFormatType, IAbbr, ILink, IRange, IImageLink } from '../model/RichText';
import { makeStyles, createStyles, Theme, AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { CreateStyleButton } from '../CreateStyleButton';
import './CustomToolbar.css'
import { Quill } from 'react-quill';
import AbbrDialog from '../AbbrDialog/AbbrDialog';
import LinkDialog from '../LinkDialog/LinkDialog';
import FontColorButton from '../FontColorButton/FontColorButton';
import { FontColorButtonType } from '../model/ColorPicker';
import ImageDialog from '../ImageDialog/ImageDialog';


export interface IToolbar {
    id: string,
    editorRef: any,
    toolbarStyle?: string,
    editorId: string,
    editing?: boolean
}


const useStyles = makeStyles((theme: Theme) => createStyles({
    flexGrow1: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        background: "#1e272c"
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
    displayNone: {
        display: 'none'
    }
}));

// let Delta = Quill.import('delta');
//Set custom class marking
let Parchment = Quill.import('parchment');
let config = {
    scope: Parchment.Scope.BLOCK,
};
let MClass = new Parchment.Attributor.Class('mark', 'style', config);
Quill.register(MClass, true)

// Set headers and add blockquote capability
// let header = Quill.import('formats/header');
// header.tagName = [
//     'H1',
//     'H2',
//     'H3',
//     'H4',
//     'blockquote'];
// Quill.register(header, true);

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
        value.url !== undefined ? node.setAttribute('href', value.url) : node.setAttribute('href', "")
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

class TableTag extends blockEmbed {
    static create(value: any) {
        console.log('table:', value);
        let node: Element = super.create();
        node.setAttribute("id", `rec_table_${value.tableCount + 1}`)
        node.setAttribute("style", "border:1px solid black;");
        node.appendChild(document.createElement("thead"));
        node.appendChild(document.createElement("tbody"))
        debugger;
        return node;
    }

    static value(node: Element) {
        return node;
    }
}

TableTag.blotName = "table";
TableTag.className = "rect-table";
TableTag.tagName = "table";
Quill.register(TableTag);

class ImageTag extends blockEmbed {
    static create(value: IImageLink) {
        let node: Element = super.create();
        value.url !== undefined ? node.setAttribute('src', value.url) : node.setAttribute('src', "")
        node.setAttribute('alt', value.alt);
        node.setAttribute('title', value.text);
        node.setAttribute('width', value.width.toString());
        node.setAttribute('height', value.height.toString());
        node.setAttribute('id', `rec-img-${value.text.replace(" ", "-").toLowerCase()}`);
        node.setAttribute('style', `float:${value.float};padding:5px;`)
        node.innerHTML = value.text.trim();
        return node;
    }
    static value(node: Element) {
        return node;
    }
}
ImageTag.blotName = "img";
ImageTag.className = "rec-img";
ImageTag.tagName = "img";
Quill.register(ImageTag);

export default function CustomToolbar(props: IToolbar) {
    const classes = useStyles();
    // let selectedRange = {};
    const [state, setState] = useReducer((state: any, newState: any) =>
        ({ ...state, ...newState }),
        { fontStyle: 'paragraph', alignment: 'left', selectedText: undefined, formats: {}, selectedUrl: undefined, abbrDialog: false, fontColor: "#000000", highlightColor: "#FFFFFF", fontColorDialog: false, highlightDialog: false, urlDialog: false, tableDialog: false });

    const getEditor = (): any | undefined => {
        try {
            return props.editorRef!.current?.getEditor();
        } catch (error) {
            return undefined
        }
    }
    useEffect(() => {
        console.log("state updated:", state);
    }, [state])
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
        const quill = getEditor();
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
        const quill = getEditor();
        const range = quill.getSelection();
        if (range !== null) {
            let [leaf, offset] = quill.getLeaf(range.index);
            // console.log(leaf, offset);

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
            const quill = getEditor();
            const current = +(quill.getFormat(quill.getSelection() !== null ? quill.getSelection() : 0).indent || 0);
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
        _onTextFormatColor(color: string, type: FontColorButtonType, range: IRange) {
            // debugger;
            const quill = getEditor()
            if (quill !== undefined) {
                // const range = quill.getSelection();
                switch (type) {
                    case "Font":
                        if (state.fontColor !== color) {
                            range === null ? applyFormat('color', color) : quill.formatText(range.index, range.length, 'color', color);
                            setState({
                                fontColor: color
                            });
                        }
                        break;
                    case "Highlight":
                        if (state.highlightColor !== color) {
                            range === null ? applyFormat('background', color) : quill.formatText(range.index, range.length, 'background', color);
                            // applyFormat('background', color);
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
        },
        _onAbbrInsert(params: IAbbr) {
            const quill = getEditor()
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
            const quill = getEditor()
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
        _onInsertImage(params: IImageLink) {
            const quill = getEditor();
            // if (params.range) {
            //     if (params.range.length > 0) {
            //         quill.deleteText(params.range.index, params.range.length, 'user');
            //     }
            // }
            quill.insertEmbed(params?.range?.index ? params.range.index : 0, 'img', {
                ...params
            }, 'user');
            debugger;
            setTimeout(() => quill.setSelection(params?.range?.index + 1, 0), 0)

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
            const quill = getEditor();
            let range = quill.getSelection();
            if (range) {
                quill.insertEmbed(range.index, "hr", "null")
            }
        },
        _onFontSizeChange(fontSize: string) {
            applyFormat("size", fontSize)
        },
        _onRowInsertBelow() { },
        _onColumnInsertRight() { },
        _onTableInsert() {
            const quill = getEditor();
            const range = quill.getSelection();
            const count = document.querySelectorAll("[id^= 'rec_table_']");
            console.log('Count: ', count);
            // quill.insertEmbed(range.index, 'table', {
            //     tableCount: count.length
            // }, 'user');
            // getQuillInnerHTML();
            setQuillInnerHTML();

        },
        _onTableDelete() { },
        _onDeleteCurrentRow() { },
        _onDeleteCurrentColumn() { }

    };

    const getEditorBySelector = (): NodeListOf<Element> => {
        return document.querySelectorAll(`[id='${props.editorId}']`)[0].querySelectorAll("[class='ql-editor'");
    }

    const getQuillInnerHTML = () => {

        console.log(getEditorBySelector());

    }
    const setQuillInnerHTML = (html?: string) => {
        const quill = getEditor();
        const range = quill.getSelection();
        // let editor: NodeListOf<Element> = getEditorBySelector();
        // const htmlContent = '<div>Hello</div>';
        // const delta = quill.clipboard.convert(htmlContent);
        // quill.insertEmbed(range.index, 'p', delta);
        // quill.setContents(delta, 'silent')
    }

    const basicTable = () => {
        return <table>
            <thead>
                <tr>
                    <td>
                        Col1
                    </td>
                    <td>
                        Col2
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        Cell1
                    </td>
                    <td>
                        Cell2
                    </td>
                </tr>
            </tbody>
        </table>
    }


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
    const fontSizeArray =
        [
            { key: 'small', text: '12' },
            { key: 'medium', text: '14' },
            { key: 'mediumplus', text: '15' },
            { key: 'large', text: '17' },
            { key: 'xlarge', text: '21' },
            { key: 'xlargeplus', text: '24' },
            { key: 'xxlarge', text: '28' },
            { key: 'xxxlarge', text: '32' },
            { key: 'xxlargeplus', text: '36' },
            { key: 'super', text: '42' },
        ];
    const textFontSizeSelectionArray = (sizeArray: any[]) => {
        // const arr = [];
        return sizeArray.map(num => ({
            key: `fs_${num.text}`,
            buttonText: `${num.text}`,
            icon: '',
            tooltip: '',
            ariaLabel: `Font size ${num.text}`,
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onFontSizeChange(num.key),
            position: 'right',
            value: num.key,
            buttonStyle: classes.cmdButton
        }))
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
            key: 'textFontSize',
            icon: '',
            tooltip: '',
            value: 'large',
            ariaLabel: 'Text Alignment',
            position: 'top',
            buttonStyle: classes.selectEmpty,
            childButtons: textFontSizeSelectionArray(fontSizeArray)
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
            disabled: true,
            ariaLabel: 'Add Table.',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onTableInsert(),
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
            key: 'horizontal_line',
            icon: '',
            tooltip: 'Horizontal line',
            buttonText: '<hr/>',
            ariaLabel: 'Add horizontal line',
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => CustomEditor._onHrInsert(),
            position: 'top',
            buttonStyle: classes.cmdButton
        },
    ];

    const FontColorButtons: any = {
        textFormat: {
            key: 'text_format',
            icon: '',
            tooltip: 'Format text color',
            ariaLabel: 'Format text color',
            callback: null,
            buttonText: 'A',
            position: 'top',
            buttonStyle: classes.cmdButton
        },
        highlight: {
            key: 'highlight',
            icon: 'create',
            tooltip: 'Highlight text',
            ariaLabel: 'Highlight text',
            callback: null,
            position: 'top',
            buttonStyle: classes.cmdButton
        }
    }

    const renderToolbarButtons = () => {
        const quill = getEditor()
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
            <ImageDialog key="image_insert" quillEditor={quill} btnStyle={classes.cmdButton} callback={CustomEditor._onInsertImage}></ImageDialog>
        );
        toolbarButtons.push(
            <FontColorButton range={!quill ? undefined : quill.getSelection()} defaultColor={state.fontColor} key="fontTextFormatColor" callback={CustomEditor._onTextFormatColor} buttonType="Font" buttonParams={FontColorButtons.textFormat}></FontColorButton>
        );
        toolbarButtons.push(
            <FontColorButton range={!quill ? undefined : quill.getSelection()} defaultColor={state.highlightColor} key="fontTextFormatHighlight" callback={CustomEditor._onTextFormatColor} buttonType="Highlight" buttonParams={FontColorButtons.highlight}></FontColorButton>
        );
        return toolbarButtons

    }
    const render = () => {
        console.log('toolbar render');
        // console.log('Editor Ref: ', getEditor());
        return (
            <div id={props.id} className={`${classes.flexGrow1} ${props.editing ? "" : classes.displayNone}`}>
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
