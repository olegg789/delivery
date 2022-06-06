import React from 'react';
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
    PanelHeader,
    Group,
    Placeholder, Button
} from "@vkontakte/vkui";
import {Icon56NotificationOutline} from "@vkontakte/icons";

function Notify({ router, storage, acceptNotify }) {
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
                        >
                            Включить
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