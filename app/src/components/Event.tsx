import { Fragment } from "react"
import { Text } from '@chakra-ui/react'
import { itemNames } from "../data/itemNames";

export const Event = ({ eventTime, eventMessage }: { eventTime: number, eventMessage: string }) => {
    if (eventMessage[eventMessage.length - 1] === ".") {
        eventMessage = eventMessage.slice(0, -1);
    }

    let diff = Math.round((Date.now() - eventTime * 1000) / 1000);

    let timeFormat = "";
    var h = Math.floor(diff / 3600);
    var m = Math.floor(diff % 3600 / 60);
    if (diff < 60) {
        timeFormat = `less than a minute ago`;
    } else if (h > 0) {
        timeFormat = `about ${h} hour${h > 1 ? "s" : ""} ago`;
    } else {
        timeFormat = `about ${m} minute${m > 1 ? "s" : ""} ago`
    }

    let item_id = eventMessage.substring(
        eventMessage.indexOf("@") + 1,
        eventMessage.lastIndexOf("@")
    );

    if (item_id.length > 0) {
        eventMessage = eventMessage.replace(`@${item_id}@`, itemNames[item_id]);
    }

    return (
        <Fragment>
            {eventMessage} <Text fontSize='xs' display={'inline'}>{timeFormat}</Text>
        </Fragment>
    )
}