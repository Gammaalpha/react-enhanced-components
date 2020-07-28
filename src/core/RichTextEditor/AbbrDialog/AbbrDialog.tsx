import React, { useState, useEffect } from 'react'
import { CreateStyleButton } from '../CreateStyleButton';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, makeStyles, Theme, createStyles } from '@material-ui/core';
export interface IAbbrDialogProps {
    quillEditor: any;
    callback?: any;
    btnStyle?: string;
}


const useStyles = makeStyles((theme: Theme) => createStyles({
    column: {
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center"

    }
}))

export default function AbbrDialog(props: IAbbrDialogProps) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [abbr, setAbbr] = useState({
        text: '',
        title: '',
        range: {}
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    const abbrButton = {
        key: 'abbreviation',
        icon: '',
        tooltip: 'Abbreviation',
        buttonText: '<abbr>',
        ariaLabel: 'Add Abbreviation over selected text',
        callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOpen(),
        position: 'top',
        buttonStyle: props.btnStyle
    };

    useEffect(() => {
        const quill = props.quillEditor;
        if (open) {
            if (props?.quillEditor) {
                const range = quill.getSelection();
                let [leaf, offset] = quill.getLeaf(range.index);
                if (leaf.domNode.tagName === "ABBR") {
                    setAbbr({
                        text: leaf.domNode.textContent.trim(),
                        title: leaf.domNode.title,
                        range: range
                    })
                }
                else {

                    if (range?.length > 0) {
                        let innerText = quill.getText(range.index, range.length);
                        setAbbr({
                            text: innerText,
                            title: '',
                            range: range
                        })
                    }
                }
            }
        }

    }, [open, props, props.quillEditor])
    const handleSubmit = () => {
        handleClose();
        props.callback(abbr)
    };

    const render = () => {
        return (
            <div >
                {CreateStyleButton(abbrButton)}
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-abbr">
                    <DialogTitle id="form-dialog-abbr-title">
                        Insert Abbreviation
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Fill in the fields below to add abbreviation.
                        </DialogContentText>
                        <div className={classes.column}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="Text"
                                label="Text"
                                type="text"
                                value={abbr.text}
                                onChange={(e: any) => {
                                    setAbbr({
                                        title: abbr.title,
                                        text: e.target.value,
                                        range: abbr.range
                                    });
                                }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Title"
                                type="text"
                                value={abbr.title}
                                onChange={(e: any) => {
                                    setAbbr({
                                        title: e.target.value,
                                        text: abbr.text,
                                        range: abbr.range
                                    });
                                }}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={() => handleSubmit()} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };

    return render();
}