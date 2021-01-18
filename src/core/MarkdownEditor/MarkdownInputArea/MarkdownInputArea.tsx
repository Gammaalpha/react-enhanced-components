import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ButtonsToolbar } from '../ButtonsToolbar/ButtonsToolbar'
import "./MarkdownInputArea.css"
import { ComboInsert } from "../models/MarkdownEditorModel";

interface MarkdownInputAreaProps {
    content: string;
    callback: any;
}

export function MarkdownInputArea(props: MarkdownInputAreaProps) {
    const [selectedText, setSelectedText] = useState('')
    const [selection, setSelection] = useState({ start: 0, end: 0 })
    const editorRef = useRef<HTMLTextAreaElement>(null)
    const [inputContent, setInputContent] = useState(props.content)
    const handleChange = (e: any) => {
        setInputContent(e.target.value);
    }

    useEffect(() => {

        if (props.content !== inputContent) {
            props.callback(inputContent)
        }
    }, [inputContent, props])

    const selectionFocusAfterEffect = () => {
        if (editorRef.current !== null) {
            editorRef.current.selectionStart = selection.start
            editorRef.current.selectionEnd = selection.end
        }
    }

    useEffect(() => {
        const getSelectedText = () => {
            let text = inputContent.substring(selection.start, selection.end)
            return text
        }
        setSelectedText(getSelectedText())
    }, [selection, inputContent])


    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])

    const handleIncomingChange = (newVal: string) => {
        const tempSel = selection;
        let newOutput = inputContent.substring(0, selection.start) + newVal + inputContent.substring(selection.end, inputContent.length);
        let lenChange = (newVal.length - (selection.end - selection.start));
        setInputContent(newOutput)
        setSelection({
            start: tempSel.start,
            end: tempSel.end + lenChange,
        })
        selectionFocusAfterEffect()
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
        let index = 0;
        if (type.includes('heading')) {
            index = updatedContent.slice(0, selection.start + 1).lastIndexOf("\n\n") + 2;
            const firstHalf = updatedContent.slice(0, index);
            const headingSection = updatedContent.slice(index, selection.end).split(/(#{1,})(.*)/gi).filter(x => x !== "" && !x.includes("#"));
            let heading = headingSection[0].trim();
            const secondHalf = updatedContent.slice(selection.end)
            updatedContent = firstHalf + heading + secondHalf;

            const updatedSelectionLoc = index + heading.length + (typeof insertVal === 'string' ? String(insertVal).length : 1)

            setSelection({
                start: updatedSelectionLoc,
                end: updatedSelectionLoc
            })
        }
        else {
            index = selection.start;
        }
        const newVal = insert(updatedContent, index, insertVal)
        setInputContent(newVal)
    }


    const inputArea = () => {
        return (
            <div>
                <div className="row centerAlign">
                    <h2>Input Area</h2>
                </div>
                <div className="centerAlign">
                    <p>
                        control binding in-progress
                    </p>
                </div>
                <div className="column">
                    <div className="row flexStart">
                        <ButtonsToolbar
                            insertCmd={handleInsertCmd}
                            callback={handleIncomingChange}
                            value={selectedText}></ButtonsToolbar>
                    </div>
                    <textarea
                        ref={editorRef}
                        onSelect={(e: any) => {
                            setSelection({
                                start: e.target.selectionStart,
                                end: e.target.selectionEnd
                            })
                        }}
                        id="textarea_1" className="markdown_textarea"
                        value={inputContent}
                        onChange={handleChange}></textarea>
                </div>
            </div>
        )
    }

    const render = () => {
        return (
            <div>
                {inputArea()}
            </div>
        )
    }

    return render();
}


export const MemorizedMarkdownInputArea = React.memo(MarkdownInputArea)