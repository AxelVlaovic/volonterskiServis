function init(){
                   
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length-1];

    document.getElementById('return1').addEventListener('click',e=>{
        window.location.href = 'main_page.html';
    });

    fetch('https://volonterskiapi.herokuapp.com/api/activities',{
        headers:{'Authorization' : `Bearer ${token}`}
    })
    .then(res => res.json())
    .then(data => {
            const lst = document.getElementById('activitiesLst');
            
            data.forEach(el => {
                lst.innerHTML += `<li>ID: ${el.id},Name: ${el.name},Organisation: ${el.organisation},Description: ${el.description},Start time: ${el.time},Address: ${el.location},Outdoor: ${el.outdoor},Date: ${el.date}</li>`;
            });
        });

    document.getElementById('btn1').addEventListener('click',e=>{

        document.getElementById('usersLst').innerHTML ='';
        document.getElementById('activityLst').innerHTML='';
        document.getElementById('sr1').value='';

        let  name = document.getElementById('cr1');
        let  organisation = document.getElementById('cr2');
        let  description = document.getElementById('cr3');
        let  time = document.getElementById('cr4');
        let  location = document.getElementById('cr7');
        let  outdoor = document.getElementById('cr6');
        let  date = document.getElementById('cr5');

        const data = {

            name : name.value,
            organisation : organisation.value,
            description : description.value,
            time : time.value,
            location : location.value,
            outdoor : outdoor.checked,
            date : date.value

        };

            name.value = '';
            organisation.value = '';
            description.value = '';
            time.value = '';
            location.value = '';
            outdoor.checked = false;
            date.value = '';

        fetch('https://volonterskiapi.herokuapp.com/api/activities',{
            method: 'POST',
            headers: {'Content-Type': 'application/json','Authorization' : `Bearer ${token}`},
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(el => {
                    if(el != null){
                    document.getElementById('activitiesLst').innerHTML += `<li>ID: ${el.id},Name: ${el.name},Organisation: ${el.organisation},Description: ${el.description},Start time: ${el.time},Address: ${el.location},Outdoor: ${el.outdoor},Date: ${el.date}</li>`;
                    }else{
                        alert('Invalid credentials');          
                    }
            });

    });

    document.getElementById('btn2').addEventListener('click',e =>{

        document.getElementById('usersLst').innerHTML ='';
        document.getElementById('activityLst').innerHTML='';
        document.getElementById('sr1').value='';

        const activityId = document.getElementById('dl1').value;
        document.getElementById('dl1').value = '';

        if(activityId != ''){

        fetch('https://volonterskiapi.herokuapp.com/api/activities/' + activityId,{
            headers:{'Authorization' : `Bearer ${token}`}
        })
            .then(res => res.json())
            .then(validation => {
                if(validation == null){
                    alert('Id is not valid');
                }else{
                    
                    fetch('https://volonterskiapi.herokuapp.com/api/activities/' + activityId,{  
                        method: 'DELETE',
                        headers:{'Authorization' : `Bearer ${token}`}
                    })
                        .then(res => res.json())
                        .then(obj => {
            
                            if(obj == null){
                                alert('Id is not valid');   
                            }
            
                            fetch('https://volonterskiapi.herokuapp.com/api/activities',{
                                headers:{'Authorization' : `Bearer ${token}`}
                            })
                            .then(res => res.json())
                            .then(data => {
            
                                    const lst = document.getElementById('activitiesLst');
                                    lst.innerHTML = '';
            
                                    data.forEach(el => {
                                        lst.innerHTML += `<li>ID: ${el.id},Name: ${el.name},Organisation: ${el.organisation},Description: ${el.description},Start time: ${el.time},Address: ${el.location},Outdoor: ${el.outdoor},Date: ${el.date}</li>`;
                                    });

            
                                });

                            fetch('https://volonterskiapi.herokuapp.com/api/relations_activity/' + activityId,{
                                headers:{'Authorization' : `Bearer ${token}`}
                            })
                                .then(res => res.json())
                                .then(rows => {

                                    rows.forEach(relation => {
                                        fetch('https://volonterskiapi.herokuapp.com/api/users_activities/' + relation.id,{
                                            method:'DELETE',
                                            headers:{'Authorization' : `Bearer ${token}`}
                                        })
                                    })

                                })
                              
                        });
                }
            });
        }else{
            alert('Id not specified');
        }
            
    });

    document.getElementById('btnFill').addEventListener('click',e=>{

        let upId = document.getElementById('upId');
        const actId = upId.value;

        let up1 = document.getElementById('up1');
        let up2 = document.getElementById('up2');
        let up3 = document.getElementById('up3');
        let up4 = document.getElementById('up4');
        let up5 = document.getElementById('up5');
        let up6 = document.getElementById('up6');
        let up7 = document.getElementById('up7');

        if(actId != ''){

        fetch('https://volonterskiapi.herokuapp.com/api/activities/' + actId,{
            headers:{'Authorization' : `Bearer ${token}`}
        })
            .then(res => res.json())
            .then(obj => {

                if(obj == null){
                    upId.value = '';
                    up1.value = '';
                    up2.value = '';
                    up3.value = '';
                    up4.value = '';
                    up5.value = '';
                    up6.checked = false;
                    up7.value = '';
                    alert('Id is not valid');
                }else{

                    up1.value = obj.name;
                    up2.value = obj.organisation;
                    up3.value = obj.description;
                    up4.value = obj.time;
                    up7.value = obj.location;
                    up6.checked = obj.outdoor;
                    up5.value = obj.date;

                }

            });
        
        }else{
            alert('Id not specified');
                upId.value = '';
                up1.value = '';
                up2.value = '';
                up3.value = '';
                up4.value = '';
                up5.value = '';
                up6.checked = false;
                up7.value = '';
        }

    });


    document.getElementById('btn3').addEventListener('click',e=>{

        document.getElementById('usersLst').innerHTML ='';
        document.getElementById('activityLst').innerHTML='';
        document.getElementById('sr1').value='';

        let activityIdField = document.getElementById('upId');
        const activityId = activityIdField.value;

        let  name = document.getElementById('up1');
        let  organisation = document.getElementById('up2');
        let  description = document.getElementById('up3');
        let  time = document.getElementById('up4');
        let  location = document.getElementById('up7');
        let  outdoor = document.getElementById('up6');
        let  date = document.getElementById('up5');

        const data = {

            name : name.value,
            organisation : organisation.value,
            description : description.value,
            time : time.value,
            location : location.value,
            outdoor : outdoor.checked,
            date : date.value

        };

            name.value = '';
            organisation.value = '';
            description.value = '';
            time.value = '';
            location.value = '';
            outdoor.checked = false;
            date.value = '';

            if(activityId == ''){
                alert('invalid credentials');
                
            }else{
            
            fetch('https://volonterskiapi.herokuapp.com/api/activities/' + activityId,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json','Authorization' : `Bearer ${token}`},
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(obj => {

                    if(obj == null){
                        alert('Invalid credentials');
                    }else{
                        
                        fetch('https://volonterskiapi.herokuapp.com/api/activities',{
                            headers:{'Authorization' : `Bearer ${token}`}
                        })
                            .then(res => res.json())
                            .then(data => {
                                    const lst = document.getElementById('activitiesLst');
                                    lst.innerHTML ='';

                                    data.forEach(el => {
                                        lst.innerHTML += `<li>ID: ${el.id},Name: ${el.name},Organisation: ${el.organisation},Description: ${el.description},Start time: ${el.time},Address: ${el.location},Outdoor: ${el.outdoor},Date: ${el.date}</li>`;
                                    });
                                });

                        }

                 });
                }

                activityIdField.value = '';

     });

     document.getElementById('btn11').addEventListener('click',e=>{

        const activityLst = document.getElementById('activityLst');
        const usersLst = document.getElementById('usersLst');
        activityLst.innerHTML = '';
        usersLst.innerHTML = '';

        const activityId = document.getElementById('sr1').value;
        document.getElementById('sr1').value = '';

        if(activityId != ''){

            fetch('https://volonterskiapi.herokuapp.com/api/activities/' + activityId,{
                headers:{'Authorization' : `Bearer ${token}`}
            })
                .then(res => res.json())
                .then(activity => {

                    if(activity!=null){

                        activityLst.innerHTML = `<li>Name:${activity.name}|Organisation:${activity.organisation}</li>`;

                        fetch('https://volonterskiapi.herokuapp.com/api/relations_activity/' + activityId,{
                            headers:{'Authorization' : `Bearer ${token}`}
                        })
                            .then(res => res.json())
                            .then(relation => {

                                relation.forEach(rl => {
                                    usersLst.innerHTML += `<li>Id: ${rl.users.id},Username: ${rl.users.username},Email: ${rl.users.email}</li>`;
                                })

                            })


                    }else{
                        alert('Invalid id');
                        activityLst.innerHTML = '';
                        usersLst.innerHTML = '';
                    }                 

                });

        }else{
            alert('Invalid id');
            activityLst.innerHTML = '';
            usersLst.innerHTML = '';
        }

    });

    document.getElementById('btn12').addEventListener('click',e=>{

        document.getElementById('usersLst').innerHTML ='';
        document.getElementById('activityLst').innerHTML='';
        document.getElementById('sr1').value='';

    });

}