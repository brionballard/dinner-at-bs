import { Menu } from "@headlessui/react";
import axios from "axios";

export default function LogoutButton () {

    /**
     * Make a POST request to logout endpoint and
     * simulate a redirect to login page.
     */
    async function logout () {
        try {
            await axios.post(route('logout'));

            window.location.href = route('login');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Menu.Item>
            <button
                type="button"
                onClick={() => logout()}
                className={'block px-3 py-1 text-sm leading-6 text-zinc-900'}>
                Sign Out
            </button>
        </Menu.Item>
    )
}