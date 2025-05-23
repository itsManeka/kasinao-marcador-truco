import React from 'react';
import { Player } from '../types';

interface TableSectionProps {
    players: Player[];
    onPlayerNameChange: (playerIndex: number, newName: string) => void;
    currentPlayerIndex: number;
}

const TableSection: React.FC<TableSectionProps> = ({ players, onPlayerNameChange, currentPlayerIndex }) => {
    return (
        <div className='row-container'>
            <div className="card">
                <h3>Mesa</h3>
                <div className="row">
                    {players.map((player, index) => (
                        <div className="column" key={`player-${index}`}>
                            <div className={`player ${index === currentPlayerIndex ? 'time' : ''}`}>
                                <p>{index + 1}º</p>
                            </div>
                            <input
                                type="text"
                                value={player.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onPlayerNameChange(index, e.target.value)}
                                placeholder={`Jogador ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TableSection;