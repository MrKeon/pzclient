import { Checkbox, Input, TagInput, Tooltip, Whisper } from 'rsuite';

function isBoolean(value: string) {
    const bools = ['true', 'false'];
    return bools.includes(value);
}

function create(value: string | string[], title: string, currentConfig: any) {
    currentConfig[title] = value;
}

function change(value: string | readonly string[], title: string, currentConfig: any) {
    currentConfig[title] = value;
}
function getComponent(title: string, value: string | string[], currentConfig: any) {
    create(value, title, currentConfig);
    if (Array.isArray(value)) {
        return <TagInput defaultValue={value} trigger={['Enter','Comma','Space']} onChange={(value) => change(value, title, currentConfig)}/>
    } else if (isBoolean(value)) {
        return <Checkbox defaultChecked={value == 'true'} onChange={(value, checked) => change(checked.toString().toLowerCase(), title, currentConfig)}/>
    } else {
        return <Input id={title} as="textarea" rows={value.length/20} defaultValue={value} onChange={(value) => change(value, title, currentConfig)}/>
    }
}

function Item(title: string, value: [string]|string, currentConfig: any, index: number, description?: string) {
    return (
        <div className="Item" key={index}>
                <div>
                    <h3>{title}</h3>
                    <Whisper trigger={description ? "hover" : "none"} followCursor speaker={<Tooltip>{description}</Tooltip>}>
                        <div>{getComponent(title, value, currentConfig)}</div>
                    </Whisper>
                </div>
        </div>
    )
}

export default Item;