import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Pagination from "./Pagination";

const borderColor = "border-gray-200"
const cellSpacing = "px-4 py-3"

function TableRow(props) {
    const cellClassnames = classNames(
        "border-b text-gray-700", borderColor, cellSpacing,
    )

    const rowStyle = classNames(
        {"hover:bg-gray-100 cursor-pointer": props.clickable},
    )

    if (!props.row) {
        return null
    }

    function handleClick(e) {
        e.preventDefault()
        props.onClick(props.row)
    }

    return (
        <tr data-testid="common-table-row" className={rowStyle} onClick={handleClick}>{props.row.map((r, j) => <td
            key={j} className={cellClassnames}>{r}</td>)}</tr>
    )
}

TableRow.propTypes = {
    row: PropTypes.arrayOf(PropTypes.any),
    clickable: PropTypes.bool,
    onClick: PropTypes.func,
}

function Table(props) {
    const [startRange, setStartRange] = useState(0)
    const [endRange, setEndRange] = useState(0)

    const headerClassnames = classNames("border-b text-black", cellSpacing, borderColor)
    const tableClassnames = classNames(
        // "border-collapse border", borderColor, // border
        "w-full", // width
        "text-left", // text
        "bg-white",
        props.classNames,
    );

    function handleClick(e) {
        if (!props.clickable) return
        props.onClick(e)
    }

    function renderRows() {
        const rows = []
        for (let i = startRange; i < endRange + 1; i++) {
            rows.push(<TableRow key={i} row={props.rows[i]} onClick={handleClick} clickable={props.clickable}/>)
        }
        return rows
    }

    function updateRanges(e) {
        if (!props.pagination) {
            return
        }

        setStartRange(e[0])
        setEndRange(e[1])
    }

    useEffect(() => {
        if (props.pagination) {
            setEndRange(props.paginationGroupSize - 1)
        } else {
            setEndRange(props.rows.length)
        }
    }, [props.rows, props.pagination, props.paginationGroupSize])

    return (
        <div data-testid="common-table">
            <div className="">
                <table className={tableClassnames}>
                    <thead>
                    <tr>
                        {props.headings.map((h, i) => {
                            return (
                                <th key={i} className={headerClassnames} id={h}>
                                    {h}
                                </th>
                            );
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {renderRows().map(r => r)}
                    </tbody>
                </table>
                {(props.rows.length === 0) &&
                    <div
                        className="rounded mt-5  bg-gray-50 text-center text-gray-500 py-10">{props.emptyStatePlaceholder}</div>
                }
            </div>
            {props.pagination &&
                <div className="mt-5 flex justify-center">
                    <Pagination itemCount={props.rows.length} groupSize={props.paginationGroupSize}
                                onChange={updateRanges}/>
                </div>
            }
        </div>

    );
}

Table.propTypes = {
    headings: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.array,
    emptyStatePlaceholder: PropTypes.string,
    pagination: PropTypes.bool,
    paginationGroupSize: PropTypes.number,
    clickable: PropTypes.bool,
    onClick: PropTypes.func,
    classNames: PropTypes.string,
};

Table.defaultProps = {
    rows: [],
    emptyStatePlaceholder: "No data.",
    pagination: false,
    paginationGroupSize: 5,
    clickable: false,
}

export default Table;
