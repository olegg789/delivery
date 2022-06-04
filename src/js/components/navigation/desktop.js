import React from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
  SplitCol,
	Panel,
	PanelHeader,
	Group,
	Cell
} from '@vkontakte/vkui';
import {
    Icon28FavoriteOutline,
    Icon28HistoryBackwardOutline,
    Icon28Notifications,
    Icon28SearchOutline,
} from '@vkontakte/icons';

function DesktopNavigation({ router }) {
    const hasHeader = useSelector((state) => state.main.hasHeader)

    return(
    <SplitCol fixed width='280px' maxWidth='280px'>
      <Panel id='menuDesktop'>
        {hasHeader && <PanelHeader/>}
        <Group>
              <Cell
                onClick={() => router.toView('home')}
                disabled={router.activeView === 'home'}
                before={<Icon28SearchOutline/>}
                className={router.activeView === 'home' ? 'activeViewCell' : ''}
              >
                  Поиск
              </Cell>

              <Cell
                onClick={() => router.toView('notify')}
                disabled={router.activeView === 'notify'}
                before={<Icon28Notifications/>}
                className={router.activeView === 'notify' ? 'activeViewCell' : ''}
              >
                Уведомления
              </Cell>

            <Cell
                onClick={() => router.toView('favorite')}
                disabled={router.activeView === 'favorite'}
                before={<Icon28FavoriteOutline/>}
                className={router.activeView === 'favorite' ? 'activeViewCell' : ''}
            >
                Избранное
            </Cell>

            <Cell
                onClick={() => router.toView('history')}
                disabled={router.activeView === 'history'}
                before={<Icon28HistoryBackwardOutline/>}
                className={router.activeView === 'history' ? 'activeViewCell' : ''}
            >
                История
            </Cell>

        </Group>

      </Panel>
    </SplitCol>
)
}

export default withRouter(DesktopNavigation);