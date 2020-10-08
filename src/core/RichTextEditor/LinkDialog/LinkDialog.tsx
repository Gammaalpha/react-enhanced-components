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
        href: '',
        target: '',
        title: '',
        range: {
            index: 0,
            length: 0
        }
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        props.callback(link)
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
                let [leaf, offset] = quill.getLeaf(range !== null ? range.index + 1 : 0)
                const parentDomNode = leaf.parent.domNode;
                if (parentDomNode.tagName === "A") {
                    setLink({
                        text: parentDomNode.innerText !== undefined ? parentDomNode.innerText.trim() : '',
                        href: parentDomNode.href,
                        target: parentDomNode.target,
                        title: parentDomNode.title,
                        range: range
                    })
                }
                else {
                    if (range.length > 0) {
                        let innerText = range?.length > 0 ? quill.getText(range.index, range.length) : "";
                        setLink({
                            text: innerText,
                            href: '',
                            target: '',
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
        // props.callback(link)
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
                                id="Title"
                                label="Tooltip text to display"
                                type="text"
                                value={link.title}
                                onChange={(e: any) => {
                                    setLink({
                                        ...link,
                                        title: e.target.value,
                                    });
                                }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="href_link"
                                label="Address"
                                placeholder="https://"
                                helperText="Ensure link contains https://"
                                type="text"
                                value={link.href}
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
                                        href: e.target.value,
                                    });
                                }}
                            />
                            <FormControlLabel
                                label="Open in a new tab?"
                                control={
                                    <Checkbox
                                        checked={link.target === "_blank" ? true : false}
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