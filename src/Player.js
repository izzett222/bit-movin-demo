import { useEffect, useRef, useState } from 'react';
import { UIFactory } from 'bitmovin-player/bitmovinplayer-ui';
import { Player } from 'bitmovin-player';
import 'bitmovin-player/bitmovinplayer-ui.css';

const BitPlayer = () => {
    const [player, setPlayer] = useState(null)
    const playerDiv = useRef()
    const setupPlayer = () => {
        const playerConfig = {
            key: process.env.REACT_APP_KEY
        };
        const playerSource = {
            dash: process.env.REACT_APP_VIDEO,
            drm: {
                widevine: {
                    LA_URL: process.env.REACT_APP_WIDEVINE
                }

            }
        };
        const player = new Player(playerDiv.current, playerConfig);
        UIFactory.buildDefaultUI(player);
        player.load(playerSource).then(() => {
            setPlayer(player)
            console.log('Successfully loaded source function');
        }, () => {
            console.log('Error while loading source function');
        });
    }

    const destroyPlayer = () => {
        if (player != null) {
            player.destroy();
            setPlayer(null)
            console.log("destroyed")
        }
    }
    useEffect(() => {
        setupPlayer()
        return () => destroyPlayer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return <div id='player' ref={playerDiv} />;
}

export default BitPlayer;