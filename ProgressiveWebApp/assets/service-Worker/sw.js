
const CACHE_NAME = "achievements-v1";
const CACHE_URLS = [
    "../styles/indigo-pink.css"
];

self.addEventListener('install', function (ev) {
    caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log("Cache abierto");
            return cache.addAll(CACHE_URLS);
        })
        .catch(err => console.log(err));

});

self.addEventListener('activate', function () { });

self.addEventListener('fetch', function (ev) {
    ev.respondWith(
        caches.match(ev.request)
            .then(function (response) {
                // response es la respuesta de buscar en el cache
                console.log(ev.request.url);
                if (response) {
                    console.log("Estoy en el cache y te ahorré una petición");
                    return response;
                } else {
                    console.log("No estoy en el cache :3");
                }
                // Ve al servidor
                return fetch(ev.request);

            })
            .catch(er=>console.log(er))

    )
});