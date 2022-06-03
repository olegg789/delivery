import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Group, PanelHeader} from "@vkontakte/vkui";

function History({router}) {
    return (
        <>
            <PanelHeader separator={false}>
                История
            </PanelHeader>
            <Group>

            </Group>
        </>
    )
}

export default withRouter(History)