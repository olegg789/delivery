import React, {useState} from 'react';
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
    Button, CustomSelect, CustomSelectOption,
    Div, FormItem,
    Group, Input,
    PanelHeader, Placeholder,
} from '@vkontakte/vkui'
import {set} from "../../reducers/mainReducer"
import {useDispatch, useSelector} from "react-redux";
import {Icon28LocationOutline} from "@vkontakte/icons";

function Home({ router, isDesktop }) {
    const storage = useSelector((state) => state.main)

    const [track, setTrack] = useState('')
    const [statusTrack, setStatusTrack] = useState('default')

    return (
        <>
            <PanelHeader separator={false}>
                Поиск
            </PanelHeader>
            <Group>
                {storage.track === '' && <>
                    <Placeholder
                        className={!isDesktop && 'trackPlaceholder'}
                        icon={<Icon28LocationOutline width={56} height={56}/>}
                        header='Привет!'
                    >
                        Выбери свою службу доставки, введи трек-номер и мы её отследим!
                    </Placeholder>
                    <FormItem top='Выбери службу доставки' style={{marginTop: -40}}>
                        <CustomSelect
                            options={[
                                {label: 'СДЭК', value: 0},
                                {label: 'Почта России', value: 1}
                            ]}
                            renderOption={({ option, ...restProps }) => (
                                <CustomSelectOption
                                    {...restProps}
                                />
                            )}
                            placeholder='Не выбрано'
                        />
                    </FormItem>

                    <FormItem top='Введи трек-номер' status={statusTrack} bottom={statusTrack === 'error' && 'С этим полем что-то не так!'}>
                        <Input
                            value={track}
                            onChange={(e) => {setStatusTrack('default'); setTrack(e.currentTarget.value)}}
                            placeholder='Введи номер сюда'
                        />
                    </FormItem>

                    <Div>
                        <Button
                            size='l'
                            stretched
                            style={{marginTop: -10}}
                            onClick={() => {
                                if (track.length === 0) {
                                    setStatusTrack('error')
                                    return
                                }
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