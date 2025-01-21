import create from 'zustand';

export const useStore = create((set) => ({
    projectTransition: false,
    setProjectTransition: (value) => set({ projectTransition: value }),
    clickedProject: null,
    setClickedProject: (value) => set({ clickedProject: value }),
    loaded: false,
    setLoaded: (value) => set({ loaded: value }),
    lowerCover: false,
    setLowerCover: (value) => set({ lowerCover: value }),
    about: false,
    setAbout: (value) => set({ about: value })
}));