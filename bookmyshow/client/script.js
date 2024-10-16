
async function addMovie(event){
    console.log("addMovie function worked")
    event.preventDefault();

    let form = document.getElementById("form")

    let formData = new FormData(form);

    let title = formData.get("title");
    console.log("title :",title);
    console.log("formdata :",formData);

    let certification = formData.get("certification");
    console.log("certification :",certification);

    let languages = formData.getAll("languages");
    console.log("languages :",languages);

    let thumbnail = formData.get("thumbnail");
    console.log("thumnail :",thumbnail);

    let background_image = formData.get('background_image');
    console.log("background_image :",background_image);

    let about = formData.get("about");
    console.log("about : ",about);

    languages = languages.toString();
    console.log("languages :",languages);
    
    let genre = formData.getAll('genres');
    console.log("genres :",genre);

    genre = genre.toString();




    let moviedata = {
        title,
        genre,
        certification,
        languages,
        duration,
        thumbnail,
        background_image  
    }


    let json_data = JSON.stringify(moviedata);

    let response = await fetch("http://localhost:3002/movies",{
        method : 'POST',
        headers : {
            "Content-Type" : "application/json" 
        },
        body : json_data

    });
    console.log("response :",response);



}   