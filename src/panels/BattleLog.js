import { Avatar, Card, CardGrid, Div, Group, Header, Panel, PanelHeader, PanelHeaderBack, SimpleCell } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';

const Battlelog = (props) => {
    const userData = useSelector(state => state.userData)
    return (
        <Panel>
            <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to="home"/>}>
			    Статистика боев
		    </PanelHeader>
            <Group mode="plain" >
                <CardGrid size="l">
                    <Card mode="shadow">
                        <div style={{ height: 96 }} >
                            <Header mode="secondary">Бой раз</Header>
                        </div>
                    </Card>
                </CardGrid>
                <CardGrid size="l">
                    <Card mode="shadow">
                        <div style={{ height: 96 }} >
                            <Header mode="secondary">Бой два</Header>
                        </div>
                    </Card>
                </CardGrid>
            </Group>

        </Panel>

    );
}

export default Battlelog;
