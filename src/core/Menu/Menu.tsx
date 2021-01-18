import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import styled from 'styled-components';
import "./menu.css";

import { BorderedButton } from "../Button/BorderedButton";

interface MenuProps {
    id: string;
    open: boolean;
    onClick: any;
    title: string;
    leftIcon?: any;
    ariaLabel?: string;
    children?: any;
}

const MenuButton = styled.div`
    min-width:60px;
    position: relative;
    width:auto;
`;

const MenuDropdownList = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    position:absolute;
    top:40px;
    width:134px;
    transform:translateX(1%);
    /* padding:1rem; */
    overflow:hidden;
`;

const MenuItem = styled.button`
    min-width:130px;
    width:auto;
    min-height:40px;
    padding:2px;
    border:0px;
    &:focus{
        background-color:lightgray;
    }
    &:hover{
        background-color:lightgray;
    }

`;

const Row = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`;

function usePrevious(val: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = val;
    })
    return ref.current;
}

export function Menu(props: MenuProps) {
    const ddButton: any = useRef(null);
    const [isListOpen, setIsListOpen] = useState(props.open)
    useEffect(() => {
        const handleChange = (ev: any) => {
            if (ddButton.current && ddButton.current.contains(ev.target)) {
                setIsListOpen(!isListOpen)
            }
            else {
                setIsListOpen(false)
            }
        }
        window.addEventListener('click', handleChange)

        return () => {
            window.removeEventListener('click', handleChange);
        };
    }, [isListOpen, props.open])

    const prevListState = usePrevious(isListOpen);
    let className = 'icon'

    const render = () => {
        console.log("render...");

        if (isListOpen) {
            className += ' angle_up'
        }
        else {
            if (prevListState)
                className += ' angle_down'
        }
        return (
            <MenuButton>
                <BorderedButton
                    ref={ddButton}
                    aria-label={props.ariaLabel ?? `${props.title} Menu.`}
                    onClick={props.onClick}>
                    <Row>
                        <div className="dd_rec_list_header">
                            <span>
                                {props.leftIcon}{props.title ?? ""}
                            </span>
                        </div>
                        <ChevronDown className={className} />
                    </Row>
                </BorderedButton>
                {
                    isListOpen && (
                        <MenuDropdownList
                            role="list"
                            className="dd_rec_list"
                        >
                            { props.children}
                        </MenuDropdownList>
                    )
                }
            </MenuButton >
        )
    }

    return render()
}

interface MenuDropdownItemProps {
    id?: any;
    ariaLabel?: string;
    onClick?: any;
    onClose?: any
    children?: any;
}

export function MenuDropdownItem(props: MenuDropdownItemProps) {
    return (
        <MenuItem
            aria-label={props.ariaLabel}
            id={props.id}
            className={`dd_rec_list_item `}
            onClick={props.onClick}
        >
            {props.children}
        </MenuItem>
    )
}