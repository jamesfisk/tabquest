import { atom, selector } from "recoil";

export interface Settings {
  usePixelFont: boolean
}

export enum View {
    Quiz,
    About,
    Settings
}

export interface ViewState {
    currentView: View
}

export const settingsState = atom({
  key: "settings",
  default: {
    usePixelFont: true
  } as Settings,
});

export const currentViewState = atom({
    key: "currentView",
    default: {
      currentView: View.Quiz
    } as ViewState,
  });