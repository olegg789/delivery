import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Card, Div, FormItem, FormLayoutGroup, Group, PanelHeader, PanelHeaderBack, Placeholder,} from "@vkontakte/vkui";
import {Icon28ServicesOutline} from "@vkontakte/icons";

function About({router}) {
    return (
        <>
            <PanelHeader left={
                <PanelHeaderBack onClick={() => router.toBack()}/>
            }>
                О сервисе
            </PanelHeader>
            <Group>
                <Placeholder
                    icon={<Icon28ServicesOutline width={56} height={56}/>}
                    header='О сервисе'
                >
                    Это приложение для отслеживания почтовых отправлений из <b>СДЭК</b> или <b>Почты России</b>
                </Placeholder>
                <FormLayoutGroup>
                    <FormItem top='Поиск'>
                        <Card>
                            <Div>
                                На этой панели ты можешь отследить свою посылку. Достаточно лишь вписать её трек-номер в поле ввода<br/>
                                После этого откроется панель, на которой ты сможешь увидеть отправителя, получателя, вес и историю перемещения посылки
                            </Div>
                        </Card>
                    </FormItem>
                    <FormItem top='Уведомления'>
                        <Card>
                            <Div>
                                Здесь ты можешь включить уведомления от сервиса, чтобы мы уведомляли тебя если у твоей посылки появился новый статус
                            </Div>
                        </Card>
                    </FormItem>
                    <FormItem top='Избранное'>
                        <Card>
                            <Div>
                                Тут собрались посылки, которые ты сохранил при поиске<br/>
                                Ты можешь скопировать трек-номер посылки, посмотреть её историю перемещений или удалить посылку из избранного, если она больше не нужна
                            </Div>
                        </Card>
                    </FormItem>
                    <FormItem top='История'>
                        <Card>
                            <Div>
                                Посылки, которые ты удалил из избранных<br/>
                                Ты можешь открыть полную информацию о посылке, нажав на неё
                            </Div>
                        </Card>
                    </FormItem>
                </FormLayoutGroup>
            </Group>
        </>
    )
}

export default withRouter(About)