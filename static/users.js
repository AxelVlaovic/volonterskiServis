function init(){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length-1];

    document.getElementById('return1').addEventListener('click',e=>{
        window.location.href = 'main_page.html';
    });

    fetch('https://volonterskiapi.herokuapp.com/api/users',{
        headers: {'Authorization':`Bearer: ${token}`}
    })
        .then(res => res.json())
        .then(data => {

            const lst = document.getElementById('usersLst');

            data.forEach(el =>{ 
                lst.innerHTML += `<li>Id: ${el.id},Name: ${el.name},Surname: ${el.surname},Username: ${el.username},Email: ${el.email},Password: ${el.password},Gender: ${el.gender},isAdmin: ${el.isAdmin},isModerator ${el.isModerator}</li>`;
            });

        })

    document.getElementById('btn2').addEventListener('click',e=>{

        document.getElementById('userLst').innerHTML ='';
        document.getElementById('activitiesLst').innerHTML='';
        document.getElementById('suggestionsLst').innerHTML='';
        document.getElementById('sr1').value='';

        var userIdField = document.getElementById('dl1');
        const userId = userIdField.value;
        userIdField.value = '';

        if(userId != ''){

            fetch('https://volonterskiapi.herokuapp.com/api/users/' + userId,{
                method: 'DELETE',
                headers: {'Content-Type' : 'application/json','Authorization':`Bearer: ${token}`}
            })
                .then(res => res.json())
                .then(user => {

                    if(user!=null){
                        
                        fetch('https://volonterskiapi.herokuapp.com/api/users',{
                            headers:{'Authorization':`Bearer: ${token}`}
                        })
                                .then(ress => ress.json())
                                .then(data => {

                                    const lst = document.getElementById('usersLst');
                                    lst.innerHTML = '';

                                    data.forEach(el =>{ 
                                        lst.innerHTML += `<li>Id: ${el.id},Name: ${el.name},Surname: ${el.surname},Username: ${el.username},Email: ${el.email},Password: ${el.password},Gender: ${el.gender},isAdmin: ${el.isAdmin},isModerator ${el.isModerator}</li>`;
                                    });

                                })

                                fetch('https://volonterskiapi.herokuapp.com/api/relations_user/' + userId,{
                                    headers:{'Authorization':`Bearer: ${token}`}
                                })
                                    .then(res => res.json())
                                    .then(rows => {

                                        rows.forEach(relation => {
                                            fetch('https://volonterskiapi.herokuapp.com/api/users_activities/' + relation.id,{
                                                method:'DELETE',
                                                headers:{'Authorization':`Bearer: ${token}`}
                                            })
                                        })

                                    })

                    }else{
                        alert('Invalid credentials or unauthorized user');
                    }

                })

        }else{
            alert('Invalid id');
        }

    });

    document.getElementById('btn1').addEventListener('click',e=>{

        document.getElementById('userLst').innerHTML ='';
        document.getElementById('activitiesLst').innerHTML='';
        document.getElementById('suggestionsLst').innerHTML='';
        document.getElementById('sr1').value='';

        var name = document.getElementById('cr1');
        var surname = document.getElementById('cr2');
        var username = document.getElementById('cr3');
        var email = document.getElementById('cr4');
        var password = document.getElementById('cr5');
        var repassword = document.getElementById('cr6');
        var gender = document.getElementById('cr7');
        var isAdmin = document.getElementById('cr8');
        var isModerator = document.getElementById('cr9');

        const obj = {

            name:name.value,
            surname:surname.value,
            username:username.value,
            email:email.value,
            password:password.value,
            repassword:repassword.value, 
            gender:gender.value,
            isAdmin:isAdmin.checked,
            isModerator:isModerator.checked

        }

        name.value='';
        surname.value='';
        username.value='';
        email.value='';
        password.value='';
        repassword.value='';
        gender.value='';
        isAdmin.checked=false;
        isModerator.checked=false;

        fetch('https://volonterskiapi.herokuapp.com/api/users',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json','Authorization':`Bearer: ${token}`},
            body: JSON.stringify(obj)
        })
            .then(res=> res.json())
            .then(el => {

                    if(el!=null){
                    const lst = document.getElementById('usersLst');
                    lst.innerHTML += `<li>Id: ${el.id},Name: ${el.name},Surname: ${el.surname},Username: ${el.username},Email: ${el.email},Password: ${el.password},Gender: ${el.gender},isAdmin: ${el.isAdmin},isModerator ${el.isModerator}</li>`;
                    }else{
                        alert('Invalid credentials or unauthorized user');
                    }

            });

    });

    document.getElementById('btn11').addEventListener('click',e=>{

        const userLst = document.getElementById('userLst');
        const activitiesLst = document.getElementById('activitiesLst');
        const suggestionsLst = document.getElementById('suggestionsLst');

        userLst.innerHTML = '';
        activitiesLst.innerHTML = '';
        suggestionsLst.innerHTML = '';

        var userIdField = document.getElementById('sr1');
        const userId = userIdField.value;
        userIdField.value = '';

        if(userId != ''){

            fetch('https://volonterskiapi.herokuapp.com/api/users/' + userId,{
                headers:{'Authorization':`Bearer: ${token}`}
            })
                .then(res => res.json())
                .then(user => {

                    if(user!=null){

                        userLst.innerHTML = `<li>Id: ${user.id}|Username: ${user.username}|Email: ${user.email}</li>`;

                        user.user_suggestions.forEach(el => {
                            suggestionsLst.innerHTML += `<li>ID: ${el.id},Name: ${el.name}</li>`;
                        });

                        fetch('https://volonterskiapi.herokuapp.com/api/relations_user/' + userId,{
                            headers:{'Authorization':`Bearer: ${token}`}
                        })
                            .then(result => result.json())
                            .then(relations => {

                                relations.forEach(ac => {
                                    activitiesLst.innerHTML += `<li>ID: ${ac.activities.id},Name: ${ac.activities.name},Organisation: ${ac.activities.organisation}</li>`;
                                })

                            })

                    }else{
                        alert('Invalid id');
                        userLst.innerHTML = '';
                        activitiesLst.innerHTML = '';
                        suggestionsLst.innerHTML = '';
                    }                 

                });

        }else{
            alert('Invalid id');
            userLst.innerHTML = '';
            activitiesLst.innerHTML = '';
            suggestionsLst.innerHTML = '';
        }

    });

    document.getElementById('btn12').addEventListener('click',e=>{

        document.getElementById('userLst').innerHTML ='';
        document.getElementById('activitiesLst').innerHTML='';
        document.getElementById('suggestionsLst').innerHTML='';
        document.getElementById('sr1').value='';

    });

    document.getElementById('btnFill').addEventListener('click',e=>{

        var userIdField = document.getElementById('upId');
        const userId = userIdField.value;

        var name = document.getElementById('up1');
        var surname = document.getElementById('up2');
        var username = document.getElementById('up3');
        var email = document.getElementById('up4');
        var password = document.getElementById('up5');
        var repassword = document.getElementById('up6');
        var gender = document.getElementById('up7');
        var isAdmin = document.getElementById('up8');
        var isModerator = document.getElementById('up9');

        if(userId!=''){

            fetch('https://volonterskiapi.herokuapp.com/api/users/' + userId,{
                headers:{'Authorization':`Bearer: ${token}`}
            })
                .then(res => res.json())
                .then(el => {

                    if(el!=null){
                        name.value=el.name;
                        surname.value=el.surname;
                        username.value=el.username;
                        email.value=el.email;
                        password.value = '';
                        repassword.value = '';
                        gender.value=el.gender;
                        isAdmin.checked=el.isAdmin;
                        isModerator.checked=el.isModerator;

                    }else{
                        userIdField.value = '';
                        name.value='';
                        surname.value='';
                        username.value='';
                        email.value ='';
                        password.value='';
                        repassword.value='';
                        repassword.value='';
                        gender.value='';
                        isAdmin.checked = false;
                        isModerator.checked = false;
                        alert('Invalid credentials');
                    }

                });

        }else{
            userIdField.value = '';
            name.value='';
            surname.value='';
            username.value='';
            email.value ='';
            password.value='';
            repassword.value='';
            repassword.value='';
            gender.value='';
            isAdmin.checked = false;
            isModerator.checked = false;
            alert('Invalid id');
        }

    });

    document.getElementById('btn3').addEventListener('click',e=>{

        document.getElementById('userLst').innerHTML ='';
        document.getElementById('activitiesLst').innerHTML='';
        document.getElementById('suggestionsLst').innerHTML='';
        document.getElementById('sr1').value='';

        var userIdField = document.getElementById('upId');
        const userId = userIdField.value;
        userIdField.value = '';

        var name = document.getElementById('up1');
        var surname = document.getElementById('up2');
        var username = document.getElementById('up3');
        var email = document.getElementById('up4');
        var password = document.getElementById('up5');
        var repassword = document.getElementById('up6');
        var gender = document.getElementById('up7');
        var isAdmin = document.getElementById('up8');
        var isModerator = document.getElementById('up9');

        const obj = {

            name:name.value,
            surname:surname.value,
            username:username.value,
            email:email.value,
            password:password.value,
            repassword:repassword.value, 
            gender:gender.value,
            isAdmin:isAdmin.checked,
            isModerator:isModerator.checked

        }

        if(userId!=''){

            fetch('https://volonterskiapi.herokuapp.com/api/users/' + userId,{
                method:'PUT',
                headers: {'Content-Type' : 'application/json','Authorization':`Bearer: ${token}`},
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then(ell => {

                    if(ell!=null){

                            fetch('https://volonterskiapi.herokuapp.com/api/users',{
                                headers:{'Authorization':`Bearer: ${token}`}
                            })
                                .then(ress => ress.json())
                                .then(data => {

                                    const lst = document.getElementById('usersLst');
                                    lst.innerHTML = '';

                                    data.forEach(el =>{ 
                                        lst.innerHTML += `<li>Id: ${el.id},Name: ${el.name},Surname: ${el.surname},Username: ${el.username},Email: ${el.email},Password: ${el.password},Gender: ${el.gender},isAdmin: ${el.isAdmin},isModerator ${el.isModerator}</li>`;
                                    });

                                })

                    }else{
                        alert('Invalid credentials or unauthorized user');
                    }

            });

        }else{
            alert('Invalid credentials');
        }

        userIdField.value = '';
        name.value='';
        surname.value='';
        username.value='';
        email.value ='';
        password.value='';
        repassword.value='';
        repassword.value='';
        gender.value='';
        isAdmin.checked = false;
        isModerator.checked = false;

    });

}