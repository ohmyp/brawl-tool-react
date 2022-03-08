import { Avatar, Button, Cell, Group, Header, SimpleCell } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import Fetches from '../fetches';

const Userdata = ( {fetchedUser} ) => {
    const [playerData, setPlayerData] = useState([])
	const [icons, setIcons] = useState({})

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

	useEffect(() => {
		if (localStorage.brawlTag){
			Fetches.getPlayerByTag(localStorage.brawlTag, setPlayerData)
			Fetches.getIcons(setIcons)
		}
	}, [])

    return (
        (playerData?.icon?.id && icons) 
        ?
            <Group header={<Header mode="secondary">Пользователь</Header>}>
                <SimpleCell
                description={localStorage.brawlTag ? '#'+localStorage.brawlTag.toUpperCase() : ''}
                before={<Avatar src={icons.player[playerData.icon.id].imageUrl} />}
                after={localStorage.brawlTag?<Button onClick={logout}>Сменить пользователя</Button>:<></>}
                >
                    {playerData.name}
                </SimpleCell>
            </Group>
        : 
            fetchedUser &&
            <Group header={<Header mode="secondary">Пользователь</Header>}>
                <Cell
                    before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                    description={localStorage.brawlTag ? '#'+localStorage.brawlTag.toUpperCase() : ''}
                    after={localStorage.brawlTag?<Button onClick={logout}>Сменить пользователя</Button>:<></>}
                >
                    {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                </Cell>
            </Group>
    )
}

export default Userdata;
