import React, { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import PropTypes from "prop-types";
import classNames from "classnames";

function Autocomplete(props) {
    const [query, setQuery] = useState('')
    const [filtered, setFiltered] = useState(props.items)

    function handleQuery(e) {
        setQuery(e)
        props.onChange(e)
    }

    const style = classNames(
        "border-2 border-gray-300",
        "min-widht",
        "font-sans",
        "dark:text-slate-900 bg-white-50", // background
        "text-base", // text
        "py-2 px-4", //spacing
        "rounded", // border
        "transition ease-in-out", // effects
        "placeholder:text-gray-300",
        "outline outline-0",
    );

    useEffect(() => {
        if (query === "") {
            setFiltered(props.items)
            return
        }
        const f = props.items.filter((item) => {
            return item.toLowerCase().includes(query.toLowerCase())
        })
        setFiltered(f)
    }, [query])

    return (
        <div className="grid">
            <label className="text-sm text-slate-500 pb-1 text-left">{props.label}</label>
            <div className="relative">
                <Combobox value={query} onChange={handleQuery}>
                    <Combobox.Input
                        autoComplete="off"
                        className={style}
                        onChange={(e) => handleQuery(e.target.value)}
                    />
                    <Combobox.Options className="border border-gray-300 rounded absolute left-0 right-0">
                        {filtered.map((item) => (
                            <Combobox.Option
                                className={""}
                                key={item}
                                value={item}>
                                {({active, selected}) => {
                                    const itemStyle = classNames(
                                        "bg-white px-1 py-2 hover:bg-gray-100 cursor-pointer rounded",
                                        {"bg-gray-100": active}
                                    )
                                    return (
                                        <div className={itemStyle}>{item}</div>
                                    )
                                }}

                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Combobox>
            </div>
        </div>
    )
}

Autocomplete.propTypes = {
    items: PropTypes.array,
    label: PropTypes.string,
    onChange: PropTypes.func,
}

export default Autocomplete