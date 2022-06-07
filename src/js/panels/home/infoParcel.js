import React, {useEffect} from 'react';
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    Group, Header, SimpleCell, Div, Separator, Button, FormItem
} from "@vkontakte/vkui";
import {Icon28CubeBoxOutline} from '@vkontakte/icons';
import {useSelector} from "react-redux";

function InfoParcel({ router, snackbar, setSnackbar }) {
    const storage = useSelector((state) => state.main)

    useEffect(() => {
        setSnackbar(null)
    })

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
                    icon={<Icon28CubeBoxOutline width={56} height={56}/>}
                    header={'Посылка ' + storage.parcelTrack}
                    action={!storage.infoParcel.delivered &&
                        <Button
                            stretched
                            size='m'
                            onClick={() => router.toModal('addToFav')}
                        >
                            Добавить в избранное
                        </Button>
                    }
                >
                    Служба доставки: {storage.infoParcel.service === 1 ? 'Почта России' : 'СДЭК'}<br/>
                    Отправитель: {storage.infoParcel.sender !== null ? storage.infoParcel.sender : 'Неизвестно'}<br/>
                    Получатель: {storage.infoParcel.recipient}<br/>
                    Вес: {storage.infoParcel.weight !== null ? (storage.infoParcel.weight + ' г.') : 'Неизвестно'}
                </Placeholder>
            </Group>
                <Group header={
                    <Header mode='secondary'>
                        История перемещений
                    </Header>
                }>
                    {storage.infoParcel.history.length !== 0 &&
                        storage.infoParcel.history.map((el) => {
                            const date = new Date(
                                el.date
                            ).toLocaleString('ru', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });

                            return (
                                <>
                                    <Separator/>
                                    <Div style={{margin: -15}}>
                                        <FormItem bottom={date} top={el.description}>
                                            <SimpleCell disabled style={{margin: -15}}>
                                                {el.status}
                                            </SimpleCell>
                                        </FormItem>
                                    </Div>
                                    <Separator/>
                                </>
                            )
                        })
                    }
            </Group>
            {snackbar}
        </>
    )
}

export default withRouter(InfoParcel);