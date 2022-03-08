import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Button, Cell, CellButton, Div, FormItem, Group, Header, Input, Panel, PanelHeader, PanelHeaderBack, PanelSpinner, SimpleCell, Text } from '@vkontakte/vkui';
import Fetches from '../fetches';
import { Icon20User } from '@vkontakte/icons';
import Userdata from '../components/UserData';
import Login from '../components/Login';

const MyStats = ({ id, go, fetchedUser }) => {
	const [playerData, setPlayerData] = useState(null)
	const [clubData, setClubData] = useState(null)
	const [brawlersCount, setBrawlersCount] = useState(null)
	const [icons, setIcons] = useState({})
	
	useEffect(() => {
		let isMounted = true
		if (localStorage.brawlTag){
			Fetches.getPlayerByTag(localStorage.brawlTag, setPlayerData)
			
			Fetches.getIcons(setIcons)
			Fetches.getBrawlersCount(setBrawlersCount)
		}
		return () => { isMounted = false }
	}, [])

	useEffect(() => {
		let isMounted = true
		if (playerData?.club?.tag)
		Fetches.getClubByTag(playerData?.club?.tag, setClubData)
		return () => { isMounted = false }

	}, [playerData])

	return(
	<Panel id={id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={go} data-to="home"/>}
		>
		Статистика
		</PanelHeader>

		<Userdata fetchedUser={fetchedUser}/>

		{!localStorage.brawlTag? <Login/> :
		<>
		<Group>
			<Header mode="secondary">Данные об акаунте</Header>
			{playerData && icons && clubData
			? 
			<>
				<SimpleCell
				description={`Тег: ${clubData.tag}. Кубков: ${clubData.trophies}. Участников: ${clubData.members.length}`}
				before={<Avatar src={icons.club[clubData.badgeId].imageUrl} />}
				>
					{playerData.club.name}
				</SimpleCell>
				
				<SimpleCell
				before={<Avatar mode='app' src={icons.player[28000026].imageUrl} />}
				description={`Рекорд: ${playerData.highestTrophies} кубков.`}
				>
					{playerData.trophies} кубка!
				</SimpleCell>
				
				<SimpleCell
				before={<Avatar mode='app' src={icons.player[28000001].imageUrl} />}
				description={`Не собрано бравлеров: ${brawlersCount - playerData.brawlers.length}`}
				>
					Бравлеров: {playerData.brawlers.length}
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
