async function getAddress(location,country) {
    let address = location + " "+ country;

    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`,
        {
            headers: {
                "User-Agent": "wanderlust-app" 
            }
        }
    );

    if(!response.ok){
        return null;
    }

    const data = await response.json();

    if(data.length){
        let lat = parseFloat(data[0].lat);
        let lng = parseFloat(data[0].lon);
        return [lng,lat];
    }else{
        return 0;
    }
}

module.exports = getAddress;