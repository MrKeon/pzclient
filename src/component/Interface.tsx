import { Button, ButtonToolbar } from "rsuite";

function Interface(props: any) {
    let { currentConfig, fetchConfig, setConfig } = props;
    function downloadConfig(fetchConfig: any, setConfig: any) {
        fetchConfig().then((c: any) => setConfig(c));
    }

    function uploadConfig(currentConfig: any) {

    }

    return (
        <div>
            <div className="Interface"/>
            <div>
                <ButtonToolbar>
                    <Button color="green" appearance="primary" onClick={() => downloadConfig(fetchConfig, setConfig)}>
                        Download Config
                    </Button>
                    <Button color="blue" appearance="primary" onClick={() => uploadConfig(currentConfig)}>
                        Upload Config
                    </Button>
                </ButtonToolbar>
            </div>
        </div>
    );
}

export default Interface;