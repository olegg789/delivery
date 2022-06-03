import React from 'react';
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
    PanelHeader,
    Group, Placeholder, FormLayoutGroup, FormItem, SimpleCell, Card, Div
} from "@vkontakte/vkui";
import {Icon28Notifications, Icon28PaperplaneOutline} from "@vkontakte/icons";

function Notify({ router }) {
    return (
        <>
            <PanelHeader separator={false}>
                Уведомления
            </PanelHeader>
            <Group>
                <FormLayoutGroup>
                    <Div>
                        <Card>
                            <FormItem top='Посылка 23527592384' bottom='5 минут назад'>
                                <SimpleCell disabled before={<Icon28PaperplaneOutline/>}>
                                    Покинуло сортировочный центр
                                </SimpleCell>
                            </FormItem>
                        </Card>
                    </Div>

                    <Div>
                        <Card>
                            <FormItem top='Посылка Надувной бассейн' bottom='Вчера'>
                                <SimpleCell
                                    disabled
                                    before={<Icon28PaperplaneOutline/>}
                                >
                                    Прибыло в место вручения
                                </SimpleCell>
                            </FormItem>
                        </Card>
                    </Div>
                </FormLayoutGroup>
            </Group>
        </>
    )
}

export default withRouter(Notify);