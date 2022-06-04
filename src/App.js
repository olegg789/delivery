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
  withAdaptivity,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

import { set } from './js/reducers/mainReducer';

import DesktopNavigation from './js/components/navigation/desktop';
import MobailNavigation from './js/components/navigation/mobail';

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import AddToFav from './js/components/modals/AddToFav';

import Favorite from "./js/panels/favorite/base";
import History from "./js/panels/history/base";
import Home from "./js/panels/home/base"
import Notify from "./js/panels/notify/base";

import InfoParcel from "./js/panels/home/infoParcel";

const App = withAdaptivity(({ viewWidth, router }) => {
  const mainStorage = useSelector((state) => state.main)
  const dispatch = useDispatch()

  dispatch(set({ key: 'isDesktop', value: viewWidth >= 3 }))
  dispatch(set({ key: 'platform', value: mainStorage.isDesktop ? VKCOM : usePlatform() }))
  dispatch(set({ key: 'hasHeader', value: mainStorage.isDesktop !== true }))
  dispatch(set({ key: 'track', value: '' }))

  const [scheme, setScheme] = useState('')

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
    getAppScheme()
  }, [])

  const modals = (
    <ModalRoot activeModal={router.modal} onClose={() => router.toBack()}>
      <HomeBotsListModal nav="botsList"/>
      <AddToFav nav="addToFav"/>
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
                  />
                </Panel>

                <Panel id='infoParcel'>
                    <InfoParcel/>
                </Panel>
              </View>

              <View 
                id="notify"
                activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                popout={router.popout}
                modal={modals}
              >
                <Panel id='base'>
                  <Notify/>
                </Panel>
              </View>

              <View
                  id="favorite"
                  activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                  popout={router.popout}
                  modal={modals}
              >
                <Panel id='base'>
                  <Favorite/>
                </Panel>
              </View>

              <View
                  id="history"
                  activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                  popout={router.popout}
                  modal={modals}
              >
                <Panel id='base'>
                  <History/>
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
