import React from 'react'
import styled from 'styled-components';

import { Heading } from "@styled-icons/boxicons-regular/Heading";
import { Bold } from "@styled-icons/boxicons-regular/Bold";
import { Italic } from "@styled-icons/boxicons-regular/Italic";
import { Underline } from "@styled-icons/boxicons-regular/Underline";
import { Strikethrough } from "@styled-icons/boxicons-regular/Strikethrough";
import { Superscript } from "@styled-icons/material/Superscript";
import { Subscript } from "@styled-icons/material/Subscript";
import { ListUl } from "@styled-icons/boxicons-regular/ListUl";
import { ListOl } from "@styled-icons/boxicons-regular/ListOl";
// import { Highlight } from "@styled-icons/boxicons-regular/Highlight";
// import { FontColor } from "@styled-icons/boxicons-regular/FontColor";
import { Link } from "@styled-icons/boxicons-regular/Link";
import { Table } from "@styled-icons/boxicons-regular/Table";
import { Image } from "@styled-icons/boxicons-regular/Image";
import "./ButtonToolbar.css";
import { utilWrapper } from '../utils/util-wrapper';
import { utilGetSideChars } from '../utils';
import { ButtonProps, ButtonToolbarProps, TextStyleType, Insert, TextStyle, ComboInsert, InsertType, HeadingType } from "../models/MarkdownEditorModel";
import { ComboButton } from './ComboButton/ComboButton';

const ToolbarButton = styled.button`
    background-color:'gray';
    height:40px;
    min-width:40px;
    margin-right:3px;
    margin-bottom:3px;
    border-color:#E0E0E0;
    background-color:#E0E0E0;
    margin-right:5px;
    border-radius:5px;
    &:hover{
        background-color:lightgray
    }
    &:focus{
        border:2px solid darkgray;
        background-color:lightgray;

        outline:none
    }
    
`;

// const ColorRect = styled.div`
//     outline: ${props => props.theme.main === undefined ? '2px solid black' : '2px solid ' + props.theme.main};
//     width: 14px;
//     margin-left: 5px;
//     transform: translate(0px,-4px);
// `;

const ToolbarRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:start;
    align-items:center;
    flex-wrap:wrap;
    background-color:#1e272c;
    padding:8px;
    width:100%;
    border-top-left-radius:3px;
    border-top-right-radius:3px;
`;

export function ButtonsToolbar(props: ButtonToolbarProps) {

    // const [fontColor, setFontColor] = useState('black');
    // const [highlight, setHighlight] = useState('white');

    const buttonsArray: ButtonProps[] = [
        {
            icon: <Heading />,
            label: "Heading",
            ariaLabel: "Heading for current line.",
            tooltip: "Add Heading",
            key: "heading",
            options: [
                {
                    label: 'Heading 1',
                    ariaLabel: 'Heading 1 insert',
                    tooltip: "Add heading 1",
                    key: 'heading_1',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onInsertText(HeadingType.h1)
                },
                {
                    label: 'Heading 2',
                    ariaLabel: 'Heading 2 insert',
                    tooltip: "Add heading 2",
                    key: 'heading_2',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onInsertText(HeadingType.h2)
                }, {
                    label: 'Heading 3',
                    ariaLabel: 'Heading 3 insert',
                    tooltip: "Add heading 3",
                    key: 'heading_3',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onInsertText(HeadingType.h3)
                }, {
                    label: 'Heading 4',
                    ariaLabel: 'Heading 4 insert',
                    tooltip: "Add heading 4",
                    key: 'heading_4',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onInsertText(HeadingType.h4)
                }, {
                    label: 'Heading 5',
                    ariaLabel: 'Heading 5 insert',
                    tooltip: "Add heading 5",
                    key: 'heading_5',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onInsertText(HeadingType.h5)
                }, {
                    label: 'Heading 6',
                    ariaLabel: 'Heading 6 insert',
                    tooltip: "Add heading 6",
                    key: 'heading_6',
                    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onInsertText(HeadingType.h6)
                },
            ]
        },
        {
            icon: <Bold />,
            ariaLabel: "Bold selected text.",
            tooltip: "Bold",
            key: "bold",
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onTextFormatClick(TextStyleType.bold)
        },
        {
            icon: <Italic />,
            ariaLabel: "Italicize selected text.",
            tooltip: "Italic",
            key: "italic",
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onTextFormatClick(TextStyleType.italic)
        },
        {
            icon: <Underline />,
            ariaLabel: "Underline selected text.",
            tooltip: "Underline",
            key: "underline",
            disabled: false,
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onTextFormatClick(TextStyleType.underline)
        },
        {
            icon: <Strikethrough />,
            ariaLabel: "Strike through selected text.",
            tooltip: "Strike through",
            key: "strikethrough",
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onTextFormatClick(TextStyleType.strike)
        },
        {
            icon: <Superscript />,
            ariaLabel: "Turn selected text into super script.",
            tooltip: "Super Script",
            key: "superScript",
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onTextFormatClick(TextStyleType.super)
        },
        {
            icon: <Subscript />,
            ariaLabel: "Turn selected text into sub script.",
            tooltip: "Sub Script",
            key: "subScript",
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onTextFormatClick(TextStyleType.sub)
        },
        {
            icon: <ListUl />,
            ariaLabel: "Add new unordered list.",
            tooltip: "Unordered List",
            key: "unorderedList",
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onInsertText(InsertType.unorderedList)
        },
        {
            icon: <ListOl />,
            ariaLabel: "Add new ordered list.",
            tooltip: "Ordered List",
            key: "orderedList",
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onInsertText(InsertType.orderedList)
        },
        // {
        //     icon: <div><FontColor /><ColorRect theme={{ main: fontColor }} /></div>,
        //     ariaLabel: "Change selected font color.",
        //     tooltip: "Font Color",
        //     disabled: true,
        //     key: "fontColor"
        // },
        // {
        //     icon: <div><Highlight /><ColorRect theme={{ main: highlight }} /></div>,
        //     ariaLabel: "Highlight selected text.",
        //     tooltip: "Highlight",
        //     disabled: true,
        //     key: "highlight"
        // },
        {
            icon: <Image />,
            ariaLabel: "Insert image button.",
            tooltip: "Add Image",
            key: "image",
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onInsertText(InsertType.image)
        },
        {
            icon: <Table />,
            ariaLabel: "Insert table button.",
            tooltip: "Add Table",
            key: "table",
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onInsertText(InsertType.table)
        },
        {
            icon: <Link />,
            ariaLabel: "Insert link button",
            tooltip: "Insert Link",
            key: "link",
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onInsertText(InsertType.link)
        },
        {
            icon: <strong>abbr</strong>,
            ariaLabel: "Insert abbreviation button",
            tooltip: "Insert Abbreviation",
            key: "abbr",
            callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toolbarActions._onInsertText(InsertType.abbreviation)
        },
    ]

    const toolbarActions = {
        _onInsertText(type: Insert) {
            let val: string | ComboInsert = ""
            switch (type) {
                case "heading_1":
                    val = "# ";
                    break;
                case "heading_2":
                    val = "## ";
                    break;
                case "heading_3":
                    val = "### ";
                    break;
                case "heading_4":
                    val = "#### ";
                    break;
                case "heading_5":
                    val = "##### ";
                    break;
                case "heading_6":
                    val = "####### ";
                    break;
                case "oList":
                    val = `1. item 1\n1. item 2\n1. item 3`;
                    break;
                case "uoList":
                    val = `- item 1\n- item 2\n- item 3\n`;
                    break;
                case "img":
                    val = "";
                    break;
                case "table":
                    val = `\n| Col 1 | Col 2 | Col 3 |\n|:------|:-----:|------:|\n| c1 r1 | c2 r1 | c3 r1 |\n| c1 r2 | c2 r2 | c3 r2 |\n| c1 r3 | c2 r3 | c3 r3 |`;

                    break;
                case "link":
                    val = {
                        topInsert: '',
                        textInsert: ''
                    };
                    break;
                case "abbr":
                    val = {
                        topInsert: '',
                        textInsert: ''
                    };
                    break;
                default:
                    console.error("unknown variable passed.");
                    break;
            }

            props.insertCmd(val, type)

        },
        _onTextFormatClick(type: TextStyle) {
            const regex = new RegExp(/([*_~!<sub|sup>]*)([a-zA-Z0-9 ]+)([*_~!</sub|sup>]*)/, "gi");
            let char = "";
            let endChar = "";
            const sideCheck = (line: string) => utilGetSideChars(line, regex)
            let regexSplit: RegExp;
            switch (type) {
                case "bold":
                    console.log("Bold was called..");
                    char = "**";
                    regexSplit = new RegExp(/(\*+)/, "gi")
                    break;
                case "italic":
                    console.log("Italic was called..");
                    char = "_";
                    regexSplit = /(-)/

                    break;
                case "strike":
                    console.log("Strike was called..");
                    char = "~";
                    regexSplit = new RegExp(/(~)/, "gi")

                    break;
                case "underline":
                    console.log("Underline was called...");
                    char = "!!";
                    regexSplit = new RegExp(/(!!)/, "gi")

                    break;
                case "sub":
                    console.log("Sub script was called...");
                    char = "<sub>";
                    endChar = "</sub>";
                    regexSplit = new RegExp(/(<\/?sub>)/, "gi")

                    break;
                case "super":
                    console.log("Super script was called...");
                    char = "<sup>";
                    endChar = "</sup>";
                    regexSplit = new RegExp(/(<\/?sup>)/, "gi")
                    break;
                default:
                    break;
            }

            if (!!props.value) {
                let newLines = props.value.split(/\n\n/).map(line => {
                    if (line.trim() === "") {
                        return line
                    }
                    else {
                        let side = sideCheck(line)?.split(regexSplit).filter(x => x !== "")[0]
                        let check = !!side ? (side === char) : false;
                        const wrapped = utilWrapper(line, !check, char, endChar)
                        return wrapped;
                    }
                })
                props.callback(newLines.join("\n\n"))
            }
        }
    }

    const toolbarComboButton = (btn: ButtonProps) => {
        return <ComboButton buttonData={btn} key={btn.key}></ComboButton>
    }

    const createToolbarButtons = () => {
        const buttonArr = buttonsArray.map((btn) => {
            return !btn.disabled ? (!!btn.options && btn.options?.length > 0 ?
                toolbarComboButton(btn)
                :
                <ToolbarButton
                    onClick={btn.callback}
                    className="ripple" key={`btn_${btn.key}`} aria-label={btn.ariaLabel}>{btn.icon}</ToolbarButton>) : ""
        })
        return (
            <ToolbarRow>
                {buttonArr}
                <div>
                    {currentSelection()}
                </div>
            </ToolbarRow>
        )
    }

    const currentSelection = () => {
        return (
            <div style={{ color: "white" }}>
                Selection: {props.value || "none"}
            </div>
        )
    }

    const render = () => {
        return (
            createToolbarButtons()
        )
    }

    return render();
}
