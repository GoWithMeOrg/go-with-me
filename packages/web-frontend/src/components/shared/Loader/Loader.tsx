import classes from './Loader.module.css';

interface loaderProps {
  num: 1 | 2;
}

export const Loader = ({ num }: loaderProps) => {
  const loaderClass = num === 1 ? classes.loader1 : classes.loader2;

  return <div className={loaderClass}></div>;
};

export default Loader;
