import React from 'react';
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    Group, Header, SimpleCell, Div, Separator, Button
} from "@vkontakte/vkui";
import {Icon28LocationOutline} from '@vkontakte/icons';
import {useSelector} from "react-redux";

function InfoParcel({ router }) {
    const storage = useSelector((state) => state.main)

    const services = [
        'СДЭК',
        'Почта России'
    ]

    return(
        <>
            <PanelHeader 
                separator={false}
                left={<PanelHeaderBack onClick={() => router.toBack()}/>}
            >
                Информация
            </PanelHeader>

            <Group>
                <Placeholder
                    icon={<Icon28LocationOutline width={56} height={56}/>}
                    header={'Посылка ' + storage.parcelTrack}
                    action={
                        <Button
                            stretched
                            size='m'
                            onClick={() => router.toModal('addToFav')}
                        >
                            Добавить в избранное
                        </Button>
                    }
                >
                    Служба доставки: {services[storage.service]} <br/>
                    Отправитель: ООО "В Контакте" <br/>
                    Получатель: Клава Кока
                </Placeholder>
                <Group header={<Header mode='secondary'>История перемещений</Header> }>
                    <Separator/>
                    <Div style={{margin: -15}}>
                        <SimpleCell disabled after='1 день назад'>
                            Покинуло склад
                        </SimpleCell>
                    </Div>
                    <Separator/>
                    <Div style={{margin: -15}}>
                        <SimpleCell disabled after='2 дня назад'>
                            Принято службой доставки
                        </SimpleCell>
                    </Div>
                    <Separator/>
                </Group>
            </Group>
        </>
    )
}

export default withRouter(InfoParcel);