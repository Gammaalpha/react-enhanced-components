import React from 'react'
import { useState } from 'react';
import { ButtonProps } from '../../models/MarkdownEditorModel';
import { RecDropdownMenu, RecMenuDropdownItem } from "../../Rec-Dropdown-Menu/RecDropdownMenu";

interface ComboButtonProps {
    buttonData: ButtonProps
}

export const ComboButton = (props: ComboButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    };

    // const handleClose = () => {
    //     setIsOpen(false)
    // };

    const render = () => {
        return (
            <div>
                <RecDropdownMenu
                    onClick={handleClick}
                    open={isOpen}
                    leftIcon={props.buttonData.icon}
                    id="simple-dropdown"
                    title={""}
                >
                    {props.buttonData.options && props.buttonData.options.map(item => (
                        <RecMenuDropdownItem
                            ariaLabel={item.ariaLabel}
                            id={item.key}
                            onClick={item.callback}
                            key={item.key}
                        >
                            {item.label}
                        </RecMenuDropdownItem>
                    ))}
                </RecDropdownMenu>
            </div>
        )
    }
    return render();
}
