import React from 'react'
import Capacitometer from 'src/components/Capacitometer'
import { createUseStyles } from 'react-jss'
import { Lixeira } from 'src/api/models/lixeira'

interface Props {
    lixeira : Lixeira
}

const LixeiraPod : React.FC<Props> = (props) => {

	const styles = useStyles()

    const lixeira = props.lixeira

	return (
		<div className={styles.container}>
			<Capacitometer/>
			<div className={styles.txtContainer}>
				<div>{lixeira.properties.location}</div>
				<div>{lixeira.properties.description}</div>
			</div>
		</div>
	)

}

export default LixeiraPod

const useStyles = createUseStyles({
	container : {
		overflow : 'hidden',
		display : 'flex',
		borderRadius : '0.85em',
		boxShadow: [0, 0, 10, 'rgba(0, 0, 0, 0.3)'],
		margin : ['1em', 0]
	},
	txtContainer : {
		flex : 1,
		padding : '0.5em'
	}
})