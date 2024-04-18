import {Dialog, Transition} from "@headlessui/react";
import { Fragment } from "react";

/**
 * Default card insert for overlays. Handles off click events to close overlay with headlessui
 * @prop children
 */
export default function OverlayCard({children}) {
    return (
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                {children}
            </Dialog.Panel>
        </Transition.Child>
    )
}