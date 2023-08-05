import style from '../css/menu.module.css'

export function Button({ text, onClick}) {
    return (
        <button type="button" className={style.buttons} onClick={onClick}>
            {text}
        </button>
    )
}