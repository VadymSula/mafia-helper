package org.deanoffice2.mafiahelper.service;

import org.deanoffice2.mafiahelper.entity.*;
import org.deanoffice2.mafiahelper.repository.rating.RatingRepository;
import org.deanoffice2.mafiahelper.repository.StaticDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service("ratingService")
public class RatingServiceImpl implements RatingService {
    private static final String MAFIA = "Mafia|Don";
    private static final String CITY = "Civil|Sheriff";
    private int majorPointForBestMove;

    @Autowired
    @Qualifier("ratingRepository")
    private RatingRepository ratingRepository;
    @Autowired
    @Qualifier("staticDataRepository")
    private StaticDataRepository staticDataRepository;

    @Override
    public void updateRatingForMajorPoints(GameResult gameResult) {
        updateRatingForWin(gameResult);
        updateRatingForBestMove(gameResult);
    }

    @Override
    public void updateRatingForExtraPoints(List<RatingGame> ratingList) {
        ratingList.forEach(this::updatePlayerRating);
    }

    @Override
    public List<Statistics> getStatisticsPlayers() {
        return ratingRepository.getStatistics();
    }

    @Override
    public void updateRatingIndicators(GameResult gameResult) {
        gameResult.getPlayersResult()
                .stream()
                .filter(playerResult -> !playerResult.getRoleInGame().getRoleName().equals("Lead"))
                .forEach(playerResult -> {
                    ratingRepository.updateGamesQuantity(
                            gameResult.getClub().getIdClub(),
                            playerResult.getIdPlayer(),
                            addOneGame(playerResult, gameResult)
                    );
                });
        gameResult.getPlayersResult()
                .forEach(playerResult -> {
                    addOneGameForRole(
                            gameResult,
                            playerResult.getIdPlayer(),
                            playerResult.getRoleInGame().getRoleName()
                    );
                });
    }

    private void updateRatingForWin(GameResult gameResult) {
        for (PlayerResult playerResult : gameResult.getPlayersResult()) {
            Float newRating = addPointsToRatingForWin(
                    gameResult,
                    playerResult,
                    getRatingValue(gameResult, playerResult)
            );

            ratingRepository.updateRatingPlayer(
                    gameResult.getClub().getIdClub(),
                    playerResult.getIdPlayer(),
                    newRating
            );
        }
    }

    private void updateRatingForBestMove(GameResult gameResult) {
        gameResult.getPlayersResult()
                .stream()
                .filter(playerResult -> playerResult.getGoldenMove() != null)
                .forEach(playerResult -> {
                    majorPointForBestMove = getGuessedNumberMafiaPlayers(playerResult, getMafiaPlayers(gameResult));
                    Float newRating = calculateMajorPointsForBestMove(
                            majorPointForBestMove,
                            getRatingValue(gameResult, playerResult)
                    );
                    ratingRepository.updateRatingPlayer(
                            gameResult.getClub().getIdClub(),
                            playerResult.getIdPlayer(),
                            newRating
                    );
                });
    }

    private void updatePlayerRating(RatingGame ratingGame) {
        ratingRepository.updateRatingPlayer(
                ratingGame.getClub().getIdClub(),
                ratingGame.getPlayer().getIdPlayer(),
                addExtraPointsToRating(
                        ratingGame.getClub().getIdClub(),
                        ratingGame.getPlayer().getIdPlayer(),
                        ratingGame.getRatingValue()
                )
        );
    }

    private Integer addOneGame(PlayerResult playerResult, GameResult gameResult) {
        return 1 + ratingRepository.getPlayerGamesQuantity(
                gameResult.getClub().getIdClub(),
                playerResult.getIdPlayer());
    }

    private void addOneGameForRole(GameResult gameResult, Integer idPlayer, String roleName) {
        int newGamesQuantity;
        int newWinsQuantity = 0;
        int newWinGeneralQuantity = 0;
        switch (roleName) {
            case "Civil":
                newGamesQuantity = 1 + ratingRepository.getForRoleQuantity(idPlayer, "games_civil_quantity");
                ratingRepository.updateWinsQuantity(idPlayer, newGamesQuantity, "games_civil_quantity");
                if (gameResult.getWin().equals("city")) {
                    newWinGeneralQuantity = 1 + ratingRepository.getForRoleQuantity(idPlayer, "wins_quantity");
                    ratingRepository.updateWinsQuantity(idPlayer, newWinGeneralQuantity, "wins_quantity");
                    newWinsQuantity = 1 + ratingRepository.getForRoleQuantity(idPlayer, "wins_civil");
                    ratingRepository.updateWinsQuantity(idPlayer, newWinsQuantity, "wins_civil");
                }
                break;
            case "Mafia":
                newGamesQuantity = 1 + ratingRepository.getForRoleQuantity(idPlayer, "games_mafia_quantity");
                ratingRepository.updateWinsQuantity(idPlayer, newGamesQuantity, "games_mafia_quantity");
                if (!gameResult.getWin().equals("city")) {
                    newWinGeneralQuantity = 1 + ratingRepository.getForRoleQuantity(idPlayer, "wins_quantity");
                    ratingRepository.updateWinsQuantity(idPlayer, newWinGeneralQuantity, "wins_quantity");
                    newWinsQuantity = 1 + ratingRepository.getForRoleQuantity(idPlayer, "wins_mafia");
                    ratingRepository.updateWinsQuantity(idPlayer, newWinsQuantity, "wins_mafia");
                }
                break;
            case "Don":
                newGamesQuantity = 1 + ratingRepository.getForRoleQuantity(idPlayer, "games_don_quantity");
                ratingRepository.updateWinsQuantity(idPlayer, newGamesQuantity, "games_don_quantity");
                if (!gameResult.getWin().equals("city")) {
                    newWinGeneralQuantity = 1 + ratingRepository.getForRoleQuantity(idPlayer, "wins_quantity");
                    ratingRepository.updateWinsQuantity(idPlayer, newWinGeneralQuantity, "wins_quantity");
                    newWinsQuantity = 1 + ratingRepository.getForRoleQuantity(idPlayer, "wins_don");
                    ratingRepository.updateWinsQuantity(idPlayer, newWinsQuantity, "wins_don");
                }
                break;
            case "Sheriff":
                newGamesQuantity = 1 + ratingRepository.getForRoleQuantity(idPlayer, "games_sheriff_quantity");
                ratingRepository.updateWinsQuantity(idPlayer, newGamesQuantity, "games_sheriff_quantity");
                if (gameResult.getWin().equals("city")) {
                    newWinGeneralQuantity = 1 + ratingRepository.getForRoleQuantity(idPlayer, "wins_quantity");
                    ratingRepository.updateWinsQuantity(idPlayer, newWinGeneralQuantity, "wins_quantity");
                    newWinsQuantity = 1 + ratingRepository.getForRoleQuantity(idPlayer, "wins_sheriff");
                    ratingRepository.updateWinsQuantity(idPlayer, newWinsQuantity, "wins_sheriff");
                }
                break;
        }
    }
//    private void updateRatingOnBestMoveForSheriff(GameResult gameResult) {
//        gameResult.getPlayersResult()
//                .stream()
//                .filter(playerResult -> {
//                    return playerResult.getGoldenMove() == null && isRoleSheriff(playerResult);
//                })
//                .forEach(playerResult -> {
//                    //System.out.println("===============\n" + playerResult.getIdPlayer() + "  " + majorPointForBestMove);
//
//                    ratingRepository.updateRatingPlayer(
//                            gameResult.getIdClub(),
//                            playerResult.getIdPlayer(),
//                            calculateMajorPointsForBestMove(
//                                    majorPointForBestMove,
//                                    getRatingValue(gameResult, playerResult)
//                            )
//                    );
//                });
//    }

    private Float getRatingValue(GameResult gameResult, PlayerResult playerResult) {
        return ratingRepository
                .getPlayerRatingValue(
                        gameResult.getClub().getIdClub(),
                        playerResult.getIdPlayer()
                );
    }

    private Float getRatingValue(Integer idClub, Integer idPlayer) {
        return ratingRepository.getPlayerRatingValue(idClub, idPlayer);
    }

    private Float addPointsToRatingForWin(GameResult gameResult, PlayerResult playerResult, Float ratingValue) {
        return ratingValue + calculateMajorPointsForWin(gameResult, playerResult);
    }

    private Float addExtraPointsToRating(Integer idClub, Integer idPlayer, Float ratingValue) {
        return ratingValue + getRatingValue(idClub, idPlayer);
    }

    private Float calculateMajorPointsForWin(GameResult gameResult, PlayerResult playerResult) {
        if (isTeamWin(gameResult, 'i')) {
            return addMajorPointForRoleWin(CITY, playerResult);
        } else if (isTeamWin(gameResult, 'a')) {
            return addMajorPointForRoleWin(MAFIA, playerResult);
        }
        return 0F;
    }

    private Float calculateMajorPointsForBestMove(int guessedMafiaPlayers, Float ratingValue) {
        return ratingValue + addPointsByCountGuessedMafiaPlayers(guessedMafiaPlayers);
    }

    private Float addMajorPointForRoleWin(String roleTeam, PlayerResult playerResult) {
        for (RoleGame roleGame : getListRolesByTeam(roleTeam)) {
            if (roleGame.getIdRole().equals(playerResult.getRoleInGame().getIdRole())) {
                return 1F;
            }
        }
        return 0F;
    }

    private int getGuessedNumberMafiaPlayers(PlayerResult playerResult, List<PlayerResult> playerResultList) {
        int repeatCounter = 0;
        for (Integer playerNumberIsMafia : parseStringArrToListShort(playerResult.getGoldenMove())) {
            for (PlayerResult result : playerResultList) {
                if (playerNumberIsMafia.equals(result.getPlayerNumberInGame())) {
                    repeatCounter++;
                }
            }
        }
        return repeatCounter;
    }

    private List<PlayerResult> getMafiaPlayers(GameResult gameResult) {
        return gameResult
                .getPlayersResult()
                .stream()
                .filter(playerResult -> {
                    return playerResult.getRoleInGame().getIdRole().equals(isNumberMafiaPlayer(playerResult));
                })
                .collect(Collectors.toList());
    }

    private Integer isNumberMafiaPlayer(PlayerResult playerResult) {
        return getListRolesByTeam(MAFIA)
                .stream()
                .filter(role -> role.getIdRole().equals(playerResult.getRoleInGame().getIdRole()))
                .findFirst()
                .orElse(new RoleGame())
                .getIdRole();

    }

    private List<RoleGame> getListRolesByTeam(String roleTeam) {
        return staticDataRepository.findRolesForSelectList()
                .stream()
                .filter(role -> role.getRoleName().matches(roleTeam))
                .collect(Collectors.toList());
    }

    private Float addPointsByCountGuessedMafiaPlayers(int guessedMafiaPlayers) {
        return guessedMafiaPlayers == 2 ? 0.25F
                : guessedMafiaPlayers == 3 ? 0.4F
                : 0F;
    }

    private List<Integer> parseStringArrToListShort(String bestMove) {
        List<Integer> integerList = new ArrayList<>();
        String[] stringArray = bestMove.split("/");

        for (String playerNumber : stringArray) {
            integerList.add(Integer.valueOf(playerNumber));
        }

        return integerList;
    }

//    private Float addMainVictoryPoint(Float ratingValue) {
//        return ratingValue + 1F;
//    }

//    private boolean isRoleSheriff(PlayerResult playerResult) {
//        return playerResult.getRoleInGame().equals(getSheriffId());
//    }

//    private Integer getSheriffId() {
//        return getMapRolesByTeam("Sheriff")
//                .keySet()
//                .stream()
//                .findFirst()
//                .orElse(null);
//    }

    private boolean isTeamWin(GameResult gameResult, char secondSymbolTeamName) {
        return gameResult.getWin().charAt(1) == secondSymbolTeamName;
    }


}
