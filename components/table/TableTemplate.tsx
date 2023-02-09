import React, { ChangeEvent, MouseEvent, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  Button,
  IconButton,
  Modal,
  Pagination,
  PaginationItem,
  TextField,
} from "@mui/material";
import { Data, HeadCell, Order } from "./TableTypes";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import { getComparator, stableSort } from "./utility";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Data {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rowsData = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
    align: "center",
    valueAlign: "center",
    editable: true,
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
    align: "center",
    valueAlign: "center",
    editable: true,
    sortable: true,
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
    align: "center",
    valueAlign: "center",
    editable: true,
    sortable: true,
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
    align: "center",
    valueAlign: "center",
    editable: true,
    sortable: true,
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
    align: "center",
    valueAlign: "center",
  },
];

type Props = {
  isHeadActive?: boolean;
  isSelectable?: boolean;
  spaceController?: boolean;
  editable?: boolean;
};

const TableTemplate = ({
  isHeadActive = false,
  isSelectable = false,
  spaceController = false,
  editable = false,
}: Props) => {
  const [order, setOrder] = useState<Order>("asc");

  let headKey: keyof Data | undefined = undefined;
  headCells.forEach((k) => {
    if (k.sortable && headKey === undefined) {
      headKey = k.id;
    }
  });

  const [orderBy, setOrderBy] = useState(
    headKey ? headKey : headCells[0].id
  );
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [edith, setEdith] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState(rowsData);

  const [open, setOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{
    index: number;
    key: keyof Data;
  }>({
    index: -1,
    key: headCells[headCells.length - 1].id,
  });
  const [newCell, setNewCell] = useState<string | number>("");
  const handleClose = () => {
    setOpen(false);
  };

  const [selectable, setSelectable] = useState(isSelectable);
  const [activeHead, setActiveHead] = useState(isHeadActive);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };
  const handleChangeEdit = (event: ChangeEvent<HTMLInputElement>) => {
    setEdith(event.target.checked);
    if (event.target.checked) {
      setSelectable(true);
      setActiveHead(true);
    } else {
      setSelectable(isSelectable);
      setActiveHead(isHeadActive);
    }
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box className="w-full overflow-hidden">
      <Paper className="w-full overflow-hidden mb-2">
        {activeHead && <EnhancedTableToolbar numSelected={selected.length} />}
        {
          // TODO: add search
        }
        <TableContainer className="max-h-96">
          <Table
            stickyHeader
            aria-label="sticky table"
            //sx={{ minWidth: 750 }}
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              isSelectable={selectable}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator({order, orderBy}))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      {selectable && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) =>
                              selectable ? handleClick(event, row.name) : null
                            }
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                      )}
                      {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      Object.entries(row).map(([key, value], _ind) => (
                        <TableCell
                          key={_ind}
                          /* component="th"
                      id={labelId}
                      scope="row"
                      padding="none" */
                          align={headCells[_ind].valueAlign}
                        >
                          {edith ? (
                            headCells[_ind].editable ? (
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  setSelectedCell({
                                    index: rows.indexOf(row),
                                    key: headCells[_ind].id,
                                  });
                                  setNewCell(value);
                                  setOpen(true);
                                }}
                              >
                                {value}
                              </Button>
                            ) : (
                              value
                            )
                          ) : (
                            value
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              {
                // TODO : dont need this
                false &&
                  // add false
                  emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )
              }
            </TableBody>
          </Table>
        </TableContainer>

        <div className="flex flex-wrap justify-between items-center p-1">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Pagination
            page={page + 1}
            count={Math.ceil(rows.length / rowsPerPage)}
            shape="rounded"
            color="primary"
            showFirstButton
            showLastButton
            boundaryCount={2}
            renderItem={(item) => (
              <PaginationItem
                //type={"start-ellipsis"}
                component={Button}
                //selected
                {...item}
                onClick={() => {
                  if (typeof item.page == "number") setPage(item.page - 1);
                }}
              />
            )}
          />
        </div>
      </Paper>
      {spaceController && (
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      )}
      {editable && (
        <FormControlLabel
          control={<Switch checked={edith} onChange={handleChangeEdit} />}
          label="Can edith"
        />
      )}
      <Modal open={open} onClose={handleClose}>
        <Box className="absolute flex items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] p-1 pl-2 gap-1 bg-white">
          <TextField
            value={newCell}
            onChange={(e) => {
              setNewCell(e.target.value);
            }}
          />
          <div className="flex flex-col">
            <IconButton
              color="success"
              onClick={() => {
                setRows((prev) => {
                  const tempRow: Data = {
                    ...prev[selectedCell.index],
                    [selectedCell.key]: newCell,
                  };
                  const tempRows: Data[] = [...prev];
                  tempRows[selectedCell.index] = tempRow;

                  return tempRows;
                });
                setOpen(false);
              }}
            >
              <CheckCircleOutline />
            </IconButton>
            <IconButton color="error" onClick={handleClose}>
              <HighlightOff />
            </IconButton>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default TableTemplate;
