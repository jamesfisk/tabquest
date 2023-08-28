import { Dropdown } from 'flowbite-react';
import { View, currentViewState } from '../store';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';

export default function Nav() {
    const [viewState, setCurrentViewState] = useRecoilState(currentViewState);

    const changeView = (newView: View) => {
        if (newView !== viewState.currentView) {
            setCurrentViewState({
                currentView: newView
            });
        }
    };

    return (
        <nav className="bg-opacity-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center">
                    <Link href="/tab" className='cursor-pointer'>
                        <Image 
                            src="/quill.png" 
                            width={24}
                            height={24}
                            className="" 
                            alt="Random Encounters Logo" />
                    </Link>
                    <div className="lh-narrow self-center text-2xl font-semibold pl-2 whitespace-nowrap dark:text-white">
                        <div className='tiny-buffer'>Random</div> 
                        <div>Encounters</div>
                    </div>
                </div>
                <ul className="font-medium text-lg flex flex-col rounded-lg md:flex-row md:space-x-8">
                    <li id='help-menu'>
                    <Dropdown
                    label="ℹ️"
                    className='block py-2 pl-3 pr-4'
                    >
                        <div onClick={() => { changeView(View.Settings)}} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</div>
                        <div onClick={() => { changeView(View.About)}} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">About</div>
                    </Dropdown>
                    {/* <button className="block py-2 pl-3 pr-4 " aria-current="page" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        ℹ️
                    </button>
                    <div className="z-50 hidden w-32 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <div onClick={() => { changeView(View.Settings)}} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</div>
                            </li>
                            <li>
                                <div onClick={() => { changeView(View.About)}} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">About</div>
                            </li>
                        </ul>
                    </div> */}
                    </li>
                </ul>
            </div>
        </nav>
    );
}