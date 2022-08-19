
function init(){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length-1];   

    document.getElementById('users').addEventListener('click',e=>{
        window.location.href = "users.html";
    });

    document.getElementById('activities').addEventListener('click',e=>{
        window.location.href = 'activities.html';
    });

    document.getElementById('suggestions').addEventListener('click',e=>{
        window.location.href = "suggestions.html";
    });

    document.getElementById('relations').addEventListener('click',e=>{
        window.location.href = "relations.html";
    });

    document.getElementById('logout').addEventListener('click',e=>{
        document.cookie = `token=;SameSite=Lax` 
        window.location.href = 'login.html';
    });

}