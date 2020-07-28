import React, { useState, useEffect } from 'react'
import { CreateStyleButton } from '../CreateStyleButton';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import { ILink } from '../model/RichText';
export interface ILinkDialogProps {
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

export default function LinkDialog(props: ILinkDialogProps) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [link, setLink] = useState<ILink>({
        text: '',
        url: '',
        target: '',
        range: {
            index: 0,
            length: 0
        }
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
                if (leaf.domNode.tagName === "A") {
                    setLink({
                        text: leaf.domNode.textContent.trim(),
                        url: leaf.domNode.href,
                        target: '',
                        range: range
                    })
                }
                else {

                    if (range?.length > 0) {
                        let innerText = quill.getText(range.index, range.length);
                        setLink({
                            text: innerText,
                            url: '',
                            target: '',
                            range: range
                        })
                    }
                }
            }
        }

    }, [open, props, props.quillEditor])
    const handleSubmit = () => {
        handleClose();
        props.callback(link)
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
                                value={link.text}
                                onChange={(e: any) => {
                                    setLink({
                                        target: '',
                                        url: link.url,
                                        text: e.target.value,
                                        range: link.range
                                    });
                                }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="url"
                                label="URL"
                                type="text"
                                value={link.url}
                                onChange={(e: any) => {
                                    setLink({
                                        url: e.target.value,
                                        text: link.text,
                                        target: '',
                                        range: link.range
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