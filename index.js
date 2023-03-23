let movies_div = document.getElementById("movies");
let data;
// let opening =
let id;
// setTimeout(function(){
//     document.getElementById("content");
//     document.querySelector("img").innerHTML = null
// },50000)
async function main() {
  try {
    let query = document.getElementById("query").value;
    console.log("query:", query);

    // what kind of data we need?
    // we need movie data from omdb
    //  api- http://www.omdbapi.com/?apikey=[yourkey]&
    // KEY - 55a1cc5
    let res = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=55a1cc5&s=${query}`
    );
    data = await res.json();
    console.log("data:", data);
    // appendMovies(data);
    let actual_data = data.Search;
    console.log(actual_data);
    if (actual_data != undefined) {
      appendMovies(actual_data);

      let sorted_arr = data.Search;
      // let sorting = document.getElementById("sort");
      // sorting.addEventListener("change", function () {

      let sort_lh = document.getElementById("sort_lh");
      sort_lh.addEventListener("click", function () {
        movies_div.innerHTML = null;
        sorted_arr.sort(function (a, b) {
          return a.Year - b.Year;
        });
        appendMovies(sorted_arr);
      });

      let sort_hl = document.getElementById("sort_hl");
      sort_hl.addEventListener("click", function () {
        movies_div.innerHTML = null;
        sorted_arr.sort(function (a, b) {
          return b.Year - a.Year;
        });
        appendMovies(sorted_arr);
      });
      // });
      let filter_arr = data.Search;
      let filter = document.getElementById("filter");
      filter.addEventListener("click",function(){
        movies_div.innerHTML = null;
        let filtered = filter_arr.filter(function(el,index){
          if(el.Year>=2015){
            console.log("el",el)
            
            
            return el;
          }
        });
        appendMovies(filtered);
        // console.log("filter_arr", filter_arr)
      })

    } else {
      movies_div.innerHTML = null;
      let div = document.createElement("div");
      div.id = "error_div";
      let img = document.createElement("img");
      img.id = "error";
      img.style.width = "1200px";
      img.src =
        "https://c.tenor.com/NpZyGNG3SLEAAAAM/this-content-is-not-available.gif";
      div.append(img);
      movies_div.append(div);
      // movies_div.style.display = "flex";
      // movies_div.style.justifyContent = "center";
      // movies_div.style.alignItems = "center";
      // movies_div.style.height = "100px";
    }
    // return data.Search;
  } catch (err) {
    console.log("err:", err);
  }
}
// issue is data is undefined error for forEach is not a function

function appendMovies(data) {
  movies_div.innerHTML = null;
  data.forEach((el) => {
    let box = document.createElement("div");

    let p = document.createElement("p");
    p.innerText = el.Title;

    let img = document.createElement("img");
    img.src = el.Poster;

    let Year = document.createElement("p");
    Year.innerText = `Year: ${el.Year}`;

    let rating = document.createElement("p");
    let rating_value = createRating();
    if (rating_value >= 4) {
      let recom = document.createElement("p");
      rating.innerText = `Rating: ${rating_value} ⭐`;
      recom.innerText = "Recommended";
      recom.style.color = "white";
      recom.style.backgroundColor = "red";
      recom.style.padding = "0px 5px";
      recom.style.borderRadius = "5px";
      rating.append(recom);
    } else {
      rating.innerText = `Rating: ${rating_value} ⭐`;
    }

    box.append(img, p, Year, rating);
    movies_div.append(box);
  });
}
function createRating() {
  let rating = (Math.random() * 5).toFixed(1);
  return rating;
}