
const { useState, useEffect } = React

export function DynamicRating() {
    const [ratingMethod, setRatingMethod] = useState('select');

    const handleChange = (event) => {
        setRatingMethod(event.target.value)
    }

    return (
        <section className="dynamic-rating">
            Rate With:
            <input name="rating-method" value="select" type="radio" onChange={handleChange} checked={ratingMethod === 'select'} />
            <label>Select</label>
            <input name="rating-method" value="text" type="radio" onChange={handleChange} checked={ratingMethod === 'text'} />
            <label>Text</label>
            <input name="rating-method" value="stars" type="radio" onChange={handleChange} checked={ratingMethod === 'stars'} />
            <label>Stars</label>
            <DynamicRatingCmp ratingMethod={ratingMethod} />
        </section>
    )
}

function DynamicRatingCmp({ratingMethod}) { 
    switch (ratingMethod) {
        case 'select':
            return <SelectRating />
        case 'text':
            return <TextRating />
        case 'stars':
            return <StarsRating />
    }
}

function SelectRating() {
    return (
        <section>
            <select name="select-rating">
                <option value="">Select your rating:</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
        </section>
    )
}

function TextRating() {
    const [value, setValue] = useState('')
    
    function handleChange(ev) {
        const rating = ev.target.value
        if (rating < 1 || rating > 5) return
        setValue(rating)
    }

    return (
        <section>
            <input type="number" 
            value={value}
            placeholder="Enter your rating"
            min={1} 
            max={5}
            onChange={handleChange}
            title="Please choose a rating between 1 to 5">
            </input>
        </section>
    )
}

function StarsRating() {
    
    const [stars, setStars] = useState(['☆', '☆', '☆', '☆', '☆'])

    useEffect(() => {
        console.log(stars)        
    }, [stars])

    function onStarClick(ev) {
        console.log('here');
        
        const value = ev.getAttribute('value')
        const newStars = []
        for (let i = 0; i < 5; i++) {
            if (i < value) newStars.push('⭐')
            else newStars.push('☆')
        }
        console.log(newStars)      
        setStars(newStars)
    }

    return (
        <section>
            {stars.map((star, index) => {
                console.log(star)                
                return <span key={index + 1} 
                    value={index + 1} 
                    onClick={(event) => onStarClick(event.target)}
                    className='stars'
                    >{star}</span>
            })}
        </section>
    )
}