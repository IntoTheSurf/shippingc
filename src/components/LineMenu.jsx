import '../css/editmenu.module.css'

export const LineMenu = (props) => {

    function handleLabelChange(e) {
        props.setLineCustomization(items => items.map((item, i) => {
 
            if (i === props.index) {
                return {
                    ...item,
                    label: e.target.value,
                };
            } else {
                return item;
            }
        }));
    }

    function handleStyleChange(e) {
        props.setLineCustomization(items => items.map((item, i) => {
 
            if (i === props.index) {
                return {
                    ...item,
                    style: e.target.value,
                };
            } else {
                return item;
            }
        }));
    }

    function handleColorChange(e) {
        props.setLineCustomization(items => items.map((item, i) => {
 
            if (i === props.index) {
                return {
                    ...item,
                    color: e.target.value,
                };
            } else {
                return item;
            }
        }));
    }

    function handleWidthChange(e) {
        props.setLineCustomization(items => items.map((item, i) => {
 
            if (i === props.index) {
                return {
                    ...item,
                    width: e.target.value,
                };
            } else {
                return item;
            }
        }));
    }

    const newVal = props.lineCustomization[props.index];

    return (
        <div>
            <ul>
                <li><form>
                    <label htmlFor="lstyle">Line style: </label>
                    <select className="lstyle" value={newVal.style} onChange={handleStyleChange}>
                        <option value="solid" >Solid</option>
                        <option value="dotted">Dotted</option>
                    </select>
                </form></li>
                <li><form>
                    <label htmlFor="lcolor">Line color: </label>
                    <input type="color" id="lcolor" name="lcolor" value={newVal.color}  onChange={handleColorChange} />
                </form></li>
                <li>
                    <label htmlFor="lwidth">Line width: </label>
                    <input type="number" id="lwidth" name="lwidth" min="1" max="10" value={newVal.width} onChange={handleWidthChange}/>
                </li>
                <li><form>
                    <label htmlFor="ltext">Line label: </label>
                    <input type="text" id="ltext" name="ltext" placeholder="Enter text here" value={newVal.label} onChange={handleLabelChange} />
                </form></li>
            </ul>
        </div >
    )
}




