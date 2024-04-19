import {useAlert} from "@/Context/AlertContext";
import {ExclamationTriangleIcon, XCircleIcon, CheckCircleIcon, InformationCircleIcon} from "@heroicons/react/20/solid";
import clsx from "clsx";
import FadeIn from "../Animations/FadeIn";

export default function Alert() {
    const {alertData, setAlertData} = useAlert();

    let statusColorClass;
    let Icon;
    let iconColor;
    let headlineColor;
    let messageColor;

    switch (true) {
        case alertData.status >= 200 && alertData.status < 300:
            Icon = CheckCircleIcon;
            statusColorClass = 'bg-green-50';
            iconColor = 'text-green-400';
            headlineColor = 'text-green-800';
            messageColor = 'text-green-700';
            break;
        case alertData.status >= 400 && alertData.status < 500:
            Icon = ExclamationTriangleIcon;
            statusColorClass = 'bg-yellow-50';
            iconColor = 'text-yellow-400';
            headlineColor = 'text-yellow-800';
            messageColor = 'text-yellow-700';
            break;
        case alertData.status >= 500:
            Icon = XCircleIcon;
            statusColorClass = 'bg-red-50';
            iconColor = 'text-red-400';
            headlineColor = 'text-red-800';
            messageColor = 'text-red-700';
            break;
        default:
            Icon = InformationCircleIcon;
            statusColorClass = 'bg-gray-50';
            iconColor = 'text-gray-400';
            headlineColor = 'text-gray-800';
            messageColor = 'text-gray-700';
            break;
    }

    return (
        <FadeIn show={alertData.open}>
            <div
                    className={clsx(`rounded-md ${statusColorClass} p-4 flex flex-row justify-between items-center`)}>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Icon className={clsx(`h-5 w-5 ${iconColor}`)} aria-hidden="true"/>
                        </div>
                        <div className="ml-3">
                            <h3 className={clsx(`text-sm font-medium ${headlineColor}`)}>{alertData.headline}</h3>
                            <div className={clsx(`mt-2 text-sm ${alertData.messageColor}`)}>
                                {alertData.message}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setAlertData({
                        ...alertData,
                        open: false
                    })}>
                        <XCircleIcon className={clsx(`h-5 w-5 ${alertData.headlineColor}`)}/>
                    </button>
                </div>
        </FadeIn>
                
    );
}