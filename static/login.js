function init(){

    document.getElementById('btn1').addEventListener('click',e => {

        const data = {

            username:document.getElementById('username').value,
            password:document.getElementById('password').value

        };

        fetch('https://volonterskiauth.herokuapp.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`; 
                    window.location.href = 'main_page.html';
                }
            });

    });

}