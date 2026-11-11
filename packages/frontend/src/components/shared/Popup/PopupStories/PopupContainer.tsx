import { FC, useCallback, useState } from 'react';

import { Button } from '@/components/shared/Button';
import { Popup } from '@/components/shared/Popup';

export const PopupContainer: FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    const containerRef = useCallback((node: HTMLDivElement | null) => {
        setContainer(node);
    }, []);

    return (
        <>
            <Button
                onClick={(event) => {
                    event.stopPropagation();
                    setShowPopup(true);
                }}
            >
                ShowPopup
            </Button>
            <div ref={containerRef} style={{ position: 'relative', zIndex: 0 }}>
                container
            </div>
            <p>SomeText</p>
            <p>SomeText</p>
            <p>SomeText</p>
            <p>SomeText</p>
            {container && (
                <Popup
                    popupMode={'map'}
                    style={{ backgroundColor: 'red', color: 'white', padding: '1rem' }}
                    {...{
                        setShowPopup,
                        showPopup,
                        containerElement: container,
                        wrapperProps: {
                            style: {
                                position: 'absolute',
                                right: 'auto',
                                bottom: 'auto',
                                top: 'auto',
                                left: '2rem',
                                zIndex: 1,
                                padding: '1rem',
                            },
                        },
                    }}
                >
                    <div>
                        <p>PopupText</p>
                    </div>
                </Popup>
            )}
        </>
    );
};
