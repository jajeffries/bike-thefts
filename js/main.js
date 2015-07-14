    function initialize() {
        var mapCanvas = document.getElementById('map-canvas');
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude,
                longitude = position.coords.longitude,
                policeURL = 'https://data.police.uk/api/crimes-street/all-crime?lat=' + latitude + '&lng=' + longitude,
                map = new google.maps.Map(mapCanvas, {
                    center: new google.maps.LatLng(latitude, longitude),
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

            $.ajax({
                url: policeURL,
                type: 'GET'
            }).done(function (thefts) {
                var bicycleThefts = thefts.filter(function (theft) {
                    return theft.category == 'bicycle-theft';
                });
                bicycleThefts.forEach(function (theft) {
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(theft.location.latitude, theft.location.longitude),
                        map: map,
                    });
                });
            });
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
