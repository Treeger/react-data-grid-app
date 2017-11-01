import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import ReactDOM from 'react-dom';
import data from '../../data.js';

export default class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: {},
			rows: data,
			columns: [
				{
					key: 'name',
					name: 'name',
					width: 140,
					headerGroup: '',
					locked: true
				},
				{
					key: 'age',
					name: 'age',
					width: 60,
					headerGroup: 'Personal'
				},
				{
					key: 'gender',
					name: 'gender',
					width: 80,
					headerGroup: 'Personal'
				},
				{
					key: 'company',
					name: 'company',
					width: 180,
					headerGroup: 'nothin'
				},
				{
					key: 'eyeColor',
					name: 'eyeColor',
					width: 180,
					headerGroup: 'nothin'
				},
				{
					key: 'email',
					name: 'email',
					width: 180,
					headerGroup: 'nothin'
				},
				{
					key: 'balance',
					name: 'balance',
					width: 180,
					headerGroup: 'Information'
				},
				{
					key: 'phone',
					name: 'phone',
					width: 180,
					headerGroup: 'Information'
				},
				{
					key: 'address',
					name: 'address',
					width: 300,
					headerGroup: 'Information'
				}
			],
			headerGrouped: []
		};
	}

	componentWillMount() {
		const columns = this.state.columns;
		const headerGrouped = [];
		let left = 0;
		columns.forEach(c => {
			const i = headerGrouped.findIndex(r => r.headerGroup === c.headerGroup);
			if (i === -1) {
				headerGrouped.push({ headerGroup: c.headerGroup, width: c.width, left });
			} else {
				headerGrouped[i].width += c.width;
			}
			left += c.width;
		});
		this.setState({ headerGrouped });
	}

	componentDidMount() {
		const groupedHeader = document.querySelector('div.table-wraper');
		const headerRow = document.querySelector('div.react-grid-HeaderRow');
		headerRow.appendChild(groupedHeader);
	}

	onCellExpand = args => {
		const rows = this.state.rows.slice(0);
		const rowKey = args.rowData.name;
		const rowIndex = rows.indexOf(args.rowData);
		const subRows = args.expandArgs.children;

		const expanded = this.state.expanded;
		if (expanded && !expanded[rowKey]) {
			expanded[rowKey] = true;
			this.updateSubRowDetails(subRows, args.rowData.treeDepth);
			rows.splice(rowIndex + 1, 0, ...subRows);
		} else if (expanded[rowKey]) {
			expanded[rowKey] = false;
			rows.splice(rowIndex + 1, subRows.length);
		}
		this.setState({ expanded, rows });
	};

	getSubRowDetails = rowItem => {
		const isExpanded = this.state.expanded[rowItem.name]
			? this.state.expanded[rowItem.name]
			: false;

		return {
			group: rowItem.children && rowItem.children.length > 0,
			expanded: isExpanded,
			children: rowItem.children,
			field: 'name',
			treeDepth: rowItem.treeDepth || 0,
			siblingIndex: rowItem.siblingIndex,
			numberSiblings: rowItem.numberSiblings
		};
	};

	updateSubRowDetails(subRows, parentTreeDepth) {
		const treeDepth = parentTreeDepth || 0;
		subRows.forEach((sr, i) => {
			sr.treeDepth = treeDepth + 1;
			sr.siblingIndex = i;
			sr.numberSiblings = subRows.length;
		});
	}

	rowGetter = i => this.state.rows[i];

	renderheaderGroup() {
		return this.state.headerGrouped.map(s => (
			<div className="header-group" key={s.headerGroup} style={{ left: s.left, width: s.width }}>
				<div className="center">{s.headerGroup}</div>
			</div>
		));
	}

	render() {
		return (
			<div>
				<div className="table-wraper">{this.renderheaderGroup()}</div>
				<ReactDataGrid
					enableCellSelect={false}
					columns={this.state.columns}
					rowGetter={this.rowGetter}
					rowsCount={this.state.rows.length}
					getSubRowDetails={this.getSubRowDetails}
					onCellExpand={this.onCellExpand}
					minHeight={500}
					rowHeight={50}
					ref={map => {
						this.map = map;
					}}
				/>
			</div>
		);
	}
}
