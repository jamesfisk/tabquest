import { AtomEffect, RecoilState, atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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

const { persistAtom } = recoilPersist({ key: 're-persist-settings' });

export const settingsState = atom({
  key: "settings",
  default: {
    usePixelFont: true,
    subjects: [Subject.Vocabulary]
  } as Settings,
  effects_UNSTABLE: [persistAtom],
}) as RecoilState<Settings>;

export const currentViewState = atom({
    key: "currentView",
    default: {
      currentView: View.Quiz
    } as ViewState,
  });