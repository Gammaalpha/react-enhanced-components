import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ButtonsToolbar } from '../ButtonsToolbar/ButtonsToolbar'
import { ComboInsert } from "../model/ComboInsert";
import { Column, StyledTextarea } from '../../Styles/CommonStyles';

interface MarkdownInputAreaProps {
    content: string;
    callback: any;
    maxHeight?: string;
    scrollCallback?: any;
    id?: string;
}

export function MarkdownInputArea(props: MarkdownInputAreaProps) {
    const [selectedText, setSelectedText] = useState('')
    const [selection, setSelection] = useState({ start: 0, end: 0 })
    const editorRef = useRef<HTMLTextAreaElement>(null)
    const [inputContent, setInputContent] = useState<string>(props.content)
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleChange = (e: any) => {
        setInputContent(e.target.value);
    }

    const getScrollPosition = (ref: any) => {
        const position = ((ref.target.scrollTop + ref.target.offsetHeight) / ref.target.scrollHeight) * 100;
        // console.log("Input: ", position);
        props.scrollCallback(position)
    }

    useEffect(() => {
        const handleScroll = (e: any) => {
            let currentPosition = e.target.scrollTop
            if (scrollPosition !== currentPosition) {
                setScrollPosition(currentPosition);
            }
        }
        if (editorRef.current !== null) {
            editorRef.current.onscroll = handleScroll;
        }

    }, [scrollPosition]);



    useEffect(() => {

        if (props.content !== inputContent) {
            props.callback(inputContent)
        }
    }, [inputContent, props])

    useEffect(() => {
        const getSelectedText = () => {
            // if (inputContent !== undefined && typeof inputContent === "string") {
            let text = inputContent.substring(selection.start, selection.end)
            return text
            // }
        }
        setSelectedText(getSelectedText())
    }, [selection, inputContent])

    const handleIncomingChange = (newVal: string) => {
        const tempSel = selection;
        let newOutput = inputContent.substring(0, selection.start) + newVal + inputContent.substring(selection.end, inputContent.length);
        let lenChange = (newVal.length - (selection.end - selection.start));
        setInputContent(newOutput)
        setSelection({
            start: tempSel.start,
            end: tempSel.end + lenChange,
        })
        const selectionFocusAfterEffect = () => {
            if (editorRef.current !== null) {
                editorRef.current.selectionStart = tempSel.start;
                editorRef.current.selectionEnd = tempSel.end + lenChange;
            }
        }
        setTimeout(() => {
            editorRef.current?.blur();
            editorRef.current?.focus();
            selectionFocusAfterEffect();
            if (editorRef.current !== null) {
                editorRef.current.scrollTop = scrollPosition
            }
        }, 10);

    }

    /**
     * Inserts data in the input string at the start position and returns the new string. 
     * @param input the input to augment
     * @param start the position to insert at
     * @param data the data to insert
     */
    const insert = (input: string, start: number, data: any) => {
        return input.slice(0, start) + String(data) + input.slice(start)
    }

    const handleInsertCmd = (insertVal: string | ComboInsert, type: string) => {
        // console.log(insertVal, type);
        let updatedContent = inputContent;
        let insertContent = insertVal;
        let index = 0;
        if (type.includes('heading')) {
            debugger;
            if (updatedContent.includes('\n\n')) {
                index = updatedContent.slice(0, selection.start + 1).lastIndexOf("\n\n") + 2;

            } else {
                index = 0;
            }
            const firstHalf = updatedContent.slice(0, index);
            const headingSection = updatedContent.slice(index, selection.end).split(/(#{1,})(.*)/gi).filter(x => x !== "" && !x.includes("#"));
            let heading = headingSection[0].trim();
            const secondHalf = updatedContent.slice(selection.end)
            updatedContent = firstHalf + heading + secondHalf;

            const updatedSelectionLoc = index + heading.length + (typeof insertContent === 'string' ? String(insertContent).length : 1)

            setSelection({
                start: updatedSelectionLoc,
                end: updatedSelectionLoc
            })
        }
        else {
            index = selection.start;
        }
        if (typeof insertVal !== "string") {
            if (type === 'abbr' || type === 'link') {
                updatedContent = insert(updatedContent, index, insertVal.textInsert);
                if (insertVal.topInsert !== '') {
                    updatedContent = insert(updatedContent, 0, insertVal.topInsert)
                }
            }
            if (type === 'img') {
                updatedContent = insert(updatedContent, index, insertVal.textInsert);
            }
        }
        else {
            updatedContent = insert(updatedContent, index, insertVal);
        }
        setInputContent(updatedContent)
    }


    const inputArea = () => {
        return (
            <Column
                id="markdownInputAreaColumn"
                width={"45%"} maxHeight={props.maxHeight || 'fit-content'}>
                <ButtonsToolbar
                    insertCmd={handleInsertCmd}
                    callback={handleIncomingChange}
                    value={selectedText}></ButtonsToolbar>
                <StyledTextarea
                    maxHeight={props.maxHeight || 'fit-content'}
                    ref={editorRef}
                    onSelect={(e: any) => {
                        setSelection({
                            start: e.target.selectionStart,
                            end: e.target.selectionEnd
                        })
                    }}
                    onScroll={getScrollPosition}
                    id={props.id !== undefined ? props.id + "_input_area" : "markdown_editor_input_area"} className="markdown_textarea"
                    value={inputContent}
                    onChange={handleChange}>
                </StyledTextarea>

            </Column>

        )
    }

    const render = () => {
        return (
            inputArea()
        )
    }

    return render();
}


export const MemorizedMarkdownInputArea = React.memo(MarkdownInputArea)