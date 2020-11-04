import React from 'react'
import { RecButtonProps } from './model/RecButton';
import PropTypes, { InferProps } from 'prop-types'

export function RecButton({
    onClick,
    children,
    variant,
    className,
    label,
    size,
    disabledClassName,
    disabled,
}: InferProps<typeof RecButton.propTypes>) {
    const render = () => {
        return (
            <div>

            </div>
        )
    }

    return render();
}


RecButton.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    variant: PropTypes.oneOf(["basic", "outlined", "contained"]),
    className: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.string,
    disabledClassName: PropTypes.string,
    disabled: PropTypes.bool
}

RecButton.defaultProps = {
    className: "",
    label: "",
    size: "",
    variant: "basic",
    disabled: false,
    disabledClassName: ""
}