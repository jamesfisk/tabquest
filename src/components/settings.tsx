import { Subject, View, currentViewState, settingsState } from "../store";
import { useRecoilState } from "recoil";

export default function Settings() {
    const [viewState, setCurrentViewState] = useRecoilState(currentViewState);
    const [settings, setSettings] = useRecoilState(settingsState);
    const setUsePixelFonts = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prev) => {
            return {
                ...prev,
                usePixelFont: e.target.checked
            }
        });
    }
    const toggleVocab = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prev) => {
            let newSubjs = [];
            if (e.target.checked) {
                newSubjs = [...prev.subjects, Subject.Vocabulary];
            }
            else {
                newSubjs = [Subject.Math]
            }
            return {
                ...prev,
                subjects: newSubjs
            }
        });
    }
    const toggleMath = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prev) => {
            let newSubjs = [];
            if (e.target.checked) {
                newSubjs = [...prev.subjects, Subject.Math];
            }
            else {
                newSubjs = [Subject.Vocabulary]
            }
            return {
                ...prev,
                subjects: newSubjs
            }
        });
    }
    return(
        <div className="h-full px-3 flex flex-col justify-center">
            <div className="w-full flex flex-row justify-end text-xl cursor-pointer">
                <div onClick={() => { setCurrentViewState({currentView: View.Quiz }) }}>X</div>
            </div>
            <div id="controls">
                <div>Display:</div>
                <div className="flex items-center mb-4">
                    <input id="pixel-checkbox" type="checkbox" checked={settings.usePixelFont} onChange={setUsePixelFonts} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-checkbox" className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Use pixel fonts</label>
                </div>
                <div>Subjects:</div>
                <div className="flex items-center mb-4">
                    <input id="vocab-checkbox" type="checkbox" checked={settings.subjects.includes(Subject.Vocabulary)} onChange={toggleVocab} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-checkbox" className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Vocabulary</label>
                </div>
                <div className="flex items-center mb-4">
                    <input id="math-checkbox" type="checkbox" checked={settings.subjects.includes(Subject.Math)} onChange={toggleMath} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-checkbox" className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Math</label>
                </div>
            </div>
        </div>
    );
}