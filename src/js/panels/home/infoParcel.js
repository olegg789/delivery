import React from 'react';
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    Group, Header, SimpleCell, Div, Separator, Button, FormItem
} from "@vkontakte/vkui";
import { Icon56PlaceOutline} from '@vkontakte/icons';
import {useSelector} from "react-redux";

function InfoParcel({ router, snackbar }) {
    const storage = useSelector((state) => state.main)

    console.log(storage.infoParcel)

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
                    icon={<Icon56PlaceOutline/>}
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
                    Отправитель: {storage.infoParcel.sender !== null ? storage.infoParcel.sender : 'Неизвестно'} <br/>
                    Получатель: {storage.infoParcel.recipient} <br/>
                    Вес: {storage.infoParcel.weight !== null ? storage.infoParcel.weight : 'Неизвестно'}
                </Placeholder>
            </Group>
                <Group header={<Header mode='secondary'>История перемещений ({storage.infoParcel.history.length})</Header> } separator={"hide"}>
                    {storage.infoParcel.history.length !== 0 &&
                        storage.infoParcel.history.map((el) => {
                            const date = new Date(
                                el.date.split('-')[0],
                                Number(el.date.split('-')[1]) - 1,
                                el.date.split('-')[2]
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