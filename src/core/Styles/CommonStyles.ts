import styled from "styled-components";
import { BaseButton } from "../Button/BaseButton";

export const fontStyle = `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`

export const ToolbarButton = styled(BaseButton)`
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


export const CloseButton = styled(BaseButton)`
    background-color:#bf0000;
    color:white;
    &:hover{
        background-color:#9d0000;
    }
`;

export const Label = styled.label`
    font-size:1.3em;
    font-family: ${fontStyle};
    padding:3px;
    min-width:80px;
`;

export const StyledInput = styled.input`
    padding:10px;
    width:75%;
    border:2px solid lightgray;
    border-radius:3px;
    &:focus{
        border:2px solid #63a4ff;
    }
`;

type RowProps = {
    flex?: string | number;
    gap?: number;
    maxHeight?: string;
    minHeight?: string;

}

export const Row = styled.div<RowProps>`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:flex-start;
    width:100%;
    gap:${(props: any) => props.gap || 0}px;
    flex:${(props: any) => props.flex || 0};
    max-height:${(props: any) => props.maxHeight || 'fit-content'};
    min-height:${(props: any) => props.minHeight || 'fit-content'};
`;

export const ErrorMessage = styled.span`
    color:#bf0000;
    font-family:${fontStyle};
    font-size:14px;
`;

type ColumnProps = {
    width?: string;
    color?: string;
    flex?: string | number;
    maxHeight?: string;
}

export const Column = styled.div<ColumnProps>`
    display:flex;
    flex-direction:column;
    align-items:stretch;
    justify-content:flex-start;
    background-color:${(props: any) => props.color};
    flex:${(props: any) => props.flex || 0};
    min-width:${(props: any) => props.width || 'auto'};
    max-height:${(props: any) => props.maxHeight || 'fit-content'};
`;

type StyledTextareaProps = {
    maxHeight?: string;
}

export const StyledTextarea = styled.textarea<StyledTextareaProps>`
    display: flex;
    font-size: 1.125em;
    font-family: ${fontStyle};
    color: inherit;
    position: relative;
    display: flex;
    max-width:calc(100% - 28px);
    width:95%;
    min-width:calc(100% - 28px);
    flex: 1;
    align-items: stretch;
    overflow: auto;
    margin-top: -1px;
    max-height:${(props: any) => props.maxHeight || "fit-content"};
    background-color: hsl(0, 0%, 97.5%);
    border: 1px solid hsl(214, 13%, 90%);
    padding: calc(0.5 * (1em + 1ex));
    border-radius: 3px;
`;

type MainContainerProps = {
    minHeight?: string;
}

export const MainContainer = styled.div<MainContainerProps>`
    min-height: ${(props: any) => props.minHeight || "100%"};
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Container = styled.div`
    display:flex;
    align-items:stretch;
    justify-content:flex-start;
    position: fixed;

`;

type MarkdownBodyProps = {
    maxHeight?: string;
    overflowY: string;
}
export const MarkdownBody = styled.div<MarkdownBodyProps>`
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    font-family:${fontStyle};
    font-size: 1.125em;
    word-wrap: break-word;
    width:auto;
    overflow-y:${(props: any) => props.overflowY};
    max-height:${(props: any) => props.maxHeight || 'fit-content'};
    flex:1;
    &:before{
        content: "";
        display: table;
    }
    &:after{
        clear: both;
        content: "";
        display: table;
    }
    padding-left:10px;
`;


export const ToolbarRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:start;
    align-items:center;
    flex-wrap:wrap;
    background-color:#1e272c;
    padding:5px 0 5px 5px;
    border-top-left-radius:3px;
    max-width:100%;
    min-width:50%;
    position: relative;

    border-top-right-radius:3px;
`;

type PreviewTitleProps = {
    padding?: string;
}
export const PreviewTitle = styled.div<PreviewTitleProps>`
    display:flex;
    font-family:${fontStyle};
    font-size:21px;
    padding:${(props: any) => props.padding || '0'};
    align-items:center;
    justify-content:center;
    
`;

type BorderedProps = {
    bordered: boolean;
    maxHeight: string;
}

export const Bordered = styled.div<BorderedProps>`
    /* display:flex; */
    border: ${(props: any) => props.bordered ? '2px solid lightgray' : 'none'};
    max-height:${(props: any) => props.maxHeight || "fit-content"};
    display:flex;
    flex-direction:column;
    flex:1;

`;