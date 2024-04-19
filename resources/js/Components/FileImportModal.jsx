import Overlay from '@/Components/Overlays/Overlay';
import OverlayCard from '@/Components/Overlays/OverlayCard';
import {PlusIcon} from '@heroicons/react/20/solid'
import {Fragment, useState} from 'react';
import {FaSpinner} from "react-icons/fa";
import { API } from '@/endpoints';

const modalName = 'FileImportModal';

export default function FileImportModal({open, setOpen, deps}) {
    console.log(deps)
    const [files, 
        setFiles] = useState([]);
    const [loading, 
        setLoading] = useState(false);

    /**
     * Handle closing modal
     */
    function handleClose() {
        setOpen(modalName);
    }

    /**
     * Handle file selection
     */
    function handleFileSelection(e) {
        setLoading(true);

        setFiles(e.target.files);

        setTimeout(() => {
            setLoading(false)
        }, 200);
    }

    /**
     * Submit Form
     */
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            let data = getFormData();

            const res = await axios.post(API.import[deps.importType], data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setTimeout(() => {
                setLoading(false)
            }, 300);
            // TODO: Handle success
        } catch (error) {
            // TODO: Handle error
             setTimeout(() => {
                setLoading(false)
            }, 300);
        }
    }

    function getFormData() {
        let data = new FormData();

        Array.from(files).forEach(file => {
            data.append('files[]', file);
        });

        return data;
    }

    return (
        <Overlay open={open} setOpen={handleClose}>
            <OverlayCard>
                <div className="text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                            vectorEffect="non-scaling-stroke"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    </svg>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No File Selected</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by uploading a CSV or XLSX</p>
                    <form onSubmit={handleSubmit} className="mt-6" encType='multipart/form-data'>
                        {files.length === 0
                            ? <Fragment>
                                    <label
                                        type="button"
                                        htmlFor="upload"
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
                                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/> 
                                        {loading
                                            ? <FaSpinner className='spin'/>
                                            : 'Select File'}
                                    </label>
                                    <input
                                        type="file"
                                        onChange={e => handleFileSelection(e)}
                                        id="upload"
                                        accept=".csv,.xlsx,.xls"
                                        className='hidden'
                                        multiple />
                                </Fragment>
                            : <button
                                type="submit"
                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
                                {loading
                                    ? <FaSpinner className='spin'/>
                                    : 'Import'}
                            </button>}
                    </form>
                </div>
            </OverlayCard>
        </Overlay>
    )
}