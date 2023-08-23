import Image from 'next/image';
import { currentViewState, View } from "@/store";
import { useRecoilState } from "recoil";

export default function About(){
    const [viewState, setCurrentViewState] = useRecoilState(currentViewState);

    return(
        <div className="h-full px-3 flex flex-col justify-between">
            <div className="text-lg">
                <div className="w-full flex flex-row justify-end text-xl cursor-pointer">
                    <div onClick={() => { setCurrentViewState({currentView: View.Quiz }) }}>X</div>
                </div>
                <p>Embark on an epic language-learning journey every time you open a new tab in your web browser! Enhance your vocabulary and conquer new linguistic realms while surfing the web.</p>
                <div className="pt-2">
                    <p>Features to come:</p>
                    <div className="pl-6">
                        <ul className="list-disc">
                            <li>More subjects</li>
                            <li>Customized question banks</li>
                            <li>Quester learning stats</li>
                            <li>Targeted subject review</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center"><p className="pr-1">Made with</p>
            <Image width={24} height={24} src={"/potion.png"} alt="Love Potion" className="pixel"/>
            <p className="pl-1">by <a href="https://github.com/jamesfisk" target="_blank" className="text-blue-300 cursor-pointer">james</a></p>
            </div>
        </div>
    );
}