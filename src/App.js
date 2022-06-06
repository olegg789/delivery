import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
  ConfigProvider,
  AppRoot,
  SplitLayout,
  PanelHeader,
  SplitCol,
  Epic,
  View,
  Panel,
  ModalRoot,
  usePlatform,
  VKCOM,
  withAdaptivity, Snackbar, ScreenSpinner,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

import { set } from './js/reducers/mainReducer';

import DesktopNavigation from './js/components/navigation/desktop';
import MobailNavigation from './js/components/navigation/mobail';

import HistoryFav from './js/components/modals/HistoryFav';
import AddToFav from './js/components/modals/AddToFav';

import Favorite from "./js/panels/favorite/base";
import History from "./js/panels/history/base";
import Home from "./js/panels/home/base"
import Notify from "./js/panels/notify/base";

import InfoParcel from "./js/panels/home/infoParcel";
import api from "./apiFunc";
import HistoryParcel from "./js/panels/history/infoParcel";
import About from "./js/panels/home/About";

const App = withAdaptivity(({ viewWidth, router }) => {
  const mainStorage = useSelector((state) => state.main)
  const dispatch = useDispatch()

  dispatch(set({ key: 'isDesktop', value: viewWidth >= 3 }))
  dispatch(set({ key: 'platform', value: mainStorage.isDesktop ? VKCOM : usePlatform() }))
  dispatch(set({ key: 'hasHeader', value: mainStorage.isDesktop !== true }))
  dispatch(set({ key: 'track', value: '' }))

  const [scheme, setScheme] = useState('')
  const [snackbar, setSnackbar] = useState(null)

  async function openSnackbar(text, icon) {
    setSnackbar(
        <Snackbar
            className='snack'
            layout='vertical'
            onClose={() => setSnackbar(null)}
            before={icon}
        >
          {text}
        </Snackbar>
    )
  }

  async function getNotifications() {
    try {
      let res = await api('notifications', 'GET')
      console.log(res)
    }
    catch (err) {
      console.log(err)
    }
  }

  async function getHistory() {
    try {
      let res = await api('history')
      if (res.response) {
        dispatch(set({key: 'history', value: res.items}))
        console.log(res.items)
        getNotifications()
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  async function getFavorites() {
    try {
      router.toPopout(<ScreenSpinner/>)
      let res = await api('favorites', 'GET')
      if (res.response) {
        console.log(res)
        dispatch(set({key: 'favorites', value: res.items}))
        getHistory()
        router.toPopout()
      }

    }
    catch (err) {
      console.log(err)
    }
  }

  async function getAppScheme() {
    bridge.subscribe((e) => {
      if (e.detail.type === 'VKWebAppUpdateConfig') {
        let data = e.detail.data.scheme
        setScheme(data)
      }
    })
    let appScheme = await bridge.send("VKWebAppGetConfig")
    setScheme(appScheme.scheme)
  }

  useEffect(() => {
    getAppScheme();
    getFavorites();
  }, [])

  async function acceptNotify() {
    let res = await bridge.send("VKWebAppGetLaunchParams")
    if (!res.vk_are_notifications_enabled) {
      bridge.send(
          "VKWebAppAllowNotifications").then(
              async (res) => {
                  await api('profile', 'PATCH', {notifications: res.result})
                }
      )
    }
  }

  const modals = (
    <ModalRoot activeModal={router.modal} onClose={() => router.toBack()}>
      <HistoryFav
          nav="historyFav"
          storage={mainStorage}
      />
      <AddToFav
          nav="addToFav"
          storage={mainStorage}
          openSnackbar={(text, icon) => openSnackbar(text, icon)}
          getFavorites={() => getFavorites()}
          acceptNotify={() => acceptNotify()}
      />
    </ModalRoot>
  );

  return(
    <ConfigProvider platform={mainStorage.platform} scheme={scheme} isWebView>
      <AppRoot>
        <SplitLayout
          header={mainStorage.hasHeader && <PanelHeader separator={false} />}
          style={{ justifyContent: "center" }}
        >
          <SplitCol
            animate={!mainStorage.isDesktop}
            spaced={mainStorage.isDesktop}
            width={mainStorage.isDesktop ? '560px' : '100%'}
            maxWidth={mainStorage.isDesktop ? '560px' : '100%'}
          >   
            <Epic 
              activeStory={router.activeView} 
              tabbar={!mainStorage.isDesktop && <MobailNavigation/>}
            >
              <View 
                id='home'
                activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                popout={router.popout}
                modal={modals}
              >
                <Panel id='base'>
                  <Home
                      isDesktop={mainStorage.isDesktop}
                      openSnackbar={(text, icon) => openSnackbar(text, icon)}
                      snackbar={snackbar}
                  />
                  {snackbar}
                </Panel>

                <Panel id='infoParcel'>
                    <InfoParcel
                        snackbar={snackbar}
                    />
                </Panel>

                <Panel id='about'>
                  <About/>
                </Panel>
                {snackbar}
              </View>

              <View 
                id="notify"
                activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                popout={router.popout}
                modal={modals}
              >
                <Panel id='base'>
                  <Notify
                      storage={mainStorage}
                      acceptNotify={() => acceptNotify()}
                  />
                </Panel>
              </View>

              <View
                  id="favorite"
                  activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                  popout={router.popout}
                  modal={modals}
              >
                <Panel id='base'>
                  <Favorite
                      storage={mainStorage}
                      dispatch={(value) => dispatch(value)}
                      getFavorites={() => getFavorites()}
                      openSnackbar={(text, icon) => openSnackbar(text, icon)}
                  />
                  {snackbar}
                </Panel>
              </View>

              <View
                  id="history"
                  activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                  popout={router.popout}
                  modal={modals}
              >
                <Panel id='base'>
                  <History
                      storage={mainStorage}
                  />
                </Panel>

                <Panel id='historyParcel'>
                  <HistoryParcel/>
                </Panel>
              </View>
            </Epic>
          </SplitCol>

          {mainStorage.isDesktop && <DesktopNavigation/>}
        </SplitLayout>
      </AppRoot>
    </ConfigProvider>
  )
}, { viewWidth: true })

export default withRouter(App);
