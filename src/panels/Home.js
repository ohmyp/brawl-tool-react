import React from 'react';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, CellButton } from '@vkontakte/vkui';
import { Icon24GunOutline, Icon28Notifications, Icon28StatisticCircleFillBlue, Icon28Users3Outline } from '@vkontakte/icons';
import Userdata from '../components/UserData';
import Login from '../components/Login';

const Home = ({ id, go, fetchedUser }) => {

	return (
	<Panel id={id}>
		<PanelHeader>Brawl Tool</PanelHeader>
		<Userdata fetchedUser={fetchedUser}/>
		{!localStorage.brawlTag? <Login/> : <></>}
		<Group header={<Header mode="secondary">Методы</Header>}>
			<Div>
				<CellButton before={<Icon28Users3Outline />} size="l" mode="secondary" onClick={go} data-to="brawlers">
					Список бравлеров
				</CellButton>
				<CellButton before={<Icon28StatisticCircleFillBlue />} size="l" mode="secondary" onClick={go} data-to="mystats">
					Моя статистика
				</CellButton>
				<CellButton before={<Icon24GunOutline />} size="l" mode="secondary" onClick={go} data-to="battlelog">
					Статистика боев
				</CellButton>
			</Div>
		</Group>
	</Panel>
)
}

export default Home;
