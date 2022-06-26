import React from 'react'
import PropTypes from "prop-types";
import classNames from 'classnames';
import Button from './Button'
import ExitButton from './ExitButton';

function Modal(props) {
    const wrapperStyle = classNames(
        "fixed top-0 right-0 left-0 z-50 flex justify-center pt-8", // position
        "w-full h-full",
        "overflow-y-auto overflow-x-hidden", // overflow
        "bg-black/25",
        {"hidden": !props.visible},
    )

    const modalStyle = classNames(
        "w-full max-w-2xl h-full",
        "drop-shadow-2xl",
        props.className,
    )

    function renderHeader() {
        return (
            <div className="py-4 px-6 flex justify-between items-middle border-b bd-gray-300">
                <h3 className="text-2xl font-semibold text-gray-900 lg:text-2xl">
                    {props.title}
                </h3>
                <ExitButton onClick={props.onClose}/>
            </div>
        )
    }

    return (
        <div data-testid="common-modal" id={props.id} tabIndex="-1" className={wrapperStyle}>
            <div className={modalStyle}>
                <div className="relative bg-white shadow rounded">
                    {renderHeader()}
                    <div className='p-6'>
                        {props.children}
                        {props.cta &&
                            <div className="flex justify-end mt-5">
                                <Button label={props.ctaText} onClick={props.cta}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    visible: PropTypes.bool,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    cta: PropTypes.func,
    ctaText: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
}

Modal.defaultProps = {
    visible: true,
    ctaText: "Click",
}

export default Modal