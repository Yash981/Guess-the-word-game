
import { useState } from 'react'
import wordScramble from './assets/wordScramble.svg'
import { words } from './assets/words.json'
import { useRef } from 'react'
import { useEffect } from 'react'

const CardComponent = () => {
    const tries = 5
    const dots = [1, 2, 3, 4, 5]
    const [wrongLetters, setwrongLetters] = useState([])
    const [randomWord, setRandomWord] = useState('');
    const inputRefs = useRef([]);
    const [shuffleword, setShuffleword] = useState('')
    const [wrongCount, setWrongCount] = useState(1)
    const [inputVal, setInputVal] = useState(Array(6).fill(''))

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * words.length);
        setRandomWord(words[randomIndex]);
        setShuffleword(shuffle(words[randomIndex]))
    }, []);


    function shuffle(word) {
        const shuffledArray = word.split('').sort(() => Math.random() - 0.5);
        return shuffledArray.join('');
    }

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleShuffleClick = () => {
        setInputVal(Array(6).fill(''));
        setwrongLetters([]);
        const newRandomWord = words[Math.floor(Math.random() * words.length)];
        setRandomWord(newRandomWord);
        setShuffleword(shuffle(newRandomWord));
        if (inputRefs.current) {
            inputRefs.current.forEach((inputRef) => {
                inputRef.style.borderColor = '#4A5567';
            });
        }
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
            inputRefs.current[0].style.borderColor = "#672171"
        }


    }

    const handleChange = (idx, e) => {
        const text = e.target.value
        const newText = [...inputVal];

        newText[idx] = text.slice(0, 1)

        setInputVal(newText)

        const combinedWord = newText.join("")
        // console.log(combinedWord)

        for (let i = combinedWord.length - 1; i < randomWord.length; i++) {

            if (combinedWord[i] !== randomWord[i]) {
                inputRefs.current[i].style.borderColor = 'red'
                wrongLetters.push(combinedWord[i])
                setWrongCount((prev) => prev + 1)
                break
            }
            if (randomWord[i] === combinedWord[combinedWord.length - 1]) {

                inputRefs.current[i].style.borderColor = 'green'
                break
            }
        }
        // console.log(wrongCount)

        setTimeout(() => {
            if (wrongCount >= 5) {
                handleResetClick();
                setWrongCount(1)
                alert('all Tries over')
                return;
            }
        }, 100);




        setTimeout(() => {
            if (combinedWord === randomWord) {
                alert('🎉 Success')
            }
        }, 250)
        if (text && idx < 6 - 1 && inputRefs.current[idx + 1]) {
            inputRefs.current[idx + 1].focus();
        }
    }
    const handleResetClick = () => {
        setInputVal(Array(6).fill(''));
        setwrongLetters([]);

        // Generate a new random word
        // const randomIndex = Math.floor(Math.random() * words.length);
        // setRandomWord(words[randomIndex]);
        // setShuffleword(shuffle(words[randomIndex]));

        if (inputRefs.current) {
            inputRefs.current.forEach((inputRef) => {
                inputRef.style.borderColor = '#4A5567';
            });
        }
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
            inputRefs.current[0].style.borderColor = "#672171"
        }

    };
    return (
        <>
            <div className="wordscramble w-[450px] h-[420px] bg-[#030616] rounded-[15px] flex flex-col items-center p-6">
                <div className="ImageContainer p-12 pb-6 pt-6">
                    <img src={wordScramble} className='w-[200px] h-auto' alt="word scramble" />
                </div>
                <div className="shuffleWord w-full h-16 bg-[#4A5567] rounded-md flex justify-center items-center ">
                    <p className='text-[#97A3B6] text-center text-3xl tracking-[1rem]'>{shuffleword}</p>
                </div>
                <div className="TriesMistakes w-full h-14 items-center  flex justify-around py-4">
                    <div className="Tries flex gap-1 items-center">
                        <p className='text-[#97a3b6] text-center text-sm'>Tries({5 - wrongLetters.length}/{tries})</p>
                        <div className="Triesdots flex gap-2">
                            {dots.map((dot, idx) => {

                                const dotColor =
                                    idx >= dots.length - wrongLetters.length
                                        ? 'bg-[#4A5567]'
                                        : 'bg-[#7429C6]';
                                // console.log(dots.length, wrongLetters.length)
                                return (
                                    <p key={idx} className={`text-white w-2 h-2 ${dotColor} rounded-md`}></p>
                                );
                            })}
                        </div>
                    </div>
                    <div className="Mistakes flex gap-1">
                        <p className='text-[#97A3B6] text-sm'>Mistakes:</p>
                        <div className="wrongLetter flex gap-1">
                            {wrongLetters && wrongLetters.map((letter, idx) => {
                                return (

                                    <p key={idx} className='text-[#97a3b6] '>{letter},</p>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="userinput flex gap-2 w-full h-24 items-center justify-center m-4">
                    {inputVal.map((val, idx) => {
                        return (
                            <input key={idx}
                                type="text"
                                className='w-12 h-12 
                            bg-transparent rounded-md text-center text-xl text-white
                            border-[2px] border-[#4A5567]
                            outline-none
                            focus:border-[#672171]
                            '
                                ref={(input) => (inputRefs.current[idx] = input)}
                                value={val}
                                onChange={(e) => handleChange(idx, e)}
                            />
                        )
                    })}
                </div>
                <div className="flex justify-evenly items-center w-full">
                    <button className='w-[140px] h-12 rounded-md bg-[#C951E7] text-white ' style={{ boxShadow: '0px 5px #672171' }} onClick={handleShuffleClick}>Random</button>
                    <button className='w-[140px] h-12 rounded-md bg-[#C951E7] text-white  ' style={{ boxShadow: '0px 5px #672171' }} onClick={handleResetClick} >Reset</button>
                </div>
            </div>

        </>
    )
}

export default CardComponent;