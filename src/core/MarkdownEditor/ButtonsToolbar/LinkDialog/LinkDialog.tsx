import React, { useState } from 'react'
import { BaseButton } from '../../../Button/BaseButton';
import { Checkbox } from '../../../Checkbox/Checkbox';
import { ComboInsert } from "../../model/ComboInsert";
import { isURLValid } from '../../../utils/util-is-url-valid';
import { CloseButton, ErrorMessage, Label, RedSup, Row, StyledInput, ToolbarButton } from '../../../Styles/CommonStyles';
import { ButtonProps } from '../../model/ButtonToolbarProps';
import { DialogBox } from '../../../DialogBox/DialogBox';


interface UrlDialogProps {
    text: string;
    url: string;
    title: string;
    global: boolean
}

export default function LinkDialog(props: ButtonProps) {

    const [open, setOpen] = useState(false);

    const [urlValidateError, setUrlValidateError] = useState(false);

    const [errors, setErrors] = useState({
        text: '',
        url: '',

    })

    const [linkData, setLinkData] = useState<UrlDialogProps>({
        text: '',
        title: '',
        url: '',
        global: false
    })

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setLinkData({ text: '', title: '', url: '', global: false })
        }, 200);
    }

    const toggleDialog = () => {
        setOpen(!open)
    }

    const packageLink = (data: UrlDialogProps): ComboInsert => {
        const topInsert = data.global ? `[${data.text}]:${data.url} "${data.title}"\n\n` : ''
        const textInsert = data.global ? `[${data.text}]` : `[${data.text}](${data.url} "${data.title}")`
        return {
            topInsert: topInsert,
            textInsert: textInsert
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        validate(linkData);
        if (linkData.text.trim() !== "" && linkData.url.trim() !== "") {
            props.callback(packageLink(linkData));
            handleClose();

        }
    }

    const handleCheckboxChange = (e: any) => {
        setLinkData({
            ...linkData,
            global: e.target.checked
        })
    }

    const validate = (values: UrlDialogProps) => {
        if (values.text === "" || values.url === "") {
            // console.log(values);

            setErrors({
                // ...linkData,
                text: values.text === "" ? "Text cannot be blank" : "",
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
                id="link-input-dialog"
                title="Add Link"
                open={open}
                onClose={handleClose}
                width={380}
            >
                <form onSubmit={handleSubmit} noValidate>
                    <Row>
                        <Label htmlFor="text">Text<RedSup>*</RedSup></Label>
                        <StyledInput type="text" name="text" id="text" onChange={(e: any) => {
                            setLinkData({ ...linkData, text: e.target.value })
                        }} />
                        {errors.text && (
                            <ErrorMessage>
                                {errors.text}
                            </ErrorMessage>
                        )}
                    </Row>
                    <Row>
                        <Label htmlFor="title">Title</Label>
                        <StyledInput type="text" name="title" id="title" onChange={(e: any) => {
                            setLinkData({ ...linkData, title: e.target.value })
                        }} />
                    </Row>
                    <Row>
                        <Label htmlFor="url">URL<RedSup>*</RedSup></Label>
                        <StyledInput
                            type="text"
                            name="url"
                            id="url"
                            onChange={(e: any) => {
                                setUrlValidateError(!isURLValid(e.target.value));
                                setLinkData({ ...linkData, url: e.target.value })
                            }} />
                        {errors.url && (
                            <ErrorMessage>
                                {errors.url}
                            </ErrorMessage>
                        )}
                        {urlValidateError &&
                            (
                                <ErrorMessage>
                                    URL is not valid
                                </ErrorMessage>
                            )}
                    </Row>
                    <Row
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                    >
                        <Label>Is globally available?</Label>
                        <Checkbox
                            id="global-link"
                            name="global-link"
                            checked={linkData.global}
                            onChange={handleCheckboxChange}
                        />
                    </Row>
                    <Row
                        justifyContent={"flex-start"}
                        alignItems={"start"}
                        padding={5}
                    >
                        <BaseButton
                            type="submit"
                        >
                            Insert Link
                        </BaseButton>
                        <CloseButton
                            onClick={handleClose}
                        >
                            Close
                        </CloseButton>
                    </Row>
                    <Row>
                        <p><strong>Note</strong>: Fields with <RedSup>*</RedSup> are required.</p>
                    </Row>
                </form>
            </DialogBox>
        </div>
    )
}
