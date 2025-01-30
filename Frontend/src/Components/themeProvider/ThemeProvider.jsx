import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
    const mode  = useSelector(state => state.theme.mode);

    console.log(mode);
    
    useEffect(() => {
        console.log(mode)
        document.body.className = mode;
    }, [mode]);

    return (
        <div>
            <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-gray-900 min-h-screen'>
                {children}
            </div>
        </div>
    );
}
