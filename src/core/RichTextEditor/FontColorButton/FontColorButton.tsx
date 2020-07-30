import React, { useState, useEffect } from 'react'
import { IFontColorButtonProps, FontColorButtonType } from '../model/ColorPicker';
import { CompactPicker } from 'react-color';
import { withStyles, MenuProps, Menu, MenuItem } from '@material-ui/core';
import { CreateStyleButton } from '../CreateStyleButton';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));
const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function FontColorButton(props: IFontColorButtonProps) {
    const [currColor, setCurrColor] = useState(props.defaultColor);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    let buttonInfo = props.buttonParams;
    const handleColorChange = (color: any) => {
        setCurrColor(color.hex);
        changeIconColor(color.hex);
    }

    useEffect(() => {

        if (props.defaultColor !== currColor) {
            props.callback(currColor, props.buttonType, props.range);
            // handleClose();
        }

    }, [currColor, props, props.defaultColor])

    const changeIconColor = (color: string) => {
        console.log(document?.querySelectorAll(`#rec_mi_${props.buttonParams.key}`)[0]?.firstChild);

        document?.querySelectorAll(`#rec_mi_${props.buttonParams.key}>span`)[0]?.setAttribute('style', `font-size:18px;border-bottom: 3px solid ${color};`);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const compactPicker = () => {
        return (
            <CompactPicker
                color={currColor}
                onChangeComplete={handleColorChange} />
        )
    }

    const render = () => {
        buttonInfo.callback = (e: React.MouseEvent<HTMLElement>) => handleClick(e);
        console.log("Color Button open:", props.range);
        if (props.defaultColor !== undefined) {
            changeIconColor(props.defaultColor);
        }
        return (
            <div>
                {CreateStyleButton(buttonInfo)}
                <StyledMenu
                    id={`${props.buttonParams.key}_${props.buttonType}`}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {compactPicker()}
                    {/* <MenuItem onClick={(e) => { e.preventDefault() }}>
                    </MenuItem> */}
                </StyledMenu>
            </div>
        )
    }

    return render();
}
