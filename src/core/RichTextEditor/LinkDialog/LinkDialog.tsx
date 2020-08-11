import React, { useState, useEffect } from 'react'
import { CreateStyleButton } from '../CreateStyleButton';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, makeStyles, Theme, createStyles, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
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
    // const [urlErrorText, setUrlErrorText] = useState('');
    const [urlError, setUrlError] = useState(false)
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
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let target = "";
        if (event.target.checked) {
            target = "_blank";
        }
        setLink({
            ...link,
            target: target,
        });
    }
    const linkButton = {
        key: 'insert_link',
        icon: 'insert_link',
        tooltip: 'Insert link',
        ariaLabel: 'Insert link',
        value: 'insertLink',
        callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOpen(),
        position: 'top',
        buttonStyle: props.btnStyle
    };

    useEffect(() => {
        const quill = props.quillEditor;
        if (open) {
            if (props?.quillEditor) {
                const range = quill.getSelection();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                let [leaf, offset] = quill.getLeaf(range !== null ? range.index : 0);
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
                {CreateStyleButton(linkButton)}
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-abbr">
                    <DialogTitle id="form-dialog-abbr-title">
                        Insert Link
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Fill in the fields below to add address.
                        </DialogContentText>
                        <FormGroup aria-label="Link addition form group." className={classes.column}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="Text"
                                label="Text to display"
                                type="text"
                                value={link.text}
                                onChange={(e: any) => {
                                    setLink({
                                        ...link,
                                        text: e.target.value,
                                    });
                                }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="url"
                                label="Address"
                                placeholder="https://"
                                helperText="Ensure link contains https://"
                                type="text"
                                value={link.url}
                                error={!urlError}
                                onChange={(e: any) => {
                                    // debugger;
                                    const regex = /^http([s]?):\/\/.*/;
                                    if (!regex.test(e.target.value)) {
                                        setUrlError(false)
                                    } else {
                                        setUrlError(true)
                                    }

                                    setLink({
                                        ...link,
                                        url: e.target.value,
                                    });
                                }}
                            />
                            <FormControlLabel
                                label="Open in a new tab?"
                                control={
                                    <Checkbox
                                        onChange={handleCheckboxChange}
                                        name="target"
                                    />
                                }
                            />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()} color="primary">
                            Cancel
                            </Button>
                        <Button disabled={!urlError} onClick={() => handleSubmit()} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };

    return render();
}