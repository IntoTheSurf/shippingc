import style from '../css/menu.module.css'
import { Button } from './Button'

export const Menu = ({ createNode, ...props }) => {

    const removeLine = () => {
        console.log(props.selected.id.root);
        props.setLines((lines) =>
            lines.filter(
                (line) => !(line.props.root === props.selected.id.root && line.props.end === props.selected.id.end)
            )
        );
    }

    return (
        <div className={style.menu}>
            <Button onClick={createNode} text="Create node">
            </Button>
            <Button text="Create line">
            </Button>
            <Button onClick={removeLine} text="Remove line">
            </Button>
        </div>
    )
}

