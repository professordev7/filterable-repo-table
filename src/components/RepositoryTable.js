import React from 'react';
import RepositoryRow from './RepositoryRow';

const RepositoryTable = (props) => {
	const filterText = props.filterText;
	const filterTab = props.filterTab;

	const rows = [];

	props.repositories.forEach((repo) => {
		if (repo.name.indexOf(filterText) === -1) {
			return;
		}
		if (!filterTab) {
			return;
		}

		if (filterTab === 'Public' && repo.private) {
			// hint: consider the inverse condition in the right of AND operand.
			return;
		}
		if (filterTab === 'Private' && !repo.private) {
			return;
		}
		if (filterTab === 'Sources' && repo.fork) {
			return;
		}
		if (filterTab === 'Forks' && !repo.fork) {
			return;
		}

		rows.push(<RepositoryRow repository={repo} key={repo.name} />);
	});


    const handleResetButtonChange = (e) => {
        e.preventDefault();
        props.onResetButtonChange();
    }

	return (
		<>
			{rows}
			<div className='panel-block'>
				<button
					className='button is-link is-outlined is-fullwidth'
					onClick={handleResetButtonChange}
				>
					Reset all filters
				</button>
			</div>
		</>
	);
};

export default RepositoryTable;
