import React, { useState } from 'react'
import { MarkdownProps } from './model/Markdown'
import "./MarkdownEditor.css"
import { MemorizedMarkdownPreviewArea } from './MarkdownPreviewArea/MarkdownPreviewArea';
import { MemorizedMarkdownInputArea } from './MarkdownInputArea/MarkdownInputArea';
import { Row } from '../Styles/CommonStyles';

// ---------------------------------


const defaultText = "Add your content **here**."
export function MarkdownEditor(props?: MarkdownProps) {
    const [content, setContent] = useState({ text: !!props?.content ? props.content : defaultText })
    let previewRefVal: any;
    const handleChange = (e: string) => {
        if (e !== content.text) {
            setTimeout(() => {
                // console.log("change detected...");
                setContent({ text: e });
            }, 100);
        }
    }


    const handlePreviewRef = (e: any) => {
        previewRefVal = e;
    }

    const handleInputScrollPosition = (e: any) => {
        if (previewRefVal.current !== undefined) {
            let scrollTop = (((e) * previewRefVal.current.scrollHeight) / 100) - (previewRefVal.current.offsetHeight);
            if (scrollTop <= 0) {
                scrollTop = 0;
            }
            previewRefVal.current.scrollTop = scrollTop;
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