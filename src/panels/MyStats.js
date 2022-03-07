import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Button, Cell, CellButton, Div, FormItem, Group, Header, Input, Panel, PanelHeader, PanelHeaderBack, PanelSpinner, SimpleCell, Text } from '@vkontakte/vkui';
import Fetches from '../fetches';
import { Icon20User } from '@vkontakte/icons';
import Userdata from '../components/UserData';

const MyStats = ({ id, go, fetchedUser }) => {
	const [playerTag, setPlayerTag] = useState('')
	const [playerData, setPlayerData] = useState([])
	const [icons, setIcons] = useState(null)

	const buttonOnClick = async () => {
		await Fetches.getPlayerByTag(playerTag, setPlayerData)
		localStorage.setItem('brawlTag', playerTag)
	}
	useEffect(() => {
		if (localStorage.brawlTag){
			Fetches.getPlayerByTag(localStorage.brawlTag, setPlayerData)
			Fetches.getIcons(setIcons)
		}
	}, []);
	
	return(
	<Panel id={id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={go} data-to="home"/>}
		>
		Статистика
		</PanelHeader>

		<Userdata fetchedUser={fetchedUser}/>

		{!localStorage.brawlTag?
		<Group>
			<FormItem top="Тег игрока (без #)">
				<Input
				type="text"
				placeholder='ahsdnasd'
				value={playerTag}
				onChange={e => setPlayerTag(e.target.value)}
				after={<Icon20User aria-hidden="true" />}
				/>
			</FormItem>
			<Div>
				<CellButton onClick={buttonOnClick}>Сохранить тег</CellButton>
			</Div>
		</Group>:
		<>
		<Group>
			<Header mode="secondary">Данные об акаунте</Header>
			{console.log(playerData)}

			{playerData?.icon?.id && icons 
			? 
			<>
			<SimpleCell
			description={playerData.club.name}
			before={<Avatar src={icons.player[playerData.icon.id].imageUrl} />}
			color='#1ba5f5'
			>
				{playerData.name}
			</SimpleCell>
			<Cell
			before={<Avatar mode='app' src={icons.player[28000026].imageUrl} />}
			color='#1ba5f5'
			>
				<Text weight="regular">{playerData.trophies} кубка! Рекорд: {playerData.highestTrophies} кубков.</Text>
			</Cell>
			</>
			:
			<PanelSpinner />
			}
			
		</Group>
		</>
		}
		
		
	</Panel>
)}

MyStats.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default MyStats;
