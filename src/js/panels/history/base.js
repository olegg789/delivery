import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Button, Card, Div, Footer, FormItem, Group, PanelHeader, Placeholder} from "@vkontakte/vkui";
import {useDispatch} from "react-redux";
import {set} from "../../reducers/mainReducer";
import api from "../../../apiFunc";
import {Icon56CancelCircleOutline} from "@vkontakte/icons";

function History({router, storage}) {
    const dispatch = useDispatch()

    async function openHistoryInfo(el) {
        try {
            dispatch(set({key: 'historyInfo', value: el}))
            let res = await api(`history/${el.id}`, 'GET')
            if (res.response) {
                dispatch(set({key: 'historyInfoHistory', value: res.items}))
            }
            router.toPanel('historyParcel')
        }
        catch (err) {
            console.log(err)
        }
    }

    function declOfNum(number, words) {
        return words[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
            ];
    }

    return (
        <>
            <PanelHeader separator={false}>
                История
            </PanelHeader>
            <Group>
                {storage.history.length !== 0 ?
                <>
                {storage.history.map((el) => {
                    return (
                        <Div style={{margin: -5}}>
                            <Card onClick={() => openHistoryInfo(el)} className='history'>
                                <FormItem top='Имя посылки'>
                                    {el.name}
                                </FormItem>
                                <FormItem
                                    top='Трек-номер'
                                >
                                    {el.code}
                                </FormItem>
                            </Card>
                        </Div>
                        )

                })}
                <Footer>Всего {storage.history.length} {declOfNum(storage.history.length, ['посылка', 'посылки', 'посылок'])}</Footer>
                </> :
                    <Placeholder
                        icon={<Icon56CancelCircleOutline width={56} height={56}/>}
                        header='Кажется, здесь ещё ничего нет!'
                        action={
                            <Button
                                size='m'
                                stretched
                                onClick={() => router.toView('home')}
                            >
                                Найти посылку
                            </Button>
                        }
                        className={!storage.isDesktop && 'fav_placeholder'}
                    >
                        Получи посылку из избранного и она появится здесь!
                    </Placeholder>
                }
            </Group>
        </>
    )
}

export default withRouter(History)