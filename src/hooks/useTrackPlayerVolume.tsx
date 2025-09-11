import { useCallback, useEffect, useState } from "react";
import TrackPlayer from "react-native-track-player";

export const useTrackPlayerVolume = () => {
    const [volume, setVolume] = useState<number | undefined>(undefined); // Set initial volume to 5%>;

    const getVolume = useCallback(async () => {
        const currentVolume = await TrackPlayer.getVolume();
        setVolume(currentVolume);
    }, []);

    const updateVolume = useCallback(async (newVolume: number) => {
        if (newVolume < 0 || newVolume > 1) return;

        setVolume(newVolume);

        await TrackPlayer.setVolume(newVolume);
    }, []);

    useEffect(() => {
        getVolume();
    }, [getVolume]);

    return {volume, updateVolume};
}