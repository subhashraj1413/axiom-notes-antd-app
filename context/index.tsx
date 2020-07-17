import { createContext } from "react";

export interface AppContext {
    notes: INotes[];
    currentNote: number;
    drawerOpen: boolean;
}

export interface INotes {
    id: number;
    tags: string[];
    title: string;
    content: string;
    createdAt: Date; 
    updatedAt: Date;
}

export const appContext = createContext<{ state: AppContext, setState: (AppContext) => void }>(undefined);
