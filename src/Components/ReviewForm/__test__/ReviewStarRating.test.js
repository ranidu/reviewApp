import React from 'react';
import ReactDOM from 'react-dom';
import ReviewStarRating from '../ReviewStarRating';

it('ReviewStartRatingComponent', () => {
    const div = document.createElement("div");
    ReactDOM.render(<ReviewStarRating></ReviewStarRating>, div);
})