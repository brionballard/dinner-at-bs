import { FaSpinner } from "react-icons/fa";

export default function Button({loading = false, text, type, autoFocus = false, onClick}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer" disabled={loading} autoFocus={autoFocus}>
            {loading
                ? <FaSpinner className='spin'/>
                : text}
        </button>
    )
}