import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "../common/Modal";
import { getMarginCapitalForType } from "../../clients/marginClient";

function MarginKapitalModal(props) {
    const [items, setItems] = useState([])
    console.log(items)

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        getMarginCapitalForType().then(setItems)
    }

    return (
        <Modal id="margin-modal" title="Margine" onClose={props.onClose}>

        </Modal>
    )
}

MarginKapitalModal.propTypes = {
    type: PropTypes.string,
    onClose: PropTypes.func,
}

export default MarginKapitalModal