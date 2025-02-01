var allData = [];
var loading = document.querySelector(".loading");

function getShows(kind) {
    var xhr = new XMLHttpRequest();
    loading.classList.replace("d-none", "d-flex");

    xhr.open("GET", `https://api.themoviedb.org/3/trending/${kind}/day?language=en-US`, true);

    xhr.setRequestHeader('accept', 'application/json');
    xhr.setRequestHeader(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTE5MTY2Yjg0ZTdjYmQ3MDVmZTZhZDgzNzcyYTBiMyIsIm5iZiI6MTczNDcyNDM1My4xNjYwMDAxLCJzdWIiOiI2NzY1Y2IwMTMzMGJjZTZlYzk5MGUzMjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.prvM8T6ezIKxKw8RpifK0C5XgF2kd-_nAx-8-HC-oxI'
    );

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            allData = response.results; 
            display();
        }
    });

    xhr.send();
}

function display() {
    var cartona = "";
    loading.classList.replace("d-flex", "d-none");

    for (let i = 0; i < allData.length; i++) {
        var bg = `<img src="https://image.tmdb.org/t/p/w500/${allData[i].media_type == "person" ? allData[i].profile_path : allData[i].poster_path}" alt="Image" class="img-fluid imgs">
`
        cartona += `<div class="col-md-6 col-lg-3 gy-4">
        <div class="card text-white ${allData[i].media_type} text-center p-4 border border-danger border-3 rounded-3" 
             id="${allData[i].id}"
             onclick="getDetails(${allData[i].id}, '${allData[i].media_type}')">
              <div class="media-type">${allData[i].media_type.toUpperCase()}</div>
        <div class="movie-bg">
          <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${
            allData[i].profile_path || allData[i].poster_path
          }" alt="">
          <br>
        </div>
            <div class="movie-content">
                <h2 class="movie-title">${allData[i].title || allData[i].name}</h2>
                <p class="movie-year">${
                    allData[i].media_type != "person"
              ? (allData[i].release_date || allData[i].first_air_date).substring(0, 4)
              : allData[i].known_for_department
          }</p>
            </div>
        </div>
    </div>`
            console.log( allData[i]);
            
    }

    document.getElementById("myData").innerHTML = cartona;
}

document.querySelector("#mealSelect").addEventListener("change", function (e) {
    getShows(e.target.value);
});

getShows('all');

function getDetails(id, type) {
    console.log(`ID: ${id}, Media Type: ${type}`);
    var xhr = new XMLHttpRequest();

    xhr.open("GET",  `https://api.themoviedb.org/3/${type === 'person' ? 'person' : type}/${id}?language=en-US`, true)

    xhr.setRequestHeader('accept', 'application/json');
    xhr.setRequestHeader(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTE5MTY2Yjg0ZTdjYmQ3MDVmZTZhZDgzNzcyYTBiMyIsIm5iZiI6MTczNDcyNDM1My4xNjYwMDAxLCJzdWIiOiI2NzY1Y2IwMTMzMGJjZTZlYzk5MGUzMjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.prvM8T6ezIKxKw8RpifK0C5XgF2kd-_nAx-8-HC-oxI'
    );

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            
            displayDetails (response)
        }
    });

    xhr.send();
    
}
function displayDetails (data) {
    console.log( data.place_of_birth);
    
    var content = `
    <div class="text-center">
     <img src="https://image.tmdb.org/t/p/w780/${
            data.profile_path || data.backdrop_path
                  }" height="350px" alt="">
                  <br>
       
    </div>`;

document.getElementById("detailsContent").innerHTML = content;
document.querySelector(".modal-header").innerHTML = `
  <div class="details-content">
    <h2 class="movie-title">${data.title || data.name}</h2>
    <p class="modal-year" w-tid="26">${
        data.media_type != "person"
            ? (data.release_date)
            : data.place_of_birth
        }</p>
  </div>`;

var detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
detailsModal.show();
}

