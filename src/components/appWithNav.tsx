import { View, currentViewState, settingsState } from "../store";
import Nav from "./nav"
import Quiz from "./quiz"
import Slab from "./slab"
import { useRecoilValue } from "recoil";
import About from "./about";
import Settings from "./settings";
import { getFont } from "@/app/utils";

export default function AppWithNav() {
    const viewState = useRecoilValue(currentViewState);
    const settings = useRecoilValue(settingsState);
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
        <div className={`${getFont(settings)} z-10 absolute w-full`}>
            <Nav/>
            <Slab>
                {renderBody()}
            </Slab>
        </div>
    )
}