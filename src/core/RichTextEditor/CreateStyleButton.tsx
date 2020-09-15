import React, { useState, useEffect } from 'react';
import { Button, Tooltip, MenuItem, Select, FormControl } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core';
import { IToolbarButton } from './model/RichText';
import Icon from "@material-ui/core/Icon";
export function CreateStyleButton(buttonData: IToolbarButton) {
    const [selection, setSelection] = useState(buttonData.value);

    useEffect(() => {
        // debugger;
        setSelection(buttonData.value)
    }, [buttonData.value])
    const buttonStyles = makeStyles(() => createStyles({
        buttonLabel: {
            justifyContent: "start",
            padding: '0 0 0 6px',
            minWidth: 'auto'
        },
        menuWidth: {
            minWidth: 'auto',
            paddingLeft: '0 0 0 3px'
        },
        topPadding: {
            paddingTop: 4
        },
        transformNone: {
            textTransform: 'none'
        },
        displayNone: {
            display: 'none'
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

    const buttonRenderCustom = (buttonData: IToolbarButton) => {
        return (buttonData?.icon !== '' ?
            <div id={`rec_mi_${buttonData.key}`}><span><Icon id={`rec_mi_${buttonData.icon}`} className={classes.topPadding}>
                {buttonData.icon}
            </Icon> <strong>{buttonData?.buttonText}</strong></span></div>
            : <div id={`rec_mi_${buttonData.key}`}><span><strong>{buttonData?.buttonText}</strong></span></div>)
    }
    const buttonRenderDefault = (buttonData: IToolbarButton) => {
        return buttonData.callback();
    }
    const render = () => {
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

                                        disabled={button.disabled} className={`${classes.menuWidth} ${button.disabled ? classes.displayNone : ""}`} key={button.key} value={button.value}>
                                        <Tooltip placement={button?.position ? button.position : "top"} title={`${button.tooltip}`}>
                                            <div className={classes.buttonLabel}>
                                                {button?.icon !== '' ?
                                                    <div id={`rec_mi_menu_${button.key}`}>
                                                        <Icon >
                                                            {button.icon}
                                                        </Icon> <span> {button?.buttonText}</span>
                                                    </div>
                                                    : <span > {button?.buttonText}</span>}
                                            </div>
                                        </Tooltip>
                                    </MenuItem>
                                ))}
                            </Select>
                        </Tooltip>
                    </FormControl>
                    : <div className={buttonData.disabled ? classes.displayNone : ''}>
                        <Tooltip placement={buttonData?.position ? buttonData.position : "top"} title={`${buttonData.tooltip}`}>
                            <Button aria-label={buttonData.ariaLabel} onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => buttonData.callback(e)} className={`${buttonData.buttonStyle} ${classes.transformNone}`}>
                                {buttonData.isDefault ? buttonRenderDefault(buttonData) : buttonRenderCustom(buttonData)}
                            </Button>
                        </Tooltip></div>}
            </div>
        );
    }
    return render();
}