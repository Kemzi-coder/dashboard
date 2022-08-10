import PropTypes from "prop-types";
import React, {useRef} from "react";
import useCopyModal from "../../hooks/useCopyModal.hook";
import CopyModal from "../CopyModal/CopyModal";
import InfiniteScrollList from "../InfiniteScrollList/InfiniteScrollList";
import {Table, TableBody, TableHead, TableHeadCell, TableRow} from "../Table";
import TableItem from "../TableItem/TableItem";

const ItemsTable = ({
	hasMore,
	isLoading,
	fetchMore,
	items,
	headCells,
	onEdit,
	onDelete,
	inAction
}) => {
	const copyModal = useRef(null);
	const {handleClick, isCopied, setIsCopied} = useCopyModal(copyModal);

	return (
		<InfiniteScrollList
			hasMore={hasMore}
			isLoading={isLoading}
			onFetchMore={fetchMore}
			length={items.length}
		>
			<CopyModal
				ref={copyModal}
				isCopied={isCopied}
				setIsCopied={setIsCopied}
			/>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeadCell>No.</TableHeadCell>
						<TableHeadCell>Actions</TableHeadCell>
						{headCells.map(cell => (
							<TableHeadCell ket={cell}>{cell.toLowerCase()}</TableHeadCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map((item, index) => (
						<TableItem
							key={item.uuid}
							onSave={onEdit(item.uuid)}
							isActionsAllowed={item.edit_allowed}
							onDelete={() => onDelete(item.uuid)}
							number={index + 1}
							onClick={handleClick}
							isLoading={inAction}
							values={item.values}
						/>
					))}
				</TableBody>
			</Table>
		</InfiniteScrollList>
	);
};

ItemsTable.propTypes = {
	hasMore: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	inAction: PropTypes.bool.isRequired,
	fetchMore: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	headCells: PropTypes.array.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
};

export default ItemsTable;
