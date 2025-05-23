import React, { useState } from 'react';
import { JOKER_SYMBOLS } from '../types';

interface JokerSectionProps {
    currentJoker: string;
    previousJoker: string;
    onJokerChange: (newJoker: string) => void;
}

const JokerSection: React.FC<JokerSectionProps> = ({ currentJoker, previousJoker, onJokerChange }) => {
    const [jokerInputValue, setJokerInputValue] = useState<string>('');

    const handleSubmitCoringa = () => {
        const numericValue = parseInt(jokerInputValue, 10);
        if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 13) {
            onJokerChange(jokerInputValue);
        } else {
            alert('Número inválido. Use valores entre 1 e 13.');
        }
        setJokerInputValue('');
    };

    return (
        <div className="row-container">
            <div className='card'>
                <h3 className="text-red">Coringa</h3>
                <div className="joker-display" aria-label="Coringa Atual">
                    <h1>{currentJoker}</h1>
                </div>
                <div className="row">
                    <input
                        type="number"
                        className="joker-input"
                        value={jokerInputValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJokerInputValue(e.target.value)}
                    />
                    <button className="button action-button" onClick={handleSubmitCoringa}>Feito</button>
                </div>
            </div>

            <div className='card'>
                <h3 className="text-blue">Anterior</h3>
                <div className="joker-display" aria-label="Coringa Anterior">
                    <h1>{previousJoker}</h1>
                </div>
                <div className="row suit-row">
                    {JOKER_SYMBOLS.map(symbol => (
                        <h3 key={symbol}>
                            {symbol}
                        </h3>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JokerSection;