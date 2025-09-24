














const Star = ({ type }) => {
    if (type === 'full') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" className="max-sm:w-[18px]" fill="none">
                <path d="M12.2 2L15.3518 8.3852L22.4 9.4154L17.3 14.3828L18.5036 21.4004L12.2 18.0854L5.8964 21.4004L7.1 14.3828L2 9.4154L9.0482 8.3852L12.2 2Z" fill="#FE9C28" stroke="#FE9C28" strokeWidth="2.04" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    if (type === 'half') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" className="max-sm:w-[18px]" fill="none">
                <defs>
                    <linearGradient id="halfGrad">
                        <stop offset="50%" stopColor="#FE9C28" />
                        <stop offset="50%" stopColor="white" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <path d="M12.2 2L15.3518 8.3852L22.4 9.4154L17.3 14.3828L18.5036 21.4004L12.2 18.0854L5.8964 21.4004L7.1 14.3828L2 9.4154L9.0482 8.3852L12.2 2Z" fill="url(#halfGrad)" stroke="#FE9C28" strokeWidth="2.04" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    // empty
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" className="max-sm:w-[18px]" fill="none">
            <path d="M12.2 2L15.3518 8.3852L22.4 9.4154L17.3 14.3828L18.5036 21.4004L12.2 18.0854L5.8964 21.4004L7.1 14.3828L2 9.4154L9.0482 8.3852L12.2 2Z" fill="#DEDEDE" stroke="#DEDEDE" strokeWidth="2.04" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};




const StarRating = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push('full');
        } else if (rating >= i - 0.5) {
            stars.push('half');
        } else {
            stars.push('empty');
        }
    }

    return (
        <div className="flex items-center  gap-[6px]">
            {stars.map((type, index) => (
                <Star key={index} type={type} />
            ))}
        </div>
    );
};









export default StarRating;