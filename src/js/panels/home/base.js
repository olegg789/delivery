import React, {useEffect, useState} from 'react';
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
    Button,
    Div, FormItem,
    Group, Input,
    PanelHeader, PanelHeaderButton, Placeholder,
} from '@vkontakte/vkui'
import {set} from "../../reducers/mainReducer"
import {useDispatch, useSelector} from "react-redux";
import {
    Icon28CancelCircleOutline,
    Icon28InfoCircleOutline,
    Icon56PlaceOutline
} from "@vkontakte/icons";
import api from "../../../apiFunc";

let loading = false

function Home({ router, isDesktop, openSnackbar, name, setSnackbar}) {
    const storage = useSelector((state) => state.main)
    const dispatch = useDispatch()

    const [track, setTrack] = useState(storage.parcelTrack)
    const [statusTrack, setStatusTrack] = useState('default')

    useEffect(() => {
        loading = false
        setSnackbar(null)
    }, [])

    async function openParcelInfo() {
        try {
            loading = true
            dispatch(set({ key: 'parcelTrack', value: track }))
            let res = await api(`delivery/${track}`, 'GET')
            loading = false
            if (res.response) {
                dispatch(set({key: 'infoParcel', value: res.deliveryInfo}))
                router.toPanel('infoParcel')
            }
            else {
                if (res.error.code === 4) {
                    openSnackbar('Трек-номер не найден!', <Icon28CancelCircleOutline className='snack_err'/>)
                }
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <PanelHeader separator={false} left={
                <PanelHeaderButton onClick={() => router.toPanel('about')}>
                    <Icon28InfoCircleOutline/>
                </PanelHeaderButton>
            } className='orange'
            >
                Поиск
            </PanelHeader>
            <Group>
                {storage.track === '' && <>
                    <Placeholder
                        className={!isDesktop && 'trackPlaceholder'}
                        icon={<Icon56PlaceOutline/>}
                        header={`Привет, ${name}!`}
                    >
                        Введи трек-номер посылки из <b>СДЭК</b> или <b>Почты России</b> и мы её отследим!
                    </Placeholder>

                    <FormItem top='Введи трек-номер' status={statusTrack} bottom={statusTrack === 'error' && 'С этим полем что-то не так!'}>
                        <Input
                            value={track}
                            onChange={(e) => {
                                if (e.currentTarget.value.length > 14) return
                                setStatusTrack('default');
                                setTrack(e.currentTarget.value)}
                            }
                            placeholder='Введи номер сюда'
                        />
                    </FormItem>

                    <Div>
                        <Button
                            className='orange'
                            size='l'
                            stretched
                            hasActive={false}
                            loading={loading}
                            disabled={!track}
                            onClick={() => {
                                if (track === undefined || track.length === 0) {
                                    setStatusTrack('error')
                                    return
                                }
                                openParcelInfo()
                            }
                            }
                        >
                            Отследить
                        </Button>
                    </Div>

                </>}
            </Group>
        </>
    )
}

export default withRouter(Home);