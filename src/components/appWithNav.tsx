import { View, currentViewState, settingsState } from "../store";
import Nav from "./nav"
import Quiz from "./quiz"
import Slab from "./slab"
import { useRecoilValue } from "recoil";
import About from "./about";
import Settings from "./settings";
import { getFont } from "@/app/utils";
import { Lato, VT323 } from "next/font/google";

const vt323 = VT323({
    weight: '400',
    subsets: ['latin']
});
const lato = Lato({
    weight: '400',
    subsets: ['latin']
});

export default function AppWithNav() {
    const viewState = useRecoilValue(currentViewState);
    const settings = useRecoilValue(settingsState);
    const latoClass = lato.className;
    const pixelClass = vt323.className
    const fontClass = settings.usePixelFont
    ? pixelClass
    : latoClass;
    const renderBody = () => {
        switch(viewState.currentView) {
            case (View.Quiz):
                return <Quiz/>
            case (View.About):
                return <About/>
            case (View.Settings):
                return <Settings/>
        }
    }

    return (
        <div className={`${fontClass} z-10 absolute w-full`}>
            <Nav/>
            <Slab>
                {renderBody()}
            </Slab>
        </div>
    )
}