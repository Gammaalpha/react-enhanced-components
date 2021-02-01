import React, { useState } from 'react'
import { BaseButton } from '../../../Button/BaseButton';
import { ComboInsert } from "../../model/ComboInsert";
import { isURLValid } from '../../../utils/util-is-url-valid';
import { CloseButton, ErrorMessage, Label, Row, StyledInput, ToolbarButton } from '../../../Styles/CommonStyles';
import { ButtonProps } from '../../model/ButtonToolbarProps';
import { DialogBox } from '../../../DialogBox/DialogBox';


interface ImageDialogProps {
    text?: string;
    url: string;
    title?: string;
    width?: string;
    height?: string;
}



export default function ImageDialog(props: ButtonProps) {

    const [open, setOpen] = useState(false);
    const [urlError, setUrlError] = useState(false);


    const [errors, setErrors] = useState({
        url: '',

    })

    const [linkData, setLinkData] = useState({
        text: '',
        title: '',
        url: '',
        width: '',
        height: '',
    })

    const handleClose = () => {
        setOpen(false)
    }

    const toggleDialog = () => {
        setOpen(!open)
    }

    const packageImage = (data: ImageDialogProps): ComboInsert => {

        return {
            topInsert: '',
            textInsert: data.height !== "" || data.width !== "" ? `<img title="${data.title}" alt="${data.text?.replace(/\s/gi, '_')}" src="${data.url}" width="${data.width}" height="${data.height}" />` : `![${data.text?.replace(/\s/gi, '_')}](${data.url} "${data.title}")`
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        validate(linkData);
        if (linkData.text.trim() !== "" && linkData.url.trim() !== "") {
            props.callback(packageImage(linkData));
            handleClose();
        }
    }

    const validate = (values: ImageDialogProps) => {
        if (values.text === "" || values.url === "") {
            setErrors({
                url: values.url === "" ? "URL cannot be blank" : ""
            })
        }
    }

    return (
        <div>
            <ToolbarButton
                onClick={toggleDialog}
                aria-label={props.ariaLabel}>{props.icon}</ToolbarButton>
            <DialogBox
                id="image-input-dialog"
                title="Add Image"
                open={open}
                onClose={handleClose}
                width={280}
            >
                <form onSubmit={handleSubmit} noValidate>
                    <Row>
                        <Label htmlFor="text">Text</Label>
                        <StyledInput type="text" name="text" id="text" onChange={(e: any) => {
                            setLinkData({ ...linkData, text: e.target.value })
                        }} />
                    </Row>
                    <Row>
                        <Label htmlFor="title">Title</Label>
                        <StyledInput type="text" name="title" id="title" onChange={(e: any) => {
                            setLinkData({ ...linkData, title: e.target.value })
                        }} />
                    </Row>
                    <Row>
                        <Label htmlFor="url">URL</Label>
                        <StyledInput type="text" name="url" id="url" onChange={(e: any) => {
                            setUrlError(!isURLValid(e.target.value));
                            setLinkData({ ...linkData, url: e.target.value })
                        }} />
                        {errors.url && (
                            <ErrorMessage>
                                {errors.url}
                            </ErrorMessage>
                        )}
                        {urlError &&
                            (
                                <ErrorMessage>
                                    URL is not valid
                                </ErrorMessage>
                            )}
                    </Row>
                    <Row>
                        <Label htmlFor='width'>Width</Label>
                        <StyledInput
                            type="text"
                            name="width"
                            id="width"
                            value={linkData.width}
                            onChange={(e: any) => {
                                setLinkData({
                                    ...linkData,
                                    width: e.target.value
                                })
                            }}
                        />
                        <Label htmlFor='height'>Height</Label>
                    </Row>
                    <Row>
                        <StyledInput
                            type="text"
                            value={linkData.height}
                            name="height"
                            id="height"
                            onChange={(e: any) => {
                                setLinkData({
                                    ...linkData,
                                    height: e.target.value
                                })
                            }}
                        />
                    </Row>
                    <Row
                        padding={5}
                    >
                        <BaseButton
                            type="submit"
                        >
                            Insert Image
                        </BaseButton>
                        <CloseButton
                            onClick={handleClose}
                        >
                            Close
                        </CloseButton>
                    </Row>
                </form>

            </DialogBox>
        </div>
    )
}
