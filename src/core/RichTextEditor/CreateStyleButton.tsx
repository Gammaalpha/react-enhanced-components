import React, { useState } from 'react';
import { Button, Tooltip, MenuItem, Select, FormControl } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core';
import { IToolbarButton } from './model/RichText';
import Icon from "@material-ui/core/Icon";
export function CreateStyleButton(buttonData: IToolbarButton) {
    const [selection, setSelection] = useState(buttonData.value);
    const buttonStyles = makeStyles(() => createStyles({
        buttonLabel: {
            justifyContent: "start",
            padding: '0 0 0 6px',
            minWidth: 'auto'
        },
        menuWidth: {
            minWidth: 'auto',
            paddingLeft: '0 0 0 3px'
        }
    }));

    const handleCallback = (event: any) => {
        ;
        if (buttonData?.childButtons) {
            const item = buttonData.childButtons.filter((x) => x.value === event.target.value);
            // console.log(item[0].buttonText);
            item[0].callback(event);
            setSelection(event.target.value);
        }
    };
    const classes = buttonStyles();
    return (
        <div key={`${buttonData.key}`}>
            {buttonData.childButtons !== undefined && buttonData.childButtons.length > 0 ?
                <FormControl variant="filled" className={buttonData.buttonStyle}>
                    <Tooltip placement={buttonData?.position ? buttonData.position : "top"} title={`${buttonData.tooltip}`}>
                        <Select
                            aria-label={buttonData.ariaLabel}
                            labelId={`${buttonData.key}_label`}
                            id={`${buttonData.key}_Id`}
                            value={selection}
                            onChange={(event: any) => {

                                handleCallback(event);
                            }}
                        >
                            {buttonData.childButtons.map((button) => (
                                <MenuItem

                                    disabled={button.disabled} className={classes.menuWidth} key={button.key} value={button.value}>
                                    <Tooltip placement={button?.position ? button.position : "top"} title={`${button.tooltip}`}>
                                        <div className={classes.buttonLabel}>
                                            {button?.icon ?
                                                <div>
                                                    <Icon>
                                                        {button.icon}
                                                    </Icon> {button?.buttonText}
                                                </div>
                                                : button?.buttonText}
                                        </div>
                                    </Tooltip>
                                </MenuItem>
                            ))}
                        </Select>
                    </Tooltip>
                </FormControl>
                : <Tooltip placement={buttonData?.position ? buttonData.position : "top"} title={`${buttonData.tooltip}`}>
                    <Button disabled={buttonData.disabled} aria-label={buttonData.ariaLabel} onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => buttonData.callback(e)} className={buttonData.buttonStyle}>
                        <Icon>{buttonData.icon}</Icon>
                        {buttonData?.buttonText}
                    </Button>
                </Tooltip>}
        </div>
    );
}
