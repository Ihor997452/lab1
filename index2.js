const fetchURL = (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                requestedUrl: url
            })
        }, 500)
    })
};

const urlsToFetch = [
    '/home',
    '/lib',
    '/account',
    '/friends'
];

const f = async() => {
    for (const url of urlsToFetch) {
        console.log(await fetchURL(url));
    }
}

console.log('start:');

f().then(_ => console.log('end;'));
