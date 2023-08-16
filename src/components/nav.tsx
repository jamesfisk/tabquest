import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
    return (
        <nav className="bg-opacity-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center">
                    <Link href="/" className='cursor-pointer'>
                        <Image 
                            src="/quill.png" 
                            width={24}
                            height={24}
                            className="" 
                            alt="TabQuest Logo" />
                    </Link>
                    <div className="lh-narrow self-center text-2xl font-semibold pl-2 whitespace-nowrap dark:text-white">
                        <div className='tiny-buffer'>Random</div> 
                        <div>Encounters</div>
                    </div>
                </div>
                <ul className="font-medium text-lg flex flex-col rounded-lg md:flex-row md:space-x-8">
                    <li>
                    <Link href="/info" className="block py-2 pl-3 pr-4 " aria-current="page">
                        ℹ️
                    </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}