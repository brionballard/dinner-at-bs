import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react'

/**
 * The Table component dynamically renders a table based on data provided through a SSRendered LengthAwarePaginator
 * @property {LengthAwarePaginator} data - https://laravel.com/docs/11.x/pagination
 * @property {string[] | undefined} hide - Property names you wish to exclude from the table
 * @property {Boolean | false} editable - If true, will add an edit button to the rows
 * @property {string | undefined} editProp - An identifying property such as 'id'
 * @property {Function | undefined} editFn - The parent function to handle returning the editProp
 * 
 * TODO: Select per page
 */
export default function LengthAwarePaginationTable({
    data,
    hide = undefined,
    editable = false,
    editProp = undefined,
    editFn = undefined
}) {
    const [headers,
        setHeaders] = useState([]);
    const [currentItems,
        setCurrentItems] = useState(data.data);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    useEffect(() => {
        collectHeaders(data.data[0]);

    }, []);

    if (hide && !Array.isArray(hide)) 
        throw new Error(`The hide prop must be an array. Received: ${typeof hide}`);
    
    function collectHeaders(item) {
        setHeaders(Object.keys(item))
    }

    return (
        <Fragment>
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        {headers.map(header => {
                            if (hide && hide.includes(header)) 
                                return;
                            
                            return (
                                <th
                                    key={header}
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 capitalize">
                                    {header}
                                </th>
                            )
                        })}
                        {editable && headers.includes('id')
                            ? <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                            : null}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {currentItems.map((item) => (
                        <tr key={Math.random()}>
                            {headers.map(header => {
                                if (hide && hide.includes(header)) 
                                    return;
                                
                                return (
                                    <td
                                        key={Math.random()}
                                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {item[header]}
                                    </td>
                                )
                            })}

                            {editable && editProp
                                ? <td
                                        className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <button
                                            type="button"
                                            onClick={() => editFn
                                            ? editFn(item[editProp])
                                            : null}
                                            className="text-indigo-600 hover:text-indigo-900">
                                            Edit
                                        </button>
                                    </td>
                                : null}
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav
                className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white py-3"
                aria-label="Pagination">
                <div className="hidden sm:block">
                    <p className="text-xs text-gray-700">
                        Showing{' '}
                        <span className="font-medium">{data.from}{' '}</span>
                        to{' '}
                        <span className="font-medium">{data.to}{' '}</span>
                        of{' '}
                        <span className="font-medium">{data.total}{' '}</span>
                        results
                    </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end gap-2">
                    <a
                        href={data.current_page > 1 ? data.links[data.current_page - 1].url : data.links[0].url}
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                        Previous
                    </a>
                    <a
                        href={data.current_page < data.links.length - 2 ? data.links[data.current_page + 1].url : data.links[data.links.length - 1].url}
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                        Next
                    </a>
                </div>
            </nav>
        </Fragment>
    )
}
