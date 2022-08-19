function init(){                       
    
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length-1];

    document.getElementById('return1').addEventListener('click',e=>{
        window.location.href = 'main_page.html';
    });

    fetch('http://localhost:5000/admin/users',{
        headers:{'Authorization': `Bearer ${token}`}
    })
        .then(res => res.json())
        .then(data => {
            const lst = document.getElementById('usersLst');

            data.forEach(el => {
                if(!el.isAdmin && !el.isModerator){
                lst.innerHTML += `<li>Id: ${el.id} | Username:${el.username}</li>`
                }
            })

        })

    fetch('http://localhost:5000/admin/activities',{
        headers:{'Authorization': `Bearer ${token}`}
    })
        .then(res => res.json())
        .then(data => {

            const lst = document.getElementById('activitiesLst');

            data.forEach(el => {
                lst.innerHTML += `<li>Id: ${el.id} | Name:${el.name}</li>`
            })

        })

    fetch('http://localhost:5000/admin/users_activities',{
        headers:{'Authorization': `Bearer ${token}`}
    })
        .then(res => res.json())
        .then(data => {

            const lst = document.getElementById('relationsLst');

            data.forEach(el => {    
                lst.innerHTML += `<li>Id: ${el.id} | User: ${el.users.username},User Id: ${el.users.id} | Activity: ${el.activities.name},Activity Id: ${el.activities.id}</li>`;
            })

        })

    document.getElementById('btn1').addEventListener('click',e=>{

        var userId = document.getElementById('cr1');
        var activityId = document.getElementById('cr2');

        const data = {
            
            userId : userId.value,
            activityId: activityId.value

        }

        userId.value = '';
        activityId.value = '';

        fetch('http://localhost:5000/admin/users_activities',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json','Authorization': `Bearer ${token}`},
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(element => {

                if(element!=null){

                    const relationId = element.id;

                    fetch('http://localhost:5000/admin/users_activities/' + relationId,{
                        headers : {'Authorization': `Bearer ${token}`}
                    })
                        .then(result=>result.json())
                        .then(el => {

                            const lst = document.getElementById('relationsLst');
                            lst.innerHTML += `<li>Id: ${el.id} | User: ${el.users.username},User Id: ${el.users.id} | Activity: ${el.activities.name},Activity Id: ${el.activities.id}</li>`;

                        })
                   
                }else{
                    alert('Invalid id\'s or the relation already exists');
                }

            })

    });

    document.getElementById('btn2').addEventListener('click',e=>{

        var relationIdField = document.getElementById('dl1');
        const relationId = relationIdField.value;
        relationIdField.value = '';
        
        if(relationId!=''){

            fetch('http://localhost:5000/admin/users_activities/' + relationId,{
                method: 'DELETE',
                headers:{'Authorization': `Bearer ${token}`}
            })
                .then(res => res.json())
                .then(row => {

                    if(row!=null){

                        fetch('http://localhost:5000/admin/users_activities',{
                            headers: {'Authorization': `Bearer ${token}`}
                        })
                        .then(res => res.json())
                        .then(data => {

                            const lst = document.getElementById('relationsLst');
                            lst.innerHTML = '';

                            data.forEach(el => {
                                lst.innerHTML += `<li>Id: ${el.id} | User: ${el.users.username},User Id: ${el.users.id} | Activity: ${el.activities.name},Activity Id: ${el.activities.id}</li>`;
                            })

                    });

                    }else{
                        alert('Invalid id')
                    }

                })
            }else{
                alert('Invalid id');
            }

    })

    document.getElementById('btn3').addEventListener('click',e=>{

        var relationIdField = document.getElementById('up1'); 
        const relationId = relationIdField.value;
        relationIdField.value = '';

        var userId = document.getElementById('up2');
        var activityId = document.getElementById('up3');

        const obj = {
            
            userId : userId.value,
            activityId: activityId.value

        }

        userId.value = '';
        activityId.value = '';


        if(relationId!=''){

            fetch('http://localhost:5000/admin/users_activities/' + relationId,{
                method: 'PUT',
                headers: {'Content-Type' : 'application/json','Authorization': `Bearer ${token}`},
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then(element => {

                    if(element!=null){
                            
                        fetch('http://localhost:5000/admin/users_activities',{
                            headers:{'Authorization': `Bearer ${token}`}
                        })
                            .then(ress => ress.json())
                            .then(data => {

                                const lst = document.getElementById('relationsLst');
                                lst.innerHTML = '';
    
                                data.forEach(el => {
                                    lst.innerHTML += `<li>Id: ${el.id} | User: ${el.users.username},User Id: ${el.users.id} | Activity: ${el.activities.name},Activity Id: ${el.activities.id}</li>`;
                                })
    
                        });

                    }else{
                        alert('Invalid id\'s or the relation already exsists');
                    }

                });

        }else{
            alert('Invalid relation id');
        }

    });

}