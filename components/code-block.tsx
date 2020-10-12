import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import styles from "./code-block.module.css";

export const CodeBlock = ({ language, value }) => {
  if (value === undefined) {
    return null;
  }

  const [lang, title] = language ? language.split(":") : [undefined, undefined];
  return (
    <figure className={styles.figure}>
      {title ? (
        <figcaption className={styles.figcaption}>{title}</figcaption>
      ) : null}
      <SyntaxHighlighter language={lang} style={a11yDark}>
        {value}
      </SyntaxHighlighter>
    </figure>
  );
};
