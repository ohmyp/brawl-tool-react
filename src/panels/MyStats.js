import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Group, Header, Panel, PanelHeader, PanelHeaderBack, PanelSpinner, SimpleCell } from '@vkontakte/vkui';
import Fetches from '../fetches';
import Userdata from '../components/UserData';
import Login from '../components/Login';
import { useSelector } from 'react-redux';

const MyStats = ({ id, go, fetchedUser }) => {
	const userData = useSelector(state => state.userData)
	const clubData = useSelector(state => state.clubData)
	const icons = useSelector(state => state.icons)
	const [brawlersCount, setBrawlersCount] = useState(null)
	
	useEffect(() => {
		async function loadCount() {
			if (localStorage.brawlTag){
				let count = await Fetches.getBrawlersCount()
				setBrawlersCount(count)
			}
		}
		loadCount()
	}, [])

	return(
	<Panel id={id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={go} data-to="home"/>}
		>
		Статистика
		</PanelHeader>

		{!localStorage.brawlTag? <Login/> :
		<>
		<Group>
			<Header mode="secondary">Данные об акаунте</Header>
			{userData && icons && clubData
			? 
				<>
					<SimpleCell
					description={localStorage.brawlTag ? '#'+localStorage.brawlTag.toUpperCase() : ''}
					before={<Avatar src={icons.player[userData.icon.id].imageUrl} />}
					>
						{userData.name}
					</SimpleCell>

					<SimpleCell
					description={`Тег: ${clubData.tag}. Кубков: ${clubData.trophies}. Участников: ${clubData.members.length}`}
					before={<Avatar mode='app' src={icons.club[clubData.badgeId].imageUrl} />}
					>
						Клуб: "{userData.club.name}"
					</SimpleCell>
					
					<SimpleCell
					before={<Avatar mode='app' src={icons.player[28000026].imageUrl} />}
					description={`Рекорд: ${userData.highestTrophies} кубков.`}
					>
						Кубков: {userData.trophies}
					</SimpleCell>
					
					<SimpleCell
					before={<Avatar mode='app' src={icons.player[28000001].imageUrl} />}
					description={`Не собрано бравлеров: ${brawlersCount - userData.brawlers.length}`}
					>
						Бравлеров: {userData.brawlers.length}
					</SimpleCell>
					
					<SimpleCell
					before={<Avatar mode='app' src={icons.player[28000025].imageUrl} />}
					description={`3х3: ${userData['3vs3Victories']} побед. Соло: ${userData.soloVictories} побед. Дуо: ${userData.duoVictories} побед.`}
					>
						Всего побед: {userData['3vs3Victories'] + userData.duoVictories + userData.soloVictories}
					</SimpleCell>
					
					<SimpleCell
					before={<Avatar mode='app' src={icons.player[28000032].imageUrl} />}
					description={`Очков опыта: ${userData.expPoints}`}
					>
						Уровень: {userData.expLevel}
					</SimpleCell>

				</>
			:
				<PanelSpinner />
			}
			
		</Group>
		</>
		}
	</Panel>
)}


export default MyStats;
