//URL endpoint
const endpointUrl = 'https://www.google-analytics.com/g/collect';

// Paramètres communs à tous les événements
const commonData = {
    v: 2,
    tid: 'G-XXXXXXXX-1',
    dl: window.location.href,
    dr: document.referrer,
    dt: window.document.title,
    ua: navigator.userAgent,
    sr: `${screen.width}x${screen.height}`,
    ul: navigator.language,
    cid: generateUUID(),
    sid: new Date() * 1,
};

// Nouvel objet de propriétés personnalisées commun à tous les événements
const customData = {
    'ep.test': 'custom_property_1',
    'ep.test2': 'custom_property_2',
    'ep.test3': 'custom_property_3'
};

// Tableau pour stocker les événements
const eventQueue = [];

// Ajoutez des événements au tableau
eventQueue.push({
    'en': 'page_view',
    ...customData
});
eventQueue.push({
    'en': 'test_event',
    ...customData
});

// Parcours des événements dans la file d'attente
eventQueue.forEach(event => {
    const eventData = { ...commonData, ...event };
    const data = new URLSearchParams(eventData).toString();
    navigator.sendBeacon(endpointUrl, data);
});
