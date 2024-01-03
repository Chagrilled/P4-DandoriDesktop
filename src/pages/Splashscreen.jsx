import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export const SplashScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="container py-20 px-10 mx-0 min-w-full flex flex-col items-center">
            <h2 className="text-8xl mb-3 text-blue-200 font-[Pikmin]">Dandori Desktop</h2>

            <div className='flex flex-inline mt-10'>
                <div className='flex-inline pr-10'>
                    <button
                        className="bg-green-600 text-white hover:bg-green-800 font-bold p-2 rounded-full"
                        onClick={() => navigate('/maps')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 m-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                        </svg>
                    </button>
                    <p className='text-2xl font-[Pikmin] text-center mt-2'>Map Editor</p>
                </div>

                <div className='flex-inline pl-10'>
                    <button
                        className="bg-green-600 text-white hover:bg-green-800 font-bold p-2 rounded-full"
                        onClick={() => navigate('/editor')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 m-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                        </svg>
                    </button>
                    <p className='text-2xl font-[Pikmin] text-center mt-2'>Object Editor</p>
                </div>
            </div>
        </div>
    );
};