import React, { useEffect, useState } from 'react'
import { MarkdownProps } from './model/Markdown'
import "./MarkdownEditor.css"
import { MemorizedMarkdownPreviewArea } from './MarkdownPreviewArea/MarkdownPreviewArea';
import { MemorizedMarkdownInputArea } from './MarkdownInputArea/MarkdownInputArea';
import { Row } from '../Styles/CommonStyles';

// ---------------------------------


export function MarkdownEditor(props: MarkdownProps) {
    const [content, setContent] = useState({ text: !!props?.content ? props.content : 'Add your content **here**.' })
    let previewRefVal: any;
    const handleChange = (e: string) => {
        if (e !== content.text) {
            setTimeout(() => {
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
            console.log(scrollTop);

            if (scrollTop <= 0) {
                scrollTop = 0;
            }
            previewRefVal.current.scrollTop = scrollTop;
        }
    }

    useEffect(() => {
        if (props.callback !== undefined) {
            props.callback(content);
        }
    }, [content, props, props.editable])

    const addEditZone = () => {
        return (
            <Row gap={15} flex={1} maxHeight={props.maxEditorHeight !== undefined ? props.maxEditorHeight : '800px'}>
                {
                    props.editable && <MemorizedMarkdownInputArea
                        id={props.id}
                        maxHeight={props.maxEditorInputHeight !== undefined ? props.maxEditorInputHeight : 'calc(98% - 10px)'}
                        callback={handleChange}
                        scrollCallback={handleInputScrollPosition}
                        content={content.text}
                    ></MemorizedMarkdownInputArea>
                }
                <MemorizedMarkdownPreviewArea
                    content={content.text}
                    id={props.id}
                    maxHeight={props.maxEditorPreviewHeight !== undefined ? props.maxEditorPreviewHeight : 'calc(98% - 5px)'}
                    borderedPreview={props.borderedPreview !== undefined ? props.borderedPreview : true}
                    editable={props.editable}
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
