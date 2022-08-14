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
	isLoadingMore,
	fetchMore,
	items,
	headCells,
	onEdit,
	onDelete,
	inAction,
	onCheck
}) => {
	const copyModal = useRef(null);
	const {handleClick, isCopied, setIsCopied} = useCopyModal(copyModal);

	return (
		<InfiniteScrollList
			hasMore={hasMore}
			isLoading={isLoading}
			isLoadingMore={isLoadingMore}
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
							<TableHeadCell key={cell}>{cell.toLowerCase()}</TableHeadCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map((item, index) => (
						<TableItem
							key={item.uuid}
							onEdit={onEdit !== null ? onEdit(item.uuid) : null}
							isActionsAllowed={item.edit_allowed}
							onDelete={onDelete !== null ? () => onDelete(item.uuid) : null}
							number={index + 1}
							onClick={handleClick}
							isLoading={inAction}
							values={item.values}
							onCheck={onCheck !== null ? () => onCheck(item.uuid) : null}
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
	isLoadingMore: PropTypes.bool.isRequired,
	inAction: PropTypes.bool.isRequired,
	fetchMore: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	headCells: PropTypes.array.isRequired,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onCheck: PropTypes.func
};

ItemsTable.defaultProps = {
	onEdit: null,
	onDelete: null,
	onCheck: null
};

export default ItemsTable;
