import React from 'react'
import styled from 'styled-components';
import { fontStyle } from '../Styles/CommonStyles';


const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
    height:18px;
    width:18px;
`;

export function Checkbox(props: any) {
    const render = () => {
        return <StyledCheckbox {...props}>
        </StyledCheckbox>
    }

    return render()
}