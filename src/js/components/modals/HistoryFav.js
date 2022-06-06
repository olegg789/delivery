import React from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    IOS, Separator, Div, FormItem, SimpleCell
} from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Cancel } from '@vkontakte/icons'

function HistoryFav({ nav, router, storage }) {
    const platform = useSelector((state) => state.main.platform)

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
                    История ({storage.historyFav.length})
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            {storage.historyFav.map((el) => {
                const date = new Date(
                    el.date
                ).toLocaleString('ru', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
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
            })}
        </ModalPage>
    );
}

export default withRouter(HistoryFav);