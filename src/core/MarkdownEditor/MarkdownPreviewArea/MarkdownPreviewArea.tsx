import React, { useEffect, useRef, useState } from 'react'
import { RemarkAbbr } from "remark-abbr";
import { RemarkUnderline } from "remark-underline";
// Markdown imports
// ---------------------------------
import rehype2react from 'rehype-react';
import unified from 'unified';
import remark2rehype from 'remark-rehype';
import markdown from "remark-parse";
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import { Bordered, Column, MarkdownBody, PreviewTitle } from '../../Styles/CommonStyles';
let rehypePicture = require("rehype-picture");
let rehypeUrls = require("rehype-urls");
let slug = require('remark-slug');
let toc = require('remark-toc');
let rehypeHighlight = require('rehype-highlight');
let remarkGfm = require("remark-gfm")
let remarkHeading = require('remark-heading-id')
let remarkMidas = require('remark-midas');

interface MarkdownPreviewAreaProps {
    content: string;
    maxHeight?: string;
    previewRefCallback?: any;
    editable: boolean;
    borderedPreview?: boolean;
}

export function MarkdownPreviewArea(props: MarkdownPreviewAreaProps) {

    const [content, setContent] = useState(props.content)
    const previewRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        setContent(props.content);
    }, [props])

    const processor = (_content: any): any => {
        let markdown_processor = null;
        try {
            let unifiedResult = unified()
                .use(markdown)
                .use(remarkMidas)
                .use(remarkGfm)
                .use(slug)
                .use(toc)
                .use(remarkHeading)
                .use(RemarkUnderline)
                .use(RemarkAbbr)
                .use(remark2rehype, { allowDangerousHtml: true })
                .use(rehypeRaw)
                .use(rehypeUrls, (url: any, node: any) => {
                    if (url.host !== 'internal.site') {
                        node.properties.target = "_blank"
                    }
                })
                .use(rehypePicture)
                .use(rehypeHighlight)
                .use(rehypeSanitize)
                .use(rehype2react, {
                    createElement: React.createElement
                })
                .processSync(_content)
            markdown_processor = unifiedResult.result;
        } catch (error: any) {
            console.error(error.message);
            markdown_processor = (
                <div>
                    Error in markdown.
                    <p>
                        {error.message}
                    </p>
                </div>
            );
        }
        return markdown_processor
    }


    useEffect(() => {
        if (previewRef !== null && previewRef !== undefined) {
            props.previewRefCallback(previewRef)
        }
    }, [props])
    const render = () => {
        return (
            <Column flex={1} width={"45%"}
                id="markdownPreviewAreaColumn"
                maxHeight={props.maxHeight || 'fit-content'}
            >
                <Bordered
                    maxHeight={props.editable ? 'calc(100% - 10px)' : 'fit-content'}
                    // maxHeight={props.maxHeight || "fit-content"}
                    bordered={props.borderedPreview !== undefined ? props.borderedPreview : true}
                >
                    {
                        props.editable && <PreviewTitle>
                            <h2>
                                PREVIEW AREA
                            </h2>
                        </PreviewTitle>
                    }
                    <MarkdownBody
                        ref={previewRef}
                        id="rec-markdown-preview"
                        overflowY={props.editable ? 'scroll' : 'hidden'}
                    >
                        {
                            processor(content)
                        }
                    </MarkdownBody>
                </Bordered>
            </Column>
        );
    }

    return render();
}


export const MemorizedMarkdownPreviewArea = React.memo(MarkdownPreviewArea);