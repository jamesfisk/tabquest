import Slab from "@/components/slab";
import Link from "next/link";
import Image from 'next/image';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'TabQuest Info',
  description: 'About TabQuest',
}

export default function Info(){
    return(
        <Slab>
            <div className="h-full flex flex-col justify-between">
                <div className="text-lg">
                    <div className="w-full flex flex-row justify-end text-xl">
                        <Link href="/tab">X</Link>
                    </div>
                    <p>Embark on an epic language-learning journey every time you open a new tab in your web browser! Enhance your vocabulary and conquer new linguistic realms while surfing the web.</p>
                    <div className="pt-2">
                        <p>Features to come:</p>
                        <div className="pl-6">
                            <ul className="list-disc">
                                <li>More subjects</li>
                                <li>Customized question banks</li>
                                <li>Quester learning stats</li>
                                <li>Smart learning algorithms</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center"><p className="pr-1">Made with</p>
                <Image width={24} height={24} src={"/potion.png"} alt="Love Potion" className="pixel"/>
                <p className="pl-1">by <a href="https://github.com/jamesfisk" target="_blank" className="text-blue-300 cursor-pointer">james</a></p>
                </div>
            </div>
        </Slab>
    );
}