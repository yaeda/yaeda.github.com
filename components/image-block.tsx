import styles from "./image-block.module.css";
import utilStyles from "../styles/utils.module.css";

export const ImageBlock = ({ alt, src }) => {
  return (
    <figure className={styles.figure}>
      <img src={src} alt="" />
      {alt ? (
        <figcaption className={`${styles.figcaption} ${utilStyles.lightText}`}>
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
};
