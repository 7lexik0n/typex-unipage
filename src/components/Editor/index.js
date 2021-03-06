import style from "./editor.module.css";

export default function Editor(props) {
  const { text, position, wrongLetter = false } = props;

  return (
    <div className={style.editor}>
      {text.slice(0, position)}
      <span className={wrongLetter ? style.wrongLetter : style.currentLetter}>
        {text[position]}
      </span>
      {text.slice(position + 1)}
    </div>
  );
}
