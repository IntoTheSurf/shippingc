import style from '../css/menu.module.css'
import { BoxEditMenu } from './BoxEditMenu'
import { Button } from './Button'
import { LineMenu } from './LineMenu'

export const Menu = ({createNode, ...props }) => {

    const removeLine = () => {
        console.log(props.selected.id.start);
        props.setLines((lines) =>
            lines.filter(
                (line) => !(line.props.start === props.selected.id.start && line.props.end === props.selected.id.end)
            )
        );
    }

    if (props.editMenu.type === 'box')
        return (
            <>
                <div className={style.menu} onClick={(e) => e.stopPropagation()}>
                    <Button onClick={createNode} text="Create node">
                    </Button>
                    <Button onClick={() => props.setActionState('Create line')} text="Create line">
                    </Button>
                    <Button onClick={removeLine} text="Remove line">
                    </Button> 
                    <Button onClick={() => props.setActionState('Remove node')} text="Remove node">
                    </Button>
                </div>
                <BoxEditMenu boxCustomization = {props.boxCustomization} setBoxCustomization = {props.setBoxCustomization} index = {props.editMenu.index}></BoxEditMenu>
            </>
        )
    else if (props.editMenu.type === 'line') {
        return (
            <>
                <div className={style.menu} onClick={(e) => e.stopPropagation()}>
                    <Button onClick={createNode} text="Create node">
                    </Button>
                    <Button onClick={() => props.setActionState('Create line')} text="Create line">
                    </Button>
                    <Button onClick={removeLine} text="Remove line">
                    </Button> 
                    <Button onClick={() => props.setActionState('Remove node')} text="Remove node">
                    </Button>
                </div>
                <LineMenu lineCustomization = {props.lineCustomization} setLineCustomization = {props.setLineCustomization} index = {props.editMenu.index}></LineMenu>
            </>
        )
    }
    else if (props.editMenu.type == 'None')
        return (
            <>
                <div className={style.menu} onClick={(e) => e.stopPropagation()}>
                    <Button onClick={createNode} text="Create node">
                    </Button>
                    <Button onClick={() => props.setActionState('Create line')} text="Create line">
                    </Button>
                    <Button onClick={removeLine} text="Remove line">
                    </Button> 
                    <Button onClick={() => props.setActionState('Remove node')} text="Remove node">
                    </Button>
                </div>
            </>
        )
}

