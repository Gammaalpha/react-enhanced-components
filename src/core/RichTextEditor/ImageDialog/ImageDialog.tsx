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
    const initialImageState = {
        title: 'image',
        src: '',
        range: {
            index: 0,
            length: 0
        },
        alt: 'image',
        width: 150,
        height: 150,
        float: 'none'
    }

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState({ index: 0, length: 0 })
    const [urlError, setUrlError] = useState(false)
    const [image, setImage] = useState<IImageLink>({ ...initialImageState })

    const handleOpen = () => {
        // console.log("handle Open: ", props);
        setOpen(true);
    }

    const handleClose = () => {
        // debugger;
        let tempImage = image;
        tempImage.range = range;
        props.callback(tempImage, true)
        setImage({ ...initialImageState })
        setOpen(false);
    }

    const linkButton = {
        key: 'insert_photo',
        icon: 'insert_photo',
        tooltip: 'Insert Picture',
        ariaLabel: 'Insert Picture.',
        callback: () => handleOpen(),
        position: 'top',
        buttonStyle: props.btnStyle
    };

    useEffect(() => {
        console.log("in use effect: ", props);

        const quill = props.quillEditor;
        if (open) {
            if (quill !== undefined && quill !== null) {
                const tempRange = quill.getSelection();
                // range = quill.getSelection();
                if (tempRange !== null) {
                    setRange(tempRange);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    // debugger;
                    if (tempRange.length > 0) {
                        let [leaf, offset] = quill.getLeaf(tempRange !== null ? tempRange.index + tempRange.length : 0);
                        if (leaf?.domNode.tagName === "IMG") {
                            setImage({
                                height: image.height,
                                width: image.width,
                                alt: image.alt === "" ? 'image' : image.alt,
                                float: image.float,
                                title: leaf.domNode.textContent !== undefined && leaf.domNode.textContent !== "" ? leaf.domNode.textContent.trim() : 'image',
                                src: leaf.domNode.src !== undefined ? leaf.domNode.src : "",
                                range: tempRange
                            })
                        }
                    }
                    else {
                        if (tempRange?.length === 0) {
                            let innerText = quill.getText(range.index, tempRange.length);
                            setImage({
                                height: image.height,
                                width: image.width,
                                alt: image.alt !== null ? image.alt : "image",
                                float: image.float,
                                title: innerText !== "" ? innerText : image.title,
                                src: "",
                                range: tempRange
                            })
                            console.log(image);

                        }
                    }
                }

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
        props.callback(tempImage, false)
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
                                value={image.title}
                                onChange={(e: any) => {
                                    setImage({
                                        ...image,
                                        title: e.target.value,
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
                                value={image.src}
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
                                        src: e.target.value,
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
                            disabled={!urlError}
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