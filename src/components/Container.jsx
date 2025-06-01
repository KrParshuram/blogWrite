import react from 'react';

function Container({ children }) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 ">
            {children}
        </div>
    );
}

export default Container;
// This component is a simple container that centers its children within a maximum width of 7xl and applies padding on the x-axis.