import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"

function Form(props) {
    const formRef = useRef(null)

    function isValid() {
        if (!formRef || !formRef.current) return false;
        for (let i = 0; i < formRef.current.length; i++) {
            const node = formRef.current[i]
            if (node.required && (node.value === undefined || node.value === null || node.value === "")) {
                return false
            }
        }

        return true
    }

    useEffect(() => {
        props.onValid(isValid());
    })

    return (
        <form action="" ref={formRef} onSubmit={props.onSubmit} className={props.className}>
            {props.children}
        </form>
    )
}

Form.propTypes = {
    children: PropTypes.any,
    onSubmit: PropTypes.func,
    onValid: PropTypes.func,
    className: PropTypes.string,
}

Form.defaultProps = {
    onSubmit: () => {
    },
    onValid: () => {
    },
}

export default Form