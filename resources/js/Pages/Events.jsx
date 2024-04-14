import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Events({auth}) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Events" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Events</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
