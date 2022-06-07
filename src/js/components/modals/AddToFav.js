import React, {useState} from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    IOS, FormLayout, FormItem, Input, Div, Button
} from "@vkontakte/vkui";
import {
    Icon24Dismiss,
    Icon24Cancel,
    Icon28CancelCircleOutline,
    Icon28CheckCircleOutline
} from '@vkontakte/icons'
import api from "../../../apiFunc";

let loading = false

function AddToFav({ nav, router, storage, openSnackbar, getFavorites, notifications }) {
    const platform = useSelector((state) => state.main.platform)

    const [name, setName] = useState('')

    async function addToVaf() {
        try {
            loading = true
            let res = await api(`favorites/${storage.parcelTrack}`, 'POST', (name.length !== 0) ? {name: name} : {})
            loading = false
            if (res.response) {
                router.toBack()
                setTimeout(router.toModal(), 500)
                openSnackbar('Посылка сохранена!', <Icon28CheckCircleOutline className='snack_suc'/>)
                getFavorites()
                if (!notifications) {
                    router.toModal('onNotifications')
                }
            }
            else {
                if (res.error.code === 3) {
                    router.toModal()
                    openSnackbar('Посылка уже в избранном!', <Icon28CancelCircleOutline className='snack_err'/>)
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <ModalPage
            nav={nav}
            header={
                <ModalPageHeader
                    left={platform !== IOS && 
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Cancel/>
                        </PanelHeaderButton>
                    }

                    right={platform === IOS && 
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Dismiss/>
                        </PanelHeaderButton>
                    }
                >
                    Добавить в избранное
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            <FormLayout>
                <FormItem top='Введите имя посылки (опционально)'>
                    <Input
                        value={name}
                        onChange={(e) => {
                            if (e.currentTarget.value.length > 30) return
                            setName(e.currentTarget.value)
                        }}
                        placeholder='Очень важная посылка'
                    />
                </FormItem>
                <Div>
                    <Button
                        size='l'
                        stretched
                        onClick={() => addToVaf()}
                        loading={loading}
                        hasActive={false}
                    >
                        Сохранить
                    </Button>
                </Div>

            </FormLayout>
        </ModalPage>
    );
}

export default withRouter(AddToFav);