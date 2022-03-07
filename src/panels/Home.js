import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, CellButton } from '@vkontakte/vkui';
import { Icon28Notifications, Icon28StatisticCircleFillBlue, Icon28Users3Outline } from '@vkontakte/icons';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Brawl Tool</PanelHeader>
		{fetchedUser &&
		<Group header={<Header mode="secondary">Пользователь</Header>}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		<Group header={<Header mode="secondary">Navigation Example</Header>}>
			<Div>
				<CellButton before={<Icon28Users3Outline />} size="l" mode="secondary" onClick={go} data-to="brawlers">
					Список бравлеров
				</CellButton>
				<CellButton before={<Icon28StatisticCircleFillBlue />} size="l" mode="secondary" onClick={go} data-to="mystats">
					Моя статистика
				</CellButton>
			</Div>
		</Group>
	</Panel>
);

Home.propTypes = {
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

export default Home;
