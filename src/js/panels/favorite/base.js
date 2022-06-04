import React, {useRef} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    ActionSheet,
    ActionSheetItem,
    Card,
    Div,
    Footer,
    FormItem,
    Group,
    Link,
    PanelHeader
} from "@vkontakte/vkui";
import {Icon28CopyOutline, Icon28DeleteOutline, Icon28EditOutline, Icon28MoreHorizontal} from "@vkontakte/icons";

function Favorite({ router }) {

    const TargetRef = useRef()

    function openActionSheet(ref) {
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
                    before={<Icon28CopyOutline/>}
                    autoclose
                >
                    Скопировать трек
                </ActionSheetItem>
                <ActionSheetItem
                    before={<Icon28EditOutline/>}
                    autoclose
                >
                    Изменить имя посылки
                </ActionSheetItem>
                <ActionSheetItem
                    mode='destructive'
                    before={<Icon28DeleteOutline/>}
                    autoclose
                >
                    Удалить посылку
                </ActionSheetItem>
            </ActionSheet>

        )
    }

    return (
        <>
            <PanelHeader separator={false}>
                Избранное
            </PanelHeader>
            <Group>
                <Div>
                    <Card>
                        <FormItem top='Посылка из почты России'>
                            Надувной бассейн
                        </FormItem>
                        <Link
                            className='actionsParcel'
                            getRootRef={TargetRef}
                            onClick={(e) => {
                                openActionSheet(e.currentTarget)
                            }}
                        >
                            <Icon28MoreHorizontal/>
                        </Link>
                        <FormItem
                            top='Трек-номер'
                        >
                            48274826539473
                        </FormItem>
                    </Card>
                </Div>

                <Div>
                    <Card mode='outline' style={{marginTop: -15}}>
                        <FormItem top='Посылка из СДЭК'>
                            Перчатки и варежки
                        </FormItem>
                        <Link
                            className='actionsParcel'
                            getRootRef={TargetRef}
                            onClick={(e) => {
                                openActionSheet(e.currentTarget)
                            }}
                        >
                            <Icon28MoreHorizontal/>
                        </Link>
                        <FormItem
                            top='Трек-номер'
                        >
                            CCKS29234732AK1
                        </FormItem>
                    </Card>
                </Div>
                <Footer>Всего 2 посылки</Footer>
            </Group>
        </>
    )
}

export default withRouter(Favorite)