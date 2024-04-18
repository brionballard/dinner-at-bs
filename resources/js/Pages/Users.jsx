import LengthAwarePaginationTable from '@/Components/LengthAwarePaginationTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useState} from 'react';

import FileImportModal from '@/Components/FileImportModal';

/**
 * Users page depends on a LengthAwarePaginator instance of users & an authenticated user
 * @param auth
 * @param {LengthAwarePaginator} - https://laravel.com/docs/11.x/pagination
 */
export default function Users({auth, users}) {
    const [modals, setModals] = useState([
        {
            name: 'FileImportModal',
            Modal: FileImportModal,
            show: false,
            deps: {}
        }
    ]);

    function handleUserEdit(id) {
        console.log(id)
    }

    function setModalVisibility (name) {
        const updatedModals = modals.map(modal => {
            if (modal.name === name) {
                modal.show = !modal.show
            }

            return modal
        });

        setModals(updatedModals);
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users"/>
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                                    <p className="mt-2 text-sm text-gray-700">
                                        A list of all the users in your account including their name, title, email and
                                        role.
                                    </p>
                                </div>
                                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex sm:flex-row gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setModalVisibility('FileImportModal')}
                                        className="block rounded-md bg-transparent border-green-600 border-2 px-3 py-2 text-center text-sm font-semibold text-green-600 shadow-sm hover:bg-green-500/20 duration-150">
                                        Import +
                                    </button>
                                    <button
                                        type="button"
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Add user
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8 flow-root">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <LengthAwarePaginationTable
                                            data={users}
                                            hide={['id', 'email_verified_at', 'created_at', 'updated_at']}
                                            editable={true}
                                            editFn={handleUserEdit}
                                            editProp='id'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modals.map(({ name, Modal, show, deps}) => {
                if (!show) return;

                return (
                    <Modal key={name} open={show} setOpen={setModalVisibility} {...deps}/>
                )
            })}
        </AuthenticatedLayout>
    )
}
