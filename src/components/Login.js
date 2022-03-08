import { Icon20User } from '@vkontakte/icons';
import { CellButton, Div, FormItem, Group, Header, Input, Text } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import fetches from '../fetches';

const Login = () => {
	const [tag, setTag] = useState(null)
	const [refresh, setRefresh] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		async function fetch() {
			setError(false)
			if (tag) {
				await fetches.getPlayerByTag(tag).then(res => {
						if (res.error) return setError(true)
						else if (res) {
							setError(false)
							localStorage.brawlTag = tag
							window.location.reload()
						}
					})
			} else ;
		}
		fetch()
	}, [refresh,]);

    return (
        <Group>
			<Header mode="secondary">Введите тег игрока</Header>
			<FormItem top="Тег игрока (без #)">
				<Input
				type="text"
				placeholder='ahsdnasd'
				onChange={e => setTag(e.target.value)}
				after={<Icon20User aria-hidden="true" />}
				/>
			</FormItem>
			<Div>
				<CellButton onClick={() => setRefresh(!refresh)}>Сохранить тег</CellButton>
				{error ? <Text weight="semibold" style={{'color':'red'}}>Введен некорректный тег пользователя</Text> : <></>}

			</Div>
		</Group>
    );
}

export default Login;
