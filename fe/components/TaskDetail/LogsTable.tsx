import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CustomTableCell = TableCell;

interface ILogsTableProps {
    logs: any[];
}

function LogsTable(props: ILogsTableProps) {
    const { logs } = props;

    return (
        <Paper >
            <Table >
                <TableHead>
                    <TableRow>
                        <CustomTableCell>Autor</CustomTableCell>
                        <CustomTableCell>Komentář</CustomTableCell>
                        <CustomTableCell>Datum vytvoření</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map((log) => (
                        <TableRow key={log.id}>
                            <CustomTableCell component="th" scope="row">{log.author.fullName}</CustomTableCell>
                            <CustomTableCell align="right">{log.comment}</CustomTableCell>
                            <CustomTableCell>{log.created_at}</CustomTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default LogsTable;
