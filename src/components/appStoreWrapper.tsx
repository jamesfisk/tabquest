'use client'
import { RecoilRoot } from "recoil";
import AppWithNav from "./appWithNav";

export default function AppStoreWrapper() {
    return (
        <RecoilRoot>
            <AppWithNav/>
        </RecoilRoot>
    )
}