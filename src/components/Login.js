import { Icon20User } from '@vkontakte/icons';
import { CellButton, Div, FormItem, Group, Input, Text } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import fetches from '../fetches';

const Login = () => {
	const [tag, setTag] = useState(null)
	const [playerData, setPlayerData] = useState(null)
	const [error, setError] = useState(false)

    const buttonOnClick = async () => {
		console.log('buttons');
		fetches.getPlayerByTag(tag, setPlayerData)
	}

	useEffect(() => {
		if (playerData?.error){
			setError(true)
		} else if (playerData) {
			setError(false)
			localStorage.brawlTag = tag
			window.location.reload()
		}
	}, [playerData])

    return (
        <Group>
			<FormItem top="Тег игрока (без #)">
				<Input
				type="text"
				placeholder='ahsdnasd'
				onChange={e => setTag(e.target.value)}
				after={<Icon20User aria-hidden="true" />}
				/>
			</FormItem>
			<Div>
				<CellButton onClick={buttonOnClick}>Сохранить тег</CellButton>
				{error ? <Text weight="semibold" style={{'color':'red'}}>Введен некорректный тег пользователя</Text> : <></>}

			</Div>
		</Group>
    );
}

export default Login;
