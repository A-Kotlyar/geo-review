module.exports = (() => {
    var yandexMap,
        clusterer;

    return new Promise((resolve) => ymaps.ready(resolve))
        .then(() => {
            yandexMap = new ymaps.Map("yandex-map", {
                center: [55.76, 37.64],
                zoom: 7,
                controls: ['geolocationControl', 'searchControl']
            });

            var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
                '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
                '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
                '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
            );
            clusterer = new ymaps.Clusterer({
                preset: 'islands#invertedVioletClusterIcons',
                clusterDisableClickZoom: true,
                openBalloonOnClick: true,
                clusterBalloonContentLayout: 'cluster#balloonCarousel',
                clusterBalloonItemContentLayout: customItemContentLayout,
            });

            yandexMap.geoObjects.add(clusterer);

            return {
                yandexMap,
                clusterer,
            }
        });
})();