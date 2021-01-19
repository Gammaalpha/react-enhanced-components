import styled from 'styled-components';
import { BaseButton } from './BaseButton';

export const BorderedButton = styled(BaseButton)`
 background-color:'gray';
    height:40px;
    min-width:40px;
    margin-right:3px;
    font-size: 1em;
    /* margin: 1em; */
    padding: 0.25em 0.25em;
    margin-bottom:3px;
    border-color:#E0E0E0;
    background-color:#E0E0E0;
    margin-right:5px;
    border: 2px solid lightgray;
    border-radius: 3px;
    &:hover{
        background-color:lightgray
    }
    &:focus{
        border:2px solid #151515;
        background-color:lightgray;
        outline:none
    }
`;

