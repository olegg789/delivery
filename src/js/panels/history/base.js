import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Card, Div, Footer, FormItem, Group, PanelHeader} from "@vkontakte/vkui";
import {useDispatch} from "react-redux";
import {set} from "../../reducers/mainReducer";
import api from "../../../apiFunc";

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
                История {storage.history.length !== 0 && `(${storage.history.length})`}
            </PanelHeader>
            <Group>
                <>
                {storage.history.map((el) => {
                    return (
                        <Div style={{margin: -10}}>
                            <Card onClick={() => openHistoryInfo(el)}>
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
                </>
            </Group>
        </>
    )
}

export default withRouter(History)