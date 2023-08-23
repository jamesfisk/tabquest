import { atom } from "recoil";

export enum Subject {
  Vocabulary,
  Math
}

export interface Settings {
  usePixelFont: boolean,
  subjects: Subject[]
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
    usePixelFont: true,
    subjects: [Subject.Vocabulary]
  } as Settings,
});

export const currentViewState = atom({
    key: "currentView",
    default: {
      currentView: View.Quiz
    } as ViewState,
  });