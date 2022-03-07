import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Div, Group, Panel, PanelHeader, PanelHeaderBack, SimpleCell } from '@vkontakte/vkui';
import Fetches from '../fetches';


const Brawlers = props => {
	const [brawlers, setBrawlers] = useState([])
	useEffect(() => {
		Fetches.getBrawlers(setBrawlers)
	}, []);
	
	return(
	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
			Бравлеры
		</PanelHeader>
		<Group>
				{brawlers.length < 1
				 ? <>Loading...</>
				 : brawlers.map(b => 
				<Div key={b.name}>
					<SimpleCell before={<Avatar src={b.imageUrl} />}>
						{b.name}
					</SimpleCell>
				 </Div>
				)}
		</Group>
	</Panel>
)}

Brawlers.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Brawlers;
