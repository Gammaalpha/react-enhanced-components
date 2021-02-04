import React, { useState } from 'react'
import { BaseButton } from '../../../Button/BaseButton';
import { ComboInsert } from "../../model/ComboInsert";
import { CloseButton, ErrorMessage, Label, RedSup, Row, StyledInput, ToolbarButton } from '../../../Styles/CommonStyles';
import { ButtonProps } from '../../model/ButtonToolbarProps';
import { DialogBox } from '../../../DialogBox/DialogBox';


interface AbbrDialogProps {
    text: string;
    title: string;
}



export default function AbbrDialog(props: ButtonProps) {

    const [open, setOpen] = useState(false);


    const [errors, setErrors] = useState({
        text: '',
        title: ''
    })

    const [abbrData, setAbbrData] = useState({
        text: '',
        title: ''
    })

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setAbbrData({ text: '', title: '' })
        }, 200);
    }

    const toggleDialog = () => {
        setOpen(!open)
    }

    const packageAbbr = (data: AbbrDialogProps): ComboInsert => {
        return {
            topInsert: `*[${data.text}]:${data.title}\n\n`,
            textInsert: `${data.text}`
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        validate(abbrData);
        if (abbrData.text.trim() !== "" && abbrData.title.trim() !== "") {
            props.callback(packageAbbr(abbrData));
            handleClose();

        }
    }

    const validate = (values: AbbrDialogProps) => {
        if (values.text === "" || values.title === "") {
            setErrors({
                text: values.text === "" ? "Text cannot be blank" : "",
                title: values.title === "" ? "Title cannot be blank" : ""
            })
        }
    }

    return (
        <div>
            <ToolbarButton
                onClick={toggleDialog}
                aria-label={props.ariaLabel}>{props.icon}</ToolbarButton>
            <DialogBox
                id="abbr-input-dialog"
                title="Add Abbreviation"
                open={open}
                onClose={handleClose}
                width={380}
            >
                <form onSubmit={handleSubmit} noValidate>
                    <Row>
                        <Label htmlFor="text">Text<RedSup>*</RedSup></Label>
                        <StyledInput type="text" name="text" id="text" onChange={(e: any) => {
                            setAbbrData({ ...abbrData, text: e.target.value })
                        }} />
                        {errors.text && (
                            <ErrorMessage>
                                {errors.text}
                            </ErrorMessage>
                        )}
                    </Row>
                    <Row>
                        <Label htmlFor="title">Title<RedSup>*</RedSup></Label>
                        <StyledInput type="text" name="title" id="title" onChange={(e: any) => { setAbbrData({ ...abbrData, title: e.target.value }) }} />
                        {errors.title && (
                            <ErrorMessage>
                                {errors.title}
                            </ErrorMessage>
                        )}
                    </Row>
                    <Row
                        padding={5}
                    >
                        <BaseButton
                            type="submit"
                        >
                            Insert Abbreviation
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
