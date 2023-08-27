import style from '../css/menu.module.css'
import { Button } from './Button'

export const Menu = ({ createNode, ...props }) => {

    const removeLine = () => {
        console.log(props.selected.id.start);
        props.setLines((lines) =>
            lines.filter(
                (line) => !(line.props.start === props.selected.id.start && line.props.end === props.selected.id.end)
            )
        );
    }


    return (
        <div className={style.menu} onClick={(e) => e.stopPropagation()}>
            <Button onClick={createNode} text="Create node">
            </Button>
            <Button onClick={() => props.setActionState('Create line')} text="Create line">
            </Button>
            <Button onClick={removeLine} text="Remove line">
            </Button>
        </div>
    )
}

