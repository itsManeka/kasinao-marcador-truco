import React, {useRef} from 'react';
import { Team } from '../types';
import PointButton from './PointButton';

interface TeamCardProps {
    team: Team;
    onTeamNameChange: (teamId: number, newName: string) => void;
    onScoreChange: (teamId: number, newScore: number) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onTeamNameChange, onScoreChange }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onTeamNameChange(team.id, event.target.value);
    };

    const incrementScore = (points: number) => {
        onScoreChange(team.id, team.score + points);

        if (points == 3) {
            if (audioRef.current) {
                audioRef.current.play().catch(error => console.error("Audio play error:", error));
            }
        }
    };

    const decrementScore = () => {
        onScoreChange(team.id, team.score - 1);
    };

    return (
        <div className='row-container'>
            <div className="card">
                <h3>Dupla</h3>
                <h1 className={`dupla-name ${team.id === 1 ? 'a' : 'b'}`}>
                    {team.name || "? ?"}
                </h1>
                <input
                    type="text"
                    value={team.name}
                    onChange={handleNameChange}
                    maxLength={10}
                    placeholder="Nome da Dupla"
                />
            </div>

            <div className='card'>
                <h1 className="pts">{team.score}</h1>
                <div className="points-row">
                    <PointButton label='+1' onClick={() => incrementScore(1)} className='button one' />
                    <PointButton label='+3' onClick={() => incrementScore(3)} className='button three' />
                    <PointButton label='-1' onClick={decrementScore} className='button less' />
                    <audio ref={audioRef} src={"../assets/sounds/kasino.mp3"} typeof="audio/mpeg" preload="auto"></audio>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;