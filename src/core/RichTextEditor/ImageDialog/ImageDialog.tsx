import React, { useState, useEffect } from 'react'
import { CreateStyleButton } from '../CreateStyleButton';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, makeStyles, Theme, createStyles, FormGroup, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
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
    const [range, setRange] = useState({ index: 0, length: 0 })
    const [urlError, setUrlError] = useState(false)
    const [image, setImage] = useState<IImageLink>({
        text: 'image',
        url: '',
        target: '',
        range: {
            index: 0,
            length: 0
        },
        alt: 'image',
        width: 150,
        height: 150,
        float: 'none'
    })

    const handleOpen = () => {
        console.log(props);

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
        callback: () => handleOpen(),
        position: 'top',
        buttonStyle: props.btnStyle
    };

    useEffect(() => {
        console.log("in use effect: ",props);

        const quill = props.quillEditor;
        if (open) {
            if (quill !== undefined && quill !== null) {
                // range = quill.getSelection();
                setRange(quill.getSelection());
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                let [leaf] = quill.getLeaf(range !== null ? range.index : 0);
                if (leaf.domNode.tagName === "IMG") {
                    setImage({
                        height: image.height,
                        width: image.width,
                        alt: image.alt,
                        float: image.float,
                        text: leaf.domNode.textContent.trim(),
                        url: leaf.domNode.src,
                        target: '',
                        range: range
                    })
                }
                // else {
                //     debugger;
                //     if (range?.index > 0) {
                //         let innerText = quill.getText(range.index, range.length);
                //         setImage({
                //             height: image.height,
                //             width: image.width,
                //             altText: image.altText,
                //             float: image.float,
                //             text: innerText,
                //             url: '',
                //             target: '',
                //             range: range
                //         })
                //         console.log(image);

                //     }
                // }
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, props, props.quillEditor]);

    // useEffect(() => {
    //     console.log("range", range)
    // }, [range]);

    const handleSubmit = () => {
        handleClose();
        let tempImage = image;
        tempImage.range = range;
        props.callback(tempImage)
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
                                value={image.alt}
                                onChange={(e: any) => {
                                    setImage({
                                        ...image,
                                        alt: e.target.value,
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
                        <Button
                            // disabled={!urlError} 
                            onClick={() => handleSubmit()} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };

    return render();
}