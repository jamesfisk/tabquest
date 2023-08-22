import { settingsState } from "../store";
import { useRecoilState } from "recoil";

export default function Settings() {
    const [settings, setSettings] = useRecoilState(settingsState);
    const setUsePixelFonts = (e: React.ChangeEvent<HTMLInputElement>) => {
        const usePixel = e.target.value === 'true';
        setSettings((prev) => {
            return {
                ...prev,
                usePixelFont: usePixel
            }
        });
    }
    return(
        <div className="h-full px-3 flex flex-col justify-center">
            <div id="controls">
                <div className="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value={`${settings.usePixelFont}`} onChange={setUsePixelFonts} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-checkbox" className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Use pixel fonts</label>
                </div>
                <div className="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-checkbox" className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Math</label>
                </div>
            </div>
        </div>
    );
}