import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import PlayerListItem from './PlayerListItem';
import useStyles from './RatingPageStyle';

const RatingPage = () => {
    const classes = useStyles();


    const createData = (name: string, numberOfGames: number, rating: string, wins: number, games: any) => {
        return { name, numberOfGames, rating, wins, games };
    }

    const rows = [
        createData('Seezov', 237, '9%', 37, {
            amountGames: {
                all: 0,
                civil: 0,
                mafia: 0,
                don: 0,
                sheriff: 0,
            },
            wins: {
                all: '10%',
                civil: '10%',
                mafia: '10%',
                don: '10%',
                sheriff: '10%',
            },
            bestMove: 1,
        }),
        createData('Остін', 262, '16%', 24, {
            amountGames: {
                all: 0,
                civil: 0,
                mafia: 0,
                don: 0,
                sheriff: 0,
            },
            wins: {
                all: '10%',
                civil: '10%',
                mafia: '10%',
                don: '10%',
                sheriff: '10%',
            },
            bestMove: 1,
        }),
        createData('Рауль', 305, '3%', 67, {
            amountGames: {
                all: 0,
                civil: 0,
                mafia: 0,
                don: 0,
                sheriff: 0,
            },
            wins: {
                all: '10%',
                civil: '10%',
                mafia: '10%',
                don: '10%',
                sheriff: '10%',
            },
            bestMove: 1,
        }),
        createData('Одін', 356, '16%', 49, {
            amountGames: {
                all: 0,
                civil: 0,
                mafia: 0,
                don: 0,
                sheriff: 0,
            },
            wins: {
                all: '10%',
                civil: '10%',
                mafia: '10%',
                don: '10%',
                sheriff: '10%',
            },
            bestMove: 1,
        }),
    ];


    return (
        <Container className={classes.ratingPage}>
            <Typography variant="h3">Рейтинг гравців</Typography>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right">Ім'я</TableCell>
                            <TableCell align="right">Кількість ігор</TableCell>
                            <TableCell align="right">Рейтинг</TableCell>
                            <TableCell align="right">Перемоги</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <PlayerListItem key={row.name} row={row} index={index} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default RatingPage;
