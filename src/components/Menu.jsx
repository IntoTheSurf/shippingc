import style from '../css/menu.module.css'
import { Button } from './Button'

export const Menu = ({}) => {
    return (
        <div className={style.menu}>
            <Button text="First">
            </Button>
            <Button text="Second">
            </Button>
            <Button text="Third">
            </Button>
        </div>
    )
}