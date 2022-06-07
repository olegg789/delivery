import React from 'react';
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
	Tabbar,
	TabbarItem
} from '@vkontakte/vkui';
import {
	Icon28FavoriteOutline,
	Icon28HistoryBackwardOutline,
	Icon28SearchOutline
} from '@vkontakte/icons';

function MobailNavigation({ router }) {

	function openView(view) {
		let nowView = router.activeView
		router.toView(view)
		
		if (view === nowView) {
		  router.toHash(`${view}/base`)
		}
	}

	return(
	    <Tabbar>
	      <TabbarItem
	        selected={router.activeView === 'home'}
	        onClick={() => openView('home')}
	        text='Поиск'
	      ><Icon28SearchOutline/></TabbarItem>

			<TabbarItem
				data-id='favorite'
				selected={router.activeView === 'favorite'}
				onClick={() => openView('favorite')}
				text='Избранное'
			><Icon28FavoriteOutline /></TabbarItem>

			<TabbarItem
				data-id='history'
				selected={router.activeView === 'history'}
				onClick={() => openView('history')}
				text='История'
			><Icon28HistoryBackwardOutline /></TabbarItem>

	    </Tabbar>
	)
}

export default withRouter(MobailNavigation);