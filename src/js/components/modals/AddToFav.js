import React, {useState} from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    IOS, FormLayout, FormItem, Input, Div, Button
} from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Cancel } from '@vkontakte/icons'

function BotsListModal({ nav, router }) {
    const platform = useSelector((state) => state.main.platform)

    const [name, setName] = useState('')

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
                        onClick={() => router.toModal()}
                    >
                        Сохранить
                    </Button>
                </Div>

            </FormLayout>
        </ModalPage>
    );
}

export default withRouter(BotsListModal);