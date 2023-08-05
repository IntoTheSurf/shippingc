import style from '../css/menu.module.css'
import { Button } from './Button'

export const Menu = ({createNode}) => {
    return (
        <div className={style.menu}>
            <Button onClick={createNode} text="First">
            </Button>
            <Button text="Second">
            </Button>
            <Button text="Third">
            </Button>
        </div>
    )
}