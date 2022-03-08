import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Brawlers from './panels/Brawlers';
import MyStats from './panels/MyStats';
import Battlelog from './panels/BattleLog';
import fetches from './fetches';
import { useDispatch, useSelector } from 'react-redux';
const App = () => {
	const dispatch = useDispatch()

	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			if (localStorage.brawlTag) {
				let udata = await fetches.getPlayerByTag(localStorage.brawlTag)
				let cdata = await fetches.getClubByTag(udata.club.tag)
				let icons = await fetches.getIcons()
				await dispatch({type:"ADD_USERDATA", payload: udata})
				await dispatch({type:"ADD_CLUBDATA", payload: cdata})
				await dispatch({type:"ADD_ICONS", payload: icons})
			}
			setPopout(null);
		}	
		
		fetchData();
				
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					<Home id='home' fetchedUser={fetchedUser} go={go} />
					<Brawlers id='brawlers' go={go} />
					<MyStats id='mystats' fetchedUser={fetchedUser} go={go} />
					<Battlelog id='battlelog' fetchedUser={fetchedUser} go={go} />
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
