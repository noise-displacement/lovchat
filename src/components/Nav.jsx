import {Link} from "react-router-dom";

function Nav() {
    return(
        <nav className="p-6 flex justify-between items-center sticky top-0">
            <div className="flex h-[75%]">
                <Link className="flex" to="/">
                    <img src="/lovchatlogo.svg" />
                </Link>
            </div>
            
            <div>
                <Link className="px-4 text-light-red" to={"/chat"}>Chat</Link>
                <Link className="px-4 text-light-red" to={"/faq"}>Andre lurer på</Link>
                <Link className="px-4 text-light-red" to={"/om"}>Om</Link>
                <Link className="px-4 text-light-red" to={"/minside"}>Min side</Link>
            </div>
        </nav>
    )
}

export default Nav;