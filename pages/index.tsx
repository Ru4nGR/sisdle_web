import React, { useState } from 'react'
import Map from 'src/components/Map'
import SearchCard from 'src/components/SearchCard'
import EntityCard from 'src/components/EntityCard'
import { createUseStyles } from 'react-jss'
import LixeiraModel, { Lixeira } from 'src/api/models/lixeira'
import { GetServerSideProps } from 'next'
import SelectedEntityContext from 'src/components/contexts/SelectedEntityContext'
import UserModel, { User } from 'src/api/models/user'

interface Props {
    lixeiras : Array<Lixeira>,
	users : Array<User>
}

class LixeiraClass implements Lixeira {
	_id?: string
	type: 'Feature'
	geometry: { type: 'Point'; coordinates: number[] }
	properties: { admin: string; location: string; description: string; capacity: number; distanceCover: number; distanceBottom: number }
}

const App : React.FC<Props> = (props) => {

	const styles = useStyles()
    const lixeiras = props.lixeiras
	const users = props.users

    const [selectedEntity, setSelectedEntity] = useState<Lixeira | User>()

	return (
        <SelectedEntityContext.Provider value={{selected : selectedEntity, setSelected : (selected) => setSelectedEntity(selected)}}>
            <div className={styles.container}>
				<div className={styles.mapContainer}>
                	<Map lixeiras={lixeiras} center={(selectedEntity instanceof LixeiraClass) && selectedEntity?.geometry.coordinates}/>
				</div>
                <div className={styles.foreground}>
					<div className={styles.searchCardContainer}>
                    	<SearchCard users={users} lixeiras={lixeiras}/>
					</div>
					<div className={styles.entityCardContainer  + ' ' + (selectedEntity == undefined && styles.hidden)}>
                    	<EntityCard/>
					</div>
                </div>
            </div>
        </SelectedEntityContext.Provider>
	)

}

export default App

export const getServerSideProps : GetServerSideProps = async (ctx) => {
    const lixeiras = await LixeiraModel.find({})
	const users = await UserModel.find({})
    return {
        props : {
            lixeiras : JSON.parse(JSON.stringify(lixeiras)),
			users : JSON.parse(JSON.stringify(users))
        }
    }
}

const useStyles = createUseStyles({
	'@global body' : {
		margin : 0
	},
	container : {
		display : 'flex',
		width : '100vw',
		height : '100vh',
		overflow : 'hidden'
	},
	foreground : {
		display : 'flex',
		position : 'absolute',
		width : '100%',
		height : '100%',
		pointerEvents : 'none',
		'& *' : {
			pointerEvents : 'auto'
		}		
	},
	mapContainer : {
		width : '100%',
		height : '100%',
		transform : 'translate(calc(33.333% - 0.85em * 2))'
	},
	searchCardContainer : {
		flex : 0.333,
		display : 'flex',
		'& > *' : {
			flex : 1
		}
	},
	entityCardContainer : {
		flex : 0.333,
		display : 'flex',
		margin : ['1em', 0],
		transform : 'translate(0)',
		transition : ['transform', '0.7s', 'cubic-bezier(0.2, 1, 0.2, 1)'],
		'& > *' : {
			flex : 1
		}
	},
	hidden : {
		transform : 'translate(-100%)',
	}
})