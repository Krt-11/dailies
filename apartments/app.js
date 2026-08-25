const data = [{"rank": 1, "name": "The Flats at Polaris", "address": "1650 Crescent Ridge Blvd, Westerville, OH 43081", "rent": "$1,299", "drive": "~5–8 min", "url": "https://www.apartments.com/the-flats-at-polaris-westerville-oh/q1ndjlx/"}, {"rank": 2, "name": "The Lakes of Olentangy", "address": "260 Lazelle Rd, Lewis Center, OH 43035", "rent": "$1,441 total monthly price", "drive": "~5–8 min", "url": "https://www.apartments.com/the-lakes-of-olentangy-lewis-center-oh/b7rf4q9/"}, {"rank": 3, "name": "Pierpont Apartments", "address": "8200 Worthington Galena Rd, Westerville, OH 43081", "rent": "$1,299", "drive": "~8–12 min", "url": "https://www.apartments.com/pierpont-apartments-westerville-oh/"}, {"rank": 4, "name": "Oak Creek at Polaris", "address": "9005 Oak Village Blvd, Lewis Center, OH 43035", "rent": "~$1,420", "drive": "~5–8 min", "url": "https://www.apartments.com/oak-creek-at-polaris-lewis-center-oh/"}, {"rank": 5, "name": "Remington Woods", "address": "8495 Bella Woods Dr, Lewis Center, OH 43035", "rent": "~$1,445+", "drive": "~8–12 min", "url": "https://www.apartments.com/remington-woods-lewis-center-oh/"}, {"rank": 6, "name": "Lake Club at Polaris", "address": "1038 Bayridge Dr, Lewis Center, OH 43035", "rent": "~$1,455+", "drive": "~7–10 min", "url": "https://www.apartments.com/lake-club-lewis-center-oh/"}, {"rank": 7, "name": "Northpark Place", "address": "1350 Gage St, Columbus, OH 43240", "rent": "~$1,425+", "drive": "~5–7 min", "url": "https://www.apartments.com/northpark-place-columbus-oh/kd26qb9/"}, {"rank": 8, "name": "Traditions at Worthington Woods", "address": "7325 Cayman Ln, Columbus, OH 43085", "rent": "~$1,500", "drive": "~10–15 min", "url": "https://www.apartments.com/traditions-at-worthington-woods-columbus-oh/ek0wxeq/"}, {"rank": 9, "name": "Prescott Place", "address": "351 Peat Moss Dr, Columbus, OH 43235", "rent": "~$1,270+", "drive": "~10–15 min", "url": "https://www.apartments.com/prescott-place-columbus-oh/pgttr8s/"}, {"rank": 10, "name": "Cedar Trace", "address": "963 Cedar Trace Blvd, Westerville, OH 43081", "rent": "~$1,395", "drive": "~10–15 min", "url": "https://www.apartments.com/cedar-trace-westerville-oh/2srmd69/"}, {"rank": 11, "name": "Summerview", "address": "8357 Falling Water Ln, Columbus, OH 43240", "rent": "$1,370", "drive": "~5–8 min", "url": "https://www.apartments.com/summerview-columbus-oh/j2c2r37/"}, {"rank": 12, "name": "Grand at Polaris", "address": "850 Polaris Grand Dr, Lewis Center, OH 43035", "rent": "~$1,415+", "drive": "~5–8 min", "url": "https://www.apartments.com/"}, {"rank": 13, "name": "Worthington Commons", "address": "1541 Barnes Dr E, Columbus, OH 43229", "rent": "~$1,360", "drive": "~12–17 min", "url": "https://www.apartments.com/worthington-commons-worthington-city-school-district-columbus-oh/hqjb991/"}, {"rank": 14, "name": "Mirada", "address": "1 Mirada Dr N, Lewis Center, OH 43035", "rent": "~$1,590+", "drive": "~5–10 min", "url": "https://www.apartments.com/mirada-lewis-center-oh/"}, {"rank": 15, "name": "Hayden Reserve", "address": "7375 High Cross Blvd, Columbus, OH 43235", "rent": "$1,595", "drive": "~12–16 min", "url": "https://www.apartments.com/hayden-reserve-columbus-oh/16nre54/"}, {"rank": 16, "name": "Liberty House", "address": "7450 Vantage Dr, Columbus, OH 43235", "rent": "$1,595", "drive": "~12–16 min", "url": "https://www.apartments.com/"}, {"rank": 17, "name": "Allston Pointe", "address": "227 Allston Way, Columbus, OH 43235", "rent": "~$1,400+", "drive": "~12–17 min", "url": "https://www.apartments.com/"}, {"rank": 18, "name": "Alexander Park", "address": "747 Worthington Woods Blvd, Worthington, OH 43085", "rent": "~$1,343+", "drive": "~12–17 min", "url": "https://www.apartments.com/alexander-park-worthington-oh/f8jqh2r/"}, {"rank": 19, "name": "The Avenue at Polaris", "address": "8321 Seattle Ave, Columbus, OH 43240", "rent": "~$1,534+", "drive": "~5–8 min", "url": "https://www.apartments.com/the-avenue-at-polaris-apartments-columbus-oh/"}, {"rank": 20, "name": "Copley Park", "address": "7505 Worthington Galena Rd, Worthington, OH 43085", "rent": "~$1,297+", "drive": "~12–17 min", "url": "https://www.apartments.com/copley-park-worthington-oh/ee9nqmm/"}];
const map = L.map('map').setView([40.1458,-82.9768],12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:'© OpenStreetMap contributors'
}).addTo(map);

const apartmentIcon = rank => L.divIcon({
  className:'rank-marker',
  html:`<div class="rank-pin">${rank}</div>`,
  iconSize:[34,34], iconAnchor:[17,17], popupAnchor:[0,-18]
});
const landmarkIcon = L.divIcon({
  className:'landmark-marker',
  html:`<div class="landmark-pin">💼</div>`,
  iconSize:[40,40], iconAnchor:[20,20], popupAnchor:[0,-20]
});

const landmark = L.marker([40.1458,-82.9768],{icon:landmarkIcon}).addTo(map);
landmark.bindPopup('<b>💼 Polaris Fashion Place</b><br>1500 Polaris Parkway, Columbus, OH<br><small>Reference landmark for the apartment map.</small>');

const markers = [];

async function geocodeAddress(address) {
  const endpoint = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';
  const params = new URLSearchParams({
    SingleLine: address,
    f:'json',
    outFields:'Match_addr,Addr_type',
    maxLocations:'1',
    outSR:'4326'
  });
  const response = await fetch(endpoint + '?' + params.toString());
  if (!response.ok) throw new Error('Geocoder HTTP ' + response.status);
  const json = await response.json();
  if (!json.candidates || !json.candidates.length) throw new Error('No match');
  const c = json.candidates[0];
  return {lat:c.location.y, lon:c.location.x, matched:c.address, score:c.score, type:c.attributes?.Addr_type || ''};
}

async function loadMarkers() {
  const status = document.getElementById('mapStatus');
  let located = 0;
  for (const a of data) {
    try {
      const p = await geocodeAddress(a.address);
      const marker = L.marker([p.lat,p.lon],{icon:apartmentIcon(a.rank)}).addTo(map);
      marker.bindPopup(
        `<b>#${a.rank} ${a.name}</b><br>` +
        `${a.address}<br>` +
        `<span style="color:#667085;font-size:11px">Map match: ${p.matched}</span><br>` +
        `${a.rent}<br>` +
        `<a target="_blank" rel="noopener" href="${a.url}">View Apartments.com ↗</a>`
      );
      markers.push({rank:a.rank,marker,lat:p.lat,lon:p.lon});
      located++;
      status.textContent = `Located ${located} of ${data.length} apartments…`;
    } catch(e) {
      console.warn('Could not locate', a.name, a.address, e);
    }
  }
  if (markers.length) {
    map.fitBounds(L.featureGroup(markers.map(x=>x.marker)).getBounds().pad(0.08));
  }
  status.textContent = `Map locations verified from street addresses: ${located}/${data.length}.`;
  setTimeout(()=>status.remove(),5000);
}

function focusApartment(rank) {
  const x=markers.find(m=>m.rank===rank);
  if(!x) return;
  map.setView([x.lat,x.lon],16);
  x.marker.openPopup();
}
function filter() {
  const q=document.getElementById('q').value.toLowerCase();
  document.querySelectorAll('.card').forEach(c=>c.style.display=c.innerText.toLowerCase().includes(q)?'flex':'none');
}
function sortList() {
  const mode=document.getElementById('s').value, list=document.getElementById('list');
  const cards=[...document.querySelectorAll('.card')];
  cards.sort((a,b)=>mode==='rank'?a.dataset.rank-b.dataset.rank:
    parseFloat(a.innerText.match(/\$[\d,]+/)?.[0].replace(/[$,]/g,'')||99999)-
    parseFloat(b.innerText.match(/\$[\d,]+/)?.[0].replace(/[$,]/g,'')||99999));
  cards.forEach(c=>list.appendChild(c));
}
loadMarkers();
