import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { URLS } from "../routes";
import { useSelector } from "react-redux";
import { getUserSelector } from "../redux/selectors";
import { logoutAction } from "../clients/client";
import Logo from "./common/Logo";
import HoverMenu, { HoverMenuItem } from "./common/HoverMenu";

function HeaderItem(props) {
    const location = useLocation();

    const style = classNames("px-4 mx-1", "rounded", "hover:bg-indigo-700", {
        "!bg-indigo-900": location.pathname.includes(`/${props.path}`),
    });

    return (
        <Link className={style} to={`${props.path}`}>
            {props.text}
        </Link>
    );
}

HeaderItem.propTypes = {
    path: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

function Header() {
    const user = useSelector(getUserSelector);
    const [username, setUsername] = useState("Username");

    const style = classNames(
        "inset-x-0 top-0", //position
        "bg-indigo-500", // background
        "text-base leading-9 text-white font-semibold", // font
        "py-3" // spacing
    );

    useEffect(() => {
        if (user) setUsername(user["username"]);
    }, [user]);

    const userItem = (
        <div className="flex items-center">
            <div className="mr-3">{username}</div>
            <div className="bg-white rounded-full p-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="color-white"
                    viewBox="0 0 24 24"
                    stroke="color-indigo-500"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            </div>
        </div>
    );

    return (
        <div data-testid="component-header" className={style}>
            <div className="flex justify-between">
                <div className="flex">
                    <div className="pl-5 mr-2">
                        <Link to={`${URLS.DASHBOARD.STOCK}`}>
                            <Logo size={10}/>
                        </Link>
                    </div>
                    <HeaderItem path={URLS.DASHBOARD.STOCK} text="Berza"/>
                    <HeaderItem path={URLS.DASHBOARD.CAPITAL.INDEX} text="Kapital"/>
                    <HeaderItem path={URLS.DASHBOARD.TRADE} text="Trgovina"/>
                    <HeaderItem path={URLS.DASHBOARD.APPROVE_TRANSACTION} text="Porudžbine"/>
                    <HeaderItem path={URLS.DASHBOARD.COMPANY.LIST} text="Kompanije"/>
                    <HeaderItem path={URLS.DASHBOARD.AGREEMENT.LIST} text="Ugovori"/>
                    {user && (user["role"]["name"] == "ROLE_ADMIN" || user["role"]["name"] == "ROLE_GL_ADMIN") &&
                        <HeaderItem path={URLS.DASHBOARD.LIST.INDEX} text="Zaposleni"/>}
                </div>
                <HoverMenu className="mr-5" text={userItem}>
                    <HoverMenuItem text="Profile" to={`${URLS.DASHBOARD.INFORMATION}`}/>
                    <HoverMenuItem
                        text="Logout"
                        to={`${URLS.DASHBOARD.INDEX}`}
                        onClick={() => logoutAction()}
                    />
                </HoverMenu>
            </div>
        </div>
    );
}

export default Header;
