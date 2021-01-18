import React, { useState } from 'react'
import { MarkdownProps } from './model/Markdown'
// import styled from 'styled-components'
import "./MarkdownEditor.css"
import { MemorizedMarkdownPreviewArea } from './MarkdownPreviewArea/MarkdownPreviewArea';
import { MemorizedMarkdownInputArea } from './MarkdownInputArea/MarkdownInputArea';


// ---------------------------------


const table = `
*[html]:hypertext\n\n*[test]:testing\n\n[google]: https://www.google.ca "google"\n\n**test** [google] html\n\n## Heading

| Column 1       | Column 2     | Column 3     |
|:---------------|:------------:|-------------:|
|  Cell Contents | More Stuff   | And Again    |
| You Can Also   | Put Pipes In <br/>html| Like this  \\||

**!!testing!!**

`



export function MarkdownEditor(props?: MarkdownProps) {
    const [content, setContent] = useState({ text: !!props?.content ? props.content : table })

    const handleChange = (e: string) => {
        if (e !== content.text) {
            setTimeout(() => {
                console.log("change detected...");
                setContent({ text: e });
            }, 100);
        }
        // content.text = e;
    }



    // const boldContent = () => {
    //     let textArea: HTMLInputElement = document.getElementById("textarea_1") as HTMLInputElement
    //     if (!!textArea) {
    //         let text = textArea.value;
    //         let indexStart = !!textArea.selectionStart ? textArea.selectionStart : 0;
    //         let indexEnd = !!textArea.selectionEnd ? textArea.selectionEnd : 0;
    //         let substring = text.substr(indexStart, indexEnd - indexStart)
    //         console.log(indexStart, indexEnd, substring);
    //     }
    // }


    const addEditZone = () => {
        // processor(content.text)
        console.log("Render...");
        return (
            <div>
                <div className="centerAlign">
                    <h1>Markdown editor with Abbreviation plugin</h1>

                </div>
                <div className="row">
                    <div className="column">
                        <MemorizedMarkdownInputArea callback={handleChange} content={content.text}></MemorizedMarkdownInputArea>
                    </div>
                    <div className="column">
                        <MemorizedMarkdownPreviewArea content={content.text}></MemorizedMarkdownPreviewArea>
                    </div>
                </div>
            </div >
        )
    }

    const render = () => {
        return (
            <div>
                {addEditZone()}
            </div>
        )
    }
    return render();
}
