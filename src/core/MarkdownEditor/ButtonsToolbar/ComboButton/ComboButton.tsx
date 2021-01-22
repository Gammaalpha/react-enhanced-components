
import React from 'react'
import { useState } from 'react';
import { Menu, MenuDropdownItem } from '../../../Menu/Menu';
import { ButtonProps } from '../../model/MarkdownEditorModel';

interface ComboButtonProps {
    buttonData: ButtonProps
}

export const ComboButton = (props: ComboButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    };


    const render = () => {
        return (
            <div>
                <Menu
                    onClick={handleClick}
                    open={isOpen}
                    leftIcon={props.buttonData.icon}
                    id="simple-dropdown"
                    title={""}
                >
                    {props.buttonData.options && props.buttonData.options.map(item => (
                        <MenuDropdownItem
                            ariaLabel={item.ariaLabel}
                            id={item.key}
                            onClick={item.callback}
                            key={item.key}
                        >
                            {item.label}
                        </MenuDropdownItem>
                    ))}
                </Menu>
            </div>
        )
    }
    return render();
}
