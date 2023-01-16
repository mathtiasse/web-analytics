const customDataLayer = {};

const initDataLayer = (data) => {
    Object.assign(customDataLayer, data);
    console.log("DataLayer initialized :", customDataLayer);
    window.dispatchEvent(new CustomEvent('dataLayerInitialized', { detail: customDataLayer }));
}

const pageLanguage = () => {
    return document.getElementsByTagName("html")[0].getAttribute("lang");
}

const detectDevice = () => {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return 'mobile';
    } else {
        return 'desktop';
    }
}

const data = {
    page_url: window.location.href,
    page_path: window.location.pathname,
    page_previous: document.referrer,
    page_screen_width: screen.width,
    page_screen_height: screen.height,
    env_channel: detectDevice(),
    env_language: pageLanguage(),
    env_dnt: navigator.doNotTrack,
    user_agent: navigator.userAgent
}

initDataLayer(data);

const addDataToLayer = (key, value) => {
    const previousDataLayer = {...customDataLayer};
    customDataLayer[key] = value;
    const updatedData = { [key]: value};
    console.log("DataLayer updated :", updatedData);
    window.dispatchEvent(new CustomEvent('dataLayerUpdated', { detail: updatedData }));
}
