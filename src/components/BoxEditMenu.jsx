import '../css/editmenu.module.css'

export const BoxEditMenu = (props) => {

    function handleLabelChange(e) {
        props.setBoxCustomization(items => items.map((item, i) => {
 
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

    
    function handleShapeChange(e) {
        props.setBoxCustomization(items => items.map((item, i) => {
 
            if (i === props.index) {
                return {
                    ...item,
                    shape: e.target.value,
                };
            } else {
                return item;
            }
        }));
    }

    function handleSizeChange(e) {
        props.setBoxCustomization(items => items.map((item, i) => {
 
            if (i === props.index) {
                return {
                    ...item,
                    size: e.target.value,
                };
            } else {
                return item;
            }
        }));
    }

    function handleUrlChange(e) {
        props.setBoxCustomization(items => items.map((item, i) => {
 
            if (i === props.index) {
                return {
                    ...item,
                    url: e.target.value,
                };
            } else {
                return item;
            }
        }));
    }

    function handleBorderColorChange(e) {
        props.setBoxCustomization(items => items.map((item, i) => {
 
            if (i === props.index) {
                return {
                    ...item,
                    borderColor: e.target.value,
                };
            } else {
                return item;
            }
        }));
    }

    function handleBgColorChange(e) {
        props.setBoxCustomization(items => items.map((item, i) => {
 
            if (i === props.index) {
                return {
                    ...item,
                    bgColor: e.target.value,
                };
            } else {
                return item;
            }
        }));
    }

    function handleBorderWidthChange(e) {
        props.setBoxCustomization(items => items.map((item, i) => {
 
            if (i === props.index) {
                return {
                    ...item,
                    borderWidth: e.target.value,
                };
            } else {
                return item;
            }
        }));
    }

    function handleTextColorChange(e) {
        props.setBoxCustomization(items => items.map((item, i) => {
 
            if (i === props.index) {
                return {
                    ...item,
                    textColor: e.target.value,
                };
            } else {
                return item;
            }
        }));
    }

    const newVal = props.boxCustomization[props.index];

    return (
        <div>
            <ul>
                <li><form>
                    <label htmlFor="label">Label:</label>
                    <input type="text" id="label" name="label" placeholder="Enter text here" value={newVal.label} onChange={handleLabelChange}/>
                </form></li>
                <li><form>
                    <label htmlFor="shape">Shape:</label>
                    <select className="shape" value={newVal.shape} onChange={handleShapeChange}>
                        <option value="square" >Square</option>
                        <option value="circle">Circle</option>
                    </select>
                </form></li>
                <li><form>
                    <label htmlFor="size">Size:</label>
                    <input type="number" id="size" name="size" min="75" max="350" value={newVal.size} onChange={handleSizeChange}/>
                </form></li>
                <li><form>
                    <label htmlFor="image">Image URL:</label>
                    <input type="url" id="image" name="image" value={newVal.url} placeholder="https://example.com" pattern="https://.*\.(png|jpg|jpeg|gif|tiff|webp)" onChange={handleUrlChange}/>
                </form></li>
                <li><form>
                    <label htmlFor="bcolor">Border color:</label>
                    <input type="color" id="bcolor" name="bcolor" value={newVal.borderColor} onChange={handleBorderColorChange}/>
                </form></li>
                <li><form>
                    <label htmlFor="bgcolor">Background color:</label>
                    <input type="color" id="bgcolor" name="bgcolor" value={newVal.bgColor} onChange={handleBgColorChange}/>
                </form></li>
                <li><form>
                    <label htmlFor="bwidth">Border width:</label>
                    <input type="number" id="bwidth" name="bwidth" min="0" max="30" value={newVal.borderWidth} onChange={handleBorderWidthChange}/>
                </form></li>
                <li><form>
                    <label htmlFor="tcolor">Text color:</label>
                    <input type="color" id="tcolor" name="tcolor" value={newVal.textColor} onChange={handleTextColorChange}/>
                </form></li>
            </ul>
        </div >
    )
}




