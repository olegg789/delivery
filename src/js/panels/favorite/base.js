import React, {useRef} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    ActionSheet,
    ActionSheetItem, Alert, Button,
    Card,
    Div,
    Footer,
    FormItem,
    Group,
    Link,
    PanelHeader, Placeholder
} from "@vkontakte/vkui";
import {
    Icon56CancelCircleOutline,
    Icon28CheckCircleOutline,
    Icon28CopyOutline,
    Icon28DeleteOutline, Icon28LocationOutline,
    Icon28MoreHorizontal
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import api from "../../../apiFunc";
import {set} from "../../reducers/mainReducer";
import {useDispatch} from "react-redux";

function Favorite({ router, storage, getFavorites, openSnackbar }) {

    const dispatch = useDispatch()
    const TargetRef = useRef()

    function declOfNum(number, words) {
        return words[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
            ];
    }

    function openAlert(id) {
        router.toPopout(
            <Alert
                actions={[{
                    title: 'Нет',
                    autoclose: true,
                    mode: 'cancel',
                }, {
                    title: 'Да',
                    autoclose: true,
                    mode: 'destructive',
                    action: () => deleteFromFav(id)
                }]}
                onClose={() => router.toPopout()}
                header='Подтверждение'
                text='Вы точно хотите удалить эту посылку?'
            />
        )
    }

    async function deleteFromFav(code) {
        try {
            let res = await api(`favorites/${Number(code)}`, 'DELETE')
            if (res.response) {
                getFavorites()
                openSnackbar('Посылка удалена!', <Icon28CheckCircleOutline className='snack_suc'/>)
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    async function openHistory(code) {
        try {
            let res = await api(`favorites/${Number(code)}`, 'GET')
            if (res.response) {
                dispatch(set(({key: 'historyFav', value: res.items})))
                router.toModal('historyFav')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    function openActionSheet(ref, code, id) {
        router.toPopout(
            <ActionSheet
                onClose={() => router.toPopout()}
                iosCloseItem={
                    <ActionSheetItem autoclose mode="cancel">
                        Отменить
                    </ActionSheetItem>
                }
                toggleRef={ref}
            >
                <ActionSheetItem
                    autoclose
                    before={<Icon28LocationOutline/>}
                    onClick={() => openHistory(id)}
                >
                    Открыть историю перемещений
                </ActionSheetItem>

                <ActionSheetItem
                    before={<Icon28CopyOutline/>}
                    autoclose
                    onClick={() => {
                        bridge.send("VKWebAppCopyText", {text: code})
                        openSnackbar('Трек-номер скопирован!', <Icon28CheckCircleOutline className='snack_suc'/>)
                    }}
                >
                    Скопировать трек
                </ActionSheetItem>

                <ActionSheetItem
                    mode='destructive'
                    before={<Icon28DeleteOutline/>}
                    autoclose
                    onClick={() => openAlert(id)}
                >
                    Удалить посылку
                </ActionSheetItem>
            </ActionSheet>

        )
    }

    return (
        <>
            <PanelHeader separator={false}>
                Избранное {storage.favorites.length !== 0 && `(${storage.favorites.length})`}
            </PanelHeader>
            <Group>
                {storage.favorites.length !== 0 ?
                    <>
                        {storage.favorites.map((el) => {
                            return(
                                <Div>
                                    <Card>
                                        <FormItem top='Имя посылки'>
                                            {el.name}
                                        </FormItem>
                                        <Link
                                            className='actionsParcel'
                                            getRootRef={TargetRef}
                                            onClick={(e) => {
                                                openActionSheet(
                                                    e.currentTarget,
                                                    el.code,
                                                    el.id
                                                )
                                            }}
                                        >
                                            <Icon28MoreHorizontal/>
                                        </Link>
                                        <FormItem
                                            top='Трек-номер'
                                        >
                                            {el.code}
                                        </FormItem>
                                    </Card>
                                </Div>
                            )
                        })}
                        <Footer>Всего {storage.favorites.length} {declOfNum(storage.favorites.length, ['посылка', 'посылки', 'посылок'])}</Footer>
                    </>:
                    <Placeholder
                        icon={<Icon56CancelCircleOutline width={56} height={56}/>}
                        header='Упс...'
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
                        У вас ещё нет сохранённых посылок!
                    </Placeholder>

                }
                </Group>
        </>
    )
}

export default withRouter(Favorite)