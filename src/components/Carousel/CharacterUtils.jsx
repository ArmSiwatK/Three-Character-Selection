export function toggleLock(panel, lockedPanels, setLockedPanels) {
    setLockedPanels((prevLockedPanels) => ({
        ...prevLockedPanels,
        [panel]: !prevLockedPanels[panel],
    }));
}