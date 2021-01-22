import React, { useState } from 'react'
import { MarkdownProps } from './model/Markdown'
import "./MarkdownEditor.css"
import { MemorizedMarkdownPreviewArea } from './MarkdownPreviewArea/MarkdownPreviewArea';
import { MemorizedMarkdownInputArea } from './MarkdownInputArea/MarkdownInputArea';
import { Row } from '../Styles/CommonStyles';

// ---------------------------------


const table = `*[html]:hypertext\n\n*[test]:testing\n\n[google]: https://www.google.ca "google"\n\n**test** [google] html\n\n## Heading

| Column 1       | Column 2     | Column 3     |
|:---------------|:------------:|-------------:|
|  Cell Contents | More Stuff   | And Again    |
| You Can Also   | Put Pipes In <br/>html| Like this  \\||

**!!testing!!**
`



function MarkdownEditor(props?: MarkdownProps) {
    const [content, setContent] = useState({ text: !!props?.content ? props.content : table })
    let previewRefVal: any;
    const handleChange = (e: string) => {
        if (e !== content.text) {
            setTimeout(() => {
                console.log("change detected...");
                setContent({ text: e });
            }, 100);
        }
    }


    const handlePreviewRef = (e: any) => {
        previewRefVal = e;
    }

    const handleInputScrollPosition = (e: any) => {
        if (previewRefVal.current !== undefined) {
            previewRefVal.current.scrollTop = ((e / 100) * previewRefVal.current.scrollHeight) - previewRefVal.current.offsetHeight
        }
    }

    const addEditZone = () => {
        return (
            <Row gap={15} flex={1}>
                <MemorizedMarkdownInputArea
                    callback={handleChange}
                    scrollCallback={handleInputScrollPosition}
                    content={content.text}
                ></MemorizedMarkdownInputArea>
                <MemorizedMarkdownPreviewArea content={content.text}
                    previewRefCallback={handlePreviewRef}
                ></MemorizedMarkdownPreviewArea>
            </Row>
        )
    }

    const render = () => {
        return addEditZone()
    }
    return render();
}

export default MarkdownEditor
