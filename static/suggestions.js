function init(){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length-1];

    document.getElementById('return1').addEventListener('click',e=>{
        window.location.href = 'main_page.html';
    });

    fetch('https://volonterskiapi.herokuapp.com/api/user_suggestions',{
        headers: {'Authorization' : `Bearer ${token}`}
    })
        .then(res => res.json())
        .then(data => {

            const lst = document.getElementById('suggestionsLst');

            data.forEach(el => {
                lst.innerHTML += `<li>ID: ${el.id},User: ${el.user.username},User Id: ${el.userId},Name: ${el.name},Location: ${el.location},Purpose: ${el.purpose},Role: ${el.role},Description: ${el.description}</li>`;
            });

        });

    fetch('https://volonterskiapi.herokuapp.com/api/users',{
        headers:{'Authorization' : `Bearer ${token}`}
    })
        .then(res => res.json())
        .then(data => {

            const lst = document.getElementById('usersLst');

            data.forEach(el => {
                if(!el.isAdmin && !el.isModerator){
                lst.innerHTML += `<li>Id: ${el.id}|Username:${el.username}</li>`;
                    }
            });

        });

    document.getElementById('btn1').addEventListener('click',e=>{

        var userId = document.getElementById('crId');
        var name = document.getElementById('cr1');
        var location = document.getElementById('cr2');
        var purpose = document.getElementById('cr3');
        var role = document.getElementById('cr4');
        var description = document.getElementById('cr5');

        const data = {
            
            userId : parseInt(userId.value),
            name : name.value,
            location : location.value,
            purpose : purpose.value,
            role : role.value,
            description : description.value

        };

            userId.value= '';
            name.value = '';
            location.value = '';
            purpose.value = '';
            role.value = '';
            description.value = '';              

        fetch('https://volonterskiapi.herokuapp.com/api/user_suggestions',{
            method: 'POST',
            headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(ell =>{

                if(ell!=null){

                    fetch("https://volonterskiapi.herokuapp.com/api/user_suggestions/" + ell.id.toString(),{
                        headers: {'Authorization' : `Bearer ${token}`}
                    })
                            .then(row => row.json())
                            .then(el =>{

                                if(el != null){ 
                                document.getElementById('suggestionsLst').innerHTML += `<li>ID: ${el.id},User: ${el.user.username},User Id: ${el.userId},Name: ${el.name},Location: ${el.location},Purpose: ${el.purpose},Role: ${el.role},Description: ${el.description}</li>`;
                                }else{
                                    alert('Invalid credentails');
                                }

                            });

                }else{
                    alert('Invalid Credentials');
                }

            });

    });

    document.getElementById('btn2').addEventListener('click',e=>{

        var suggestionIdField = document.getElementById('dl1');
        const suggestionId = suggestionIdField.value;
        suggestionIdField.value = '';

        if(suggestionId != ''){

        fetch('https://volonterskiapi.herokuapp.com/api/user_suggestions/' + suggestionId,{
            method: 'DELETE',
            headers:{'Authorization' : `Bearer ${token}`}
        })
            .then(res => res.json())
            .then(suggestion => {

                if(suggestion != null){
                    fetch('https://volonterskiapi.herokuapp.com/api/user_suggestions',{
                        headers:{'Authorization' : `Bearer ${token}`}
                    })
                        .then(res => res.json())
                        .then(data => {

                            const lst = document.getElementById('suggestionsLst');

                            lst.innerHTML = '';

                            data.forEach(el => {
                                lst.innerHTML += `<li>ID: ${el.id},User: ${el.user.username},User Id: ${el.userId},Name: ${el.name},Location: ${el.location},Purpose: ${el.purpose},Role: ${el.role},Description: ${el.description}</li>`;
                            });

                        });

                }else{
                    alert('Invalid id');
                }

            })

        }else{
            alert('Invalid id');
        }

    });

    document.getElementById('btnFill').addEventListener('click',e=>{

        var suggestionIdField = document.getElementById('upId');
        const suggestionId = suggestionIdField.value;
        suggestionIdField.value = '';

        var name = document.getElementById('up1');
        var location = document.getElementById('up2');
        var purpose = document.getElementById('up3');
        var role = document.getElementById('up4');
        var description = document.getElementById('up5');


        if(suggestionId != ''){

            fetch('https://volonterskiapi.herokuapp.com/api/user_suggestions/' + suggestionId,{
                headers:{'Authorization' : `Bearer ${token}`}
            })
                .then(res => res.json())
                .then(sugg => {

                    if(sugg!=null){

                        suggestionIdField.value= sugg.id;
                        name.value = sugg.name;
                        location.value = sugg.location;
                        purpose.value = sugg.purpose;
                        role.value = sugg.role;
                        description.value = sugg.description;


                    }else{
                        alert('Invalid id');
                        suggestionIdField.value= '';
                        name.value = '';
                        location.value = '';
                        purpose.value = '';
                        role.value = '';
                        description.value = '';  
                    }

                });

        }else{
            alert('Invalid id');
            suggestionIdField.value= '';
            name.value = '';
            location.value = '';
            purpose.value = '';
            role.value = '';
            description.value = '';  
        }


    });
 
    //UPDATE (PUT)
    document.getElementById('btn3').addEventListener('click',e=>{

        var suggestionIdField = document.getElementById('upId');
        const suggestionId = suggestionIdField.value;
        suggestionIdField.value = '';

        var name = document.getElementById('up1');
        var location = document.getElementById('up2');
        var purpose = document.getElementById('up3');
        var role = document.getElementById('up4');
        var description = document.getElementById('up5');

        const data = {
            
            name : name.value,
            purpose : purpose.value,
            location : location.value,
            description : description.value,
            role : role.value

        };

        if(suggestionId!=''){

            fetch('https://volonterskiapi.herokuapp.com/api/user_suggestions/' + suggestionId,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json','Authorization' : `Bearer ${token}`},
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(suggestion => {

                    if(suggestion!=null){
                        
                        fetch('https://volonterskiapi.herokuapp.com/api/user_suggestions',{
                            headers:{'Authorization' : `Bearer ${token}`}
                        })
                                .then(result => result.json())
                                .then(rows => {
                                    const lst = document.getElementById('suggestionsLst');
                                    lst.innerHTML = '';

                                    rows.forEach(el => {
                                        lst.innerHTML += `<li>ID: ${el.id},User: ${el.user.username},User Id: ${el.userId},Name: ${el.name},Location: ${el.location},Purpose: ${el.purpose},Role: ${el.role},Description: ${el.description}</li>`;
                                    });

                                });

                    }else{
                        alert('Invalid credentials'); 
                    }

                })

        }else{
            alert('Invalid credentials');
        }

        suggestionIdField.value= '';
        name.value = '';
        location.value = '';
        purpose.value = '';
        role.value = '';
        description.value = '';  

    });

}