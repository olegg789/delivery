import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Button, Card, ModalCard} from "@vkontakte/vkui";
import {Icon56NotificationOutline} from "@vkontakte/icons";

function OnNotifications({nav, router, acceptNotify, loadNotify}) {
    return (
        <ModalCard
            nav={nav}
            header='Включи уведомления!'
            icon={<Icon56NotificationOutline/>}
            actions={
                <Button
                    size='l'
                    stretched
                    onClick={() => {acceptNotify(); router.toModal()}}
                    loading={loadNotify}
                    hasActive={false}
                >
                    Включить
                </Button>
                }
        >
            <Card className='card_not'>
                С помощью этого мы сможем оперативно уведомлять тебя об обновлениях статуса твоей посылки
            </Card>
        </ModalCard>
    )
}

export default withRouter(OnNotifications)