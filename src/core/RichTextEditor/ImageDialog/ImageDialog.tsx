import React, { useState, useEffect } from 'react'
import { CreateStyleButton } from '../CreateStyleButton';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, makeStyles, Theme, createStyles, FormGroup, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { IImageLink } from '../model/RichText';
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
        // alignItems: "center",
        width: '100%'

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))

export default function ImageDialog(props: ILinkDialogProps) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [urlError, setUrlError] = useState(false)
    const [image, setImage] = useState<IImageLink>({
        text: '',
        url: '',
        target: '',
        range: {
            index: 0,
            length: 0
        },
        altText: '',
        width: 0,
        height: 0,
        float: 'none'
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const linkButton = {
        key: 'insert_photo',
        icon: 'insert_photo',
        tooltip: 'Insert Photo',
        ariaLabel: 'Insert Photo.',
        callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOpen(),
        position: 'top',
        buttonStyle: props.btnStyle
    };

    useEffect(() => {
        const quill = props.quillEditor;
        if (open) {
            if (props?.quillEditor) {
                const range = quill.getSelection();
                let [leaf, offset] = quill.getLeaf(range !== null ? range.index : 0);
                if (leaf.domNode.tagName === "IMG") {
                    setImage({
                        ...image,
                        text: leaf.domNode.textContent.trim(),
                        url: leaf.domNode.src,
                        target: '',
                        range: range
                    })
                }
                else {
                    if (range?.length > 0) {
                        let innerText = quill.getText(range.index, range.length);
                        setImage({
                            ...image,
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
        props.callback(image)
    };

    const handleFloatChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setImage({
            ...image,
            float: event.target.value as string
        });
    }

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
                            Fill in the fields below to add image by address.
                        </DialogContentText>
                        <FormGroup aria-label="Link addition form group." className={classes.column}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="Text"
                                label="Text to display"
                                type="text"
                                value={image.text}
                                onChange={(e: any) => {
                                    setImage({
                                        ...image,
                                        text: e.target.value,
                                    });
                                }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="AltText"
                                label="Alternate Text to include"
                                type="text"
                                value={image.altText}
                                onChange={(e: any) => {
                                    setImage({
                                        ...image,
                                        altText: e.target.value,
                                    });
                                }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="url"
                                label="Address"
                                placeholder="https://"
                                helperText="Ensure link contains https:// or http://"
                                type="text"
                                value={image.url}
                                error={!urlError}
                                onChange={(e: any) => {
                                    // debugger;
                                    const regex = /^http([s]?):\/\/.*/;
                                    if (!regex.test(e.target.value)) {
                                        setUrlError(false)
                                    } else {
                                        setUrlError(true)
                                    }

                                    setImage({
                                        ...image,
                                        url: e.target.value,
                                    });
                                }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="Width"
                                label="Image width"
                                type="number"
                                value={image.width}
                                onChange={(e: any) => {
                                    setImage({
                                        ...image,
                                        width: e.target.value,
                                    });
                                }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="Height"
                                label="Image Height"
                                type="number"
                                value={image.height}
                                onChange={(e: any) => {
                                    setImage({
                                        ...image,
                                        height: e.target.value,
                                    });
                                }}
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="imgFloat">Image Float:</InputLabel>
                                <Select
                                    labelId="Image float selection"
                                    id="imgFloat"
                                    value={image.float}
                                    onChange={handleFloatChange}
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'left'}>Left</MenuItem>
                                    <MenuItem value={'right'}>Right</MenuItem>
                                </Select>
                            </FormControl>
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