import { Link } from "react-router-dom";

export default function ErrorNotFound () {
    return(
        <div>
            <h1>404 Error: Page not Found</h1>
            <Link className="bg-[#36bbbf] p-1" to="/">Back to Home</Link>
        </div>
    )
}