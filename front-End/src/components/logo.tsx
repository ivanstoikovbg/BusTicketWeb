import { Link } from "react-router-dom";
import logoSvg from '../assets/logo-systemx.svg'
import React from "react";

export const Logo = () => {
    return (
        <Link to="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <img src={logoSvg} alt="Logo" height={100} width={100} />
                <p className="text-lg text-neutral-700 pb-1 font-bold">SystemX</p>
            </div>
        </Link>
    );
};
