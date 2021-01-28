import styled from 'styled-components';

export const BaseButton = styled.button`
    background-color:'gray';
    background-position: center;
    transition: background 0.6s;
    height:40px;
    min-width:40px;
    margin-right:3px;
    font-size: 1em;
    padding: 0.25em 0.25em;
    margin-bottom:3px;
    border-color:#E0E0E0;
    background-color:#E0E0E0;
    margin-right:5px;
    border-radius: 3px;
    &:hover{
        background: #bbbbbb radial-gradient(circle, transparent 1%, #bbbbbb 1%)
    center/15000%;
    }
    &:active {
        background-color: #bbbbbb;
        background-size: 100%;
        transition: background 0s;
    }
    &:focus{
        background-color:lightgray;
    }
`;

