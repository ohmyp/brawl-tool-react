import { Avatar, Button, Cell, Group, Header, SimpleCell } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';

const Userdata = ( {fetchedUser} ) => {

    const userData = useSelector(state => state.userData)
	const clubData = useSelector(state => state.clubData)
	const icons = useSelector(state => state.icons)

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        (userData?.icon?.id && icons) 
        ?
            <Group header={<Header mode="secondary">Пользователь</Header>}>
                <SimpleCell
                description={localStorage.brawlTag ? '#'+localStorage.brawlTag.toUpperCase() : ''}
                before={<Avatar src={icons.player[userData.icon.id].imageUrl} />}
                after={localStorage.brawlTag?<Button onClick={logout}>Сменить пользователя</Button>:<></>}
                >
                    {userData.name}
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
