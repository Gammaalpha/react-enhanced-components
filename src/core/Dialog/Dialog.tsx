import React, { useEffect, useState } from 'react'
import "./dialog.css"


interface DialogProps {
    open: boolean;
}

export function Dialog(props: DialogProps) {

    const [openState, setOpenState] = useState(props.open);
    
    const toggleOpenState = () => {
        setOpenState(!openState)
    }

    const render = () => {
        return (
            <div>

            </div>
        )
    }

    return render();
}