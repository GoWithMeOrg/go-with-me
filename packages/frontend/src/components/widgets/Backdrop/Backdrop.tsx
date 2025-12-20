import useBackdrop from './hooks/useBackdrop';

import classes from './Backdrop.module.css';

interface BackdropProps {
  children: React.ReactNode;
  marginTop: number;
  marginBottom: number;
  contentLoading: boolean;
}

export const Backdrop: React.FC<BackdropProps> = ({
  children,
  marginTop,
  marginBottom,
  contentLoading,
}) => {
  const { containerRef, style } = useBackdrop({ children, marginTop, marginBottom });

  return (
    <div className={classes.backdrop}>
      {!contentLoading && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            width: '100vw',
            minHeight: '100vh',
            backgroundColor: 'white',
            zIndex: -1,
            transition: 'all 0.3s ease',
            ...style,
          }}
        />
      )}

      <div ref={containerRef} className={classes.containerRef}>
        {children}
      </div>
    </div>
  );
};

export default Backdrop;
