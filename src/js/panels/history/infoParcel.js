import React from 'react';
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    Group, Header, SimpleCell, Div, Separator, FormItem
} from "@vkontakte/vkui";
import {Icon28LocationOutline} from '@vkontakte/icons';
import {useSelector} from "react-redux";

function HistoryParcel({ router, snackbar }) {
    const storage = useSelector((state) => state.main)

    console.log(storage.historyInfo)
    console.log(storage.historyInfoHistory)

    const info = storage.historyInfo
    const history = storage.historyInfoHistory

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
                    header={'Посылка ' + info.name}
                >
                    Получатель: {info.recipient} <br/>
                    Вес: {info.weight !== null ? info.weight : 'Неизвестно'}
                </Placeholder>
                <Group
                    header={
                        <Header mode='secondary'>
                            История перемещений ({history.length})
                        </Header> }
                    separator={"hide"}
                >
                    {history.length !== 0 &&
                        history.map((el) => {
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
            </Group>
        </>
    )
}

export default withRouter(HistoryParcel);