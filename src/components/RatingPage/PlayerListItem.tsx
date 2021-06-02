import { Box, Button, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useState } from "react";
import { ExpandMore, ExpandLess, LooksOne, LooksTwo, Looks3 } from '@material-ui/icons';
import useStyles from './RatingPageStyle';


const PlayerListItem = ({ row, index }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { name, numberOfGames, rating, wins, games } = row;

  const color = index % 2 === 0 ? 'white' : '#dadada';

  const icon = useMemo(() => {
    const num = index + 1;

    if (num === 1) {
      return (
        <LooksOne className={`${classes.place} first`} />
      );
    }
    if (num === 2) {
      return (
        <LooksTwo className={`${classes.place} second`} />
      );
    }
    if (num === 3) {
      return (
        <Box>
          <Looks3 className={`${classes.place} third`} />
        </Box>
      );
    }
    return null;
  }, [index]);

  return (
    <>
      <TableRow style={{ backgroundColor: color }} className={classes.row}>
        <TableCell component="th" scope="row">
          {icon}
        </TableCell>
        <TableCell align="right">
          {name}
        </TableCell>
        <TableCell align="right">{numberOfGames}</TableCell>
        <TableCell align="right">{rating}</TableCell>
        <TableCell align="right">{wins}</TableCell>
        <TableCell align="right">
          <Button onClick={() => (setOpen((prev) => !prev))}>
            {open ? (
              <ExpandLess fontSize="large" />
            ) : (
                <ExpandMore fontSize="large" />
              )}
          </Button>
        </TableCell>
      </TableRow>
      {open && (
        <Dialog
          open={open}
          onClose={() => (setOpen(false))}
        >
          <TableContainer >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right">Всього</TableCell>
                  <TableCell align="right">Civil</TableCell>
                  <TableCell align="right">Sheriff</TableCell>
                  <TableCell align="right">Don</TableCell>
                  <TableCell align="right">Mafia</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Кількість ігор:
                </TableCell>
                  <TableCell align="right">{games.amountGames.all}</TableCell>
                  <TableCell align="right">{games.amountGames.civil}</TableCell>
                  <TableCell align="right">{games.amountGames.sheriff}</TableCell>
                  <TableCell align="right">{games.amountGames.don}</TableCell>
                  <TableCell align="right">{games.amountGames.mafia}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Перемог (у %):
                </TableCell>
                  <TableCell align="right">{games.wins.all}</TableCell>
                  <TableCell align="right">{games.wins.civil}</TableCell>
                  <TableCell align="right">{games.wins.sheriff}</TableCell>
                  <TableCell align="right">{games.wins.don}</TableCell>
                  <TableCell align="right">{games.wins.mafia}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Dialog>
      )}
    </>
  );
}

export default PlayerListItem;
