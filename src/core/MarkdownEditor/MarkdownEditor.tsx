import React, { useEffect, useState } from 'react'
import { MarkdownProps } from './model/Markdown'
import "./MarkdownEditor.css"
import { MemorizedMarkdownPreviewArea, MarkdownPreviewArea } from './MarkdownPreviewArea/MarkdownPreviewArea';
import { MemorizedMarkdownInputArea, MarkdownInputArea } from './MarkdownInputArea/MarkdownInputArea';
import { Row } from '../Styles/CommonStyles';

// ---------------------------------


export function MarkdownEditor(props: MarkdownProps) {
    const [content, setContent] = useState(props.content !== undefined ? props.content : 'Add content')
    let previewRefVal: any;
    const handleChange = (e: string) => {
        if (e !== content) {
            setTimeout(() => {
                setContent(e);
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

    useEffect(() => {
        if (props.callback !== undefined) {
            props.callback(content);
        }
    }, [content, props, props.editable])

    const addEditZone = () => {
        return (
            <Row
                gap={15}
                flex={1}
                maxHeight={props.maxEditorHeight !== undefined ? props.maxEditorHeight : '800px'}
                minHeight={props.minEditorHeight !== undefined ? props.maxEditorHeight : '800px'}>
                {
                    props.editable && <MarkdownInputArea
                        id={props.id}
                        maxHeight={props.maxEditorInputHeight !== undefined ? props.maxEditorInputHeight : 'calc(98% - 10px)'}
                        callback={handleChange}
                        scrollCallback={handleInputScrollPosition}
                        content={content}
                    ></MarkdownInputArea>
                }
                <MarkdownPreviewArea
                    content={content}
                    id={props.id}
                    maxHeight={props.maxEditorPreviewHeight !== undefined ? props.maxEditorPreviewHeight : 'calc(98% - 5px)'}
                    borderedPreview={props.borderedPreview !== undefined ? props.borderedPreview : true}
                    editable={props.editable}
                    previewRefCallback={handlePreviewRef}
                ></MarkdownPreviewArea>
            </Row>
        )
    }

    const render = () => {
        return addEditZone()
    }
    return render();
}
