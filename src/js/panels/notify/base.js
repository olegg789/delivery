import React, {useEffect} from 'react';
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
    PanelHeader,
    Group,
    Placeholder, Button
} from "@vkontakte/vkui";
import {Icon56NotificationOutline} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

let notifications = false

function Notify({ router, storage, acceptNotify }) {

    async function check() {
        let res = await bridge.send("VKWebAppGetLaunchParams")
        if (res.vk_are_notifications_enabled === 1) {
            notifications = true
        }
    }

    useEffect(() => {
        check()
    }, [])

    return (
        <>
            <PanelHeader separator={false}>
                Уведомления
            </PanelHeader>
            <Group>
                <Placeholder
                    icon={<Icon56NotificationOutline width={56} height={56}/>}
                    header='Включи уведомления!'
                    action={
                        <Button
                            size='m'
                            stretched
                            onClick={() => acceptNotify()}
                            disabled={notifications}
                        >
                            {!notifications ? 'Включить' : 'У тебя уже включены уведомления'}
                        </Button>
                    }
                    className={!storage.isDesktop && 'fav_placeholder'}
                >
                    С помощью этого мы сможем оперативно уведомлять тебя об обновлениях статуса твоей посылки
                </Placeholder>

            </Group>
        </>
    )
}

export default withRouter(Notify);