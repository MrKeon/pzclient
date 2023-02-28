import { Checkbox, Input, TagInput, Tooltip, Whisper } from 'rsuite';

function isBoolean(value: string) {
    const bools = ['true', 'false'];
    return bools.includes(value);
}

// function create(title: string, value: string | string[], config: any, setConfig: any) {
//     if (config[title].value != value) {
//         config[title].value = value;
//         setConfig({...config})
//     }
// }

function change(title: string, value: string | readonly string[], config: any, setConfig: any) {
    config[title].value = value;
    setConfig({...config});
}
function getComponent(title: string, value: string | string[], config: any, setConfig: any) {
    // create(title, value, config, setConfig);
    if (Array.isArray(value)) {
        return <TagInput defaultValue={value} trigger={['Enter','Comma','Space']} onChange={(value) => change(title, value, config, setConfig)} value={config[title].value}/>
    } else if (isBoolean(value)) {
        return <Checkbox defaultChecked={value == 'true'} onChange={(value, checked) => change(title, checked.toString().toLowerCase(), config, setConfig)} value={config[title].value}/>
    } else {
        return <Input id={title} as="textarea" rows={value ? value.length/20 : 2} defaultValue={value} onChange={(value) => change(title, value, config, setConfig)} value={config[title].value}/>
    }
}

function Item(title: string, value: [string]|string, index: number, config: any, setConfig: any, description?: string) {
    return (
        <div className="Item" key={index}>
                <div>
                    <h3>{title}</h3>
                    <Whisper trigger={description ? "hover" : "none"} followCursor speaker={<Tooltip>{description}</Tooltip>}>
                        <div>{getComponent(title, value, config, setConfig)}</div>
                    </Whisper>
                </div>
        </div>
    )
}

export default Item;