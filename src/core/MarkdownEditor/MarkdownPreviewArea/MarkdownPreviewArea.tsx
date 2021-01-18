import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import "./MarkdownPreviewArea.css"
import { RemarkAbbr } from "remark-abbr";
import { RemarkUnderline } from "remark-underline";
// import { RemarkUnderline } from "../utils/remarkUnderline";
// import { RemarkAbbr } from "../utils/remark-abbr"
// Markdown imports
// ---------------------------------
import rehype2react from 'rehype-react';
import unified from 'unified';
import remark2rehype from 'remark-rehype';
import markdown from "remark-parse";
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
// let remarkUnderline = require("remark-underline")
let rehypePicture = require("rehype-picture");
let rehypeUrls = require("rehype-urls");
let slug = require('remark-slug');
let toc = require('remark-toc');
let rehypeHighlight = require('rehype-highlight');
let remarkGfm = require("remark-gfm")
let remarkHeading = require('remark-heading-id')
let remarkMidas = require('remark-midas');
// let rehypeInline = require("rehype-inline");
// let rehypeStringify = require("rehype-stringify")

const MarkdownBody = styled.div`
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
margin: 1em 0;
word-wrap: break-word;
width:100%;
height:100%;

&:before{
    content: "";
    display: table;
}
&:after{
    clear: both;
    content: "";
    display: table;
}

`;


interface MarkdownPreviewAreaProps {
    content: string;
}

export function MarkdownPreviewArea(props: MarkdownPreviewAreaProps) {

    const [content, setContent] = useState(props.content)

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
                // .use(rehypeInline)
                // .use(rehypeStringify)
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
    const previewArea = () => {
        return (<MarkdownBody >
            <div>
                <h2 className="centerAlign">
                    Output Area
        </h2>
            </div>
            <div id="rec-markdown-preview">
                {
                    processor(content)
                }
            </div>
        </MarkdownBody>)
    }
    const render = () => {
        console.log("Preview render...");
        return (
            <div>
                {previewArea()}
            </div>
        )
    }

    return render();
}


export const MemorizedMarkdownPreviewArea = React.memo(MarkdownPreviewArea);