import { useState, useEffect } from 'react';
import TeamCard from '../components/TeamCard';
import JokerSection from '../components/JokerSection';
import TableSection from '../components/TableSection';
import { Team, Player, JOKER_SYMBOLS } from '../types';

export default function Home() {
    const initialTeamsState: Team[] = [
        { id: 1, name: '', score: 0 },
        { id: 2, name: '', score: 0 },
    ];

    const initialPlayersState: Player[] = [
        { name: '' }, { name: '' }, { name: '' }, { name: '' }
    ];

    const initialJoker: string = JOKER_SYMBOLS[0];

    const [teams, setTeams] = useState<Team[]>(() => {
        const savedTeams = localStorage.getItem('kasinaoTeams');
        return savedTeams ? JSON.parse(savedTeams) : initialTeamsState;
    });

    const [players, setPlayers] = useState<Player[]>(() => {
        const savedPlayers = localStorage.getItem('kasinaoPlayers');
        return savedPlayers ? JSON.parse(savedPlayers) : initialPlayersState;
    });

    const [currentJoker, setCurrentJoker] = useState<string>(() => {
        const savedJoker = localStorage.getItem('kasinaoJoker');
        
        return savedJoker
            ? JSON.parse(savedJoker)
            : initialJoker;
    });

    const [previousJoker, setPreviousJoker] = useState<string>(() => {
        const savedPrevJoker = localStorage.getItem('kasinaoPrevJoker');
        return savedPrevJoker
            ? JSON.parse(savedPrevJoker)
            : initialJoker;
    });

    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(() => {
        const savedIndex = localStorage.getItem('kasinaoCurrentPlayerIndex');
        const parsedIndex = savedIndex ? parseInt(JSON.parse(savedIndex), 10) : 3;
        return !isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < initialPlayersState.length ? parsedIndex : 3;
    });


    useEffect(() => {
        localStorage.setItem('kasinaoTeams', JSON.stringify(teams));
    }, [teams]);

    useEffect(() => {
        localStorage.setItem('kasinaoPlayers', JSON.stringify(players));
    }, [players]);

    useEffect(() => {
        localStorage.setItem('kasinaoJoker', JSON.stringify(currentJoker));
    }, [currentJoker]);

    useEffect(() => {
        localStorage.setItem('kasinaoPrevJoker', JSON.stringify(previousJoker));
    }, [previousJoker]);

    useEffect(() => {
        localStorage.setItem('kasinaoCurrentPlayerIndex', JSON.stringify(currentPlayerIndex));
    }, [currentPlayerIndex]);


    const handleTeamNameChange = (teamId: number, newName: string) => {
        setTeams(prevTeams =>
            prevTeams.map(team =>
                team.id === teamId ? { ...team, name: newName } : team
            )
        );
    };

    const handleScoreChange = (teamId: number, newScore: number) => {
        setTeams(prevTeams =>
            prevTeams.map(team =>
                team.id === teamId ? { ...team, score: Math.max(0, newScore) } : team
            )
        );
    };

    const handleJokerChange = (newJoker: string) => {
        setPreviousJoker(currentJoker);
        setCurrentJoker(newJoker);
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    };

    const handlePlayerNameChange = (playerIndex: number, newName: string) => {
        setPlayers(prevPlayers =>
            prevPlayers.map((player, index) =>
                index === playerIndex ? { ...player, name: newName } : player
            )
        );
    };

    const resetGame = () => {
        if (window.confirm("Tem certeza que deseja zerar o jogo?")) {
            setTeams(initialTeamsState);
            setPlayers(initialPlayersState);
            setCurrentJoker(initialJoker);
            setPreviousJoker(initialJoker);
            setCurrentPlayerIndex(3);

            localStorage.removeItem('kasinaoTeams');
            localStorage.removeItem('kasinaoPlayers');
            localStorage.removeItem('kasinaoJoker');
            localStorage.removeItem('kasinaoPrevJoker');
            localStorage.removeItem('kasinaoCurrentPlayerIndex');
        }
    };

    return (
        <div className='container'>
            {teams.map(team => (
                <TeamCard
                    key={team.id}
                    team={team}
                    onTeamNameChange={handleTeamNameChange}
                    onScoreChange={handleScoreChange}
                />
            ))}

            <JokerSection
                currentJoker={currentJoker}
                previousJoker={previousJoker}
                onJokerChange={handleJokerChange}
            />

            <TableSection
                players={players}
                onPlayerNameChange={handlePlayerNameChange}
                currentPlayerIndex={currentPlayerIndex}
            />

            <div className='row-container'>
                <div className="card">
                    <button onClick={resetGame} className="button action-button">
                        Zerar Jogo
                    </button>
                </div>
            </div>
        </div>
    );
}