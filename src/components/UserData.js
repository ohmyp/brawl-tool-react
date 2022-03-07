import { Avatar, Cell, Group, Header } from '@vkontakte/vkui';
import React from 'react';

const Userdata = ( {fetchedUser} ) => {
    return (
        fetchedUser &&
            <Group header={<Header mode="secondary">Пользователь</Header>}>
                <Cell
                    before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                    description={localStorage.brawlTag ? '#'+localStorage.brawlTag.toUpperCase() : ''}
                >
                    {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                </Cell>
            </Group>
    );
}

export default Userdata;
