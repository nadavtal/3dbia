import { useState, useEffect } from 'react';


export default function useEventSource (url) {
    const [data, updateData] = useState(null);
    console.log(url)
    useEffect(() => {
        const source = new EventSource(url);

        source.onmessage = function logEvents(event) {   
            console.log('event', event)   
            updateData(JSON.parse(event.data));     
        }
    }, [])

    return data;
}