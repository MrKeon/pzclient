import { currentConfig } from "../App";
import Item from "../component/Item";

function Container(props: any) {
    let list: any[] = [];
    let { config, currentConfig } = props;
    let index = 0;
    Object.keys(config).forEach(title => {
        const obj = config[title];
        list.push(Item(title, obj.value, currentConfig, index++, obj.description))
    })

    return (
        <div>
            <div className="Container">{list}</div>
        </div>
    );
}

export default Container;