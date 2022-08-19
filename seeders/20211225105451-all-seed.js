'use strict';
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {

    
    await queryInterface.bulkInsert('Users',[{
        id:1,
        name:'admin',
        surname:'admin',
        username:'admin',
        password: bcrypt.hashSync('admin',10),
        email:'admin@raf.rs',
        gender:'Male',
        isAdmin:true,
        isModerator:true,
        createdAt: new Date(),
        updatedAt: new Date()

    },{
        id:2,
        name:'moderator',
        surname:'moderator',
        username:'moderator',
        password: bcrypt.hashSync('moderator',10),
        email:'moderator@raf.rs',
        gender:'Female',
        isAdmin:false,
        isModerator:true,
        createdAt: new Date(),
        updatedAt: new Date()

    },{
        id:3,
        name:'Marko',
        surname:'Markovic',
        username:'marko1',
        password: bcrypt.hashSync('password',10),
        email:'marko@gmail.com',
        gender:'Male',
        isAdmin:false,
        isModerator:false,
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        id:4,
        name:'Jovana',
        surname:'Jovanovic',
        username:'jovana1',
        password: bcrypt.hashSync('password',10),
        email:'jovana@gmail.com',
        gender:'Female',
        isAdmin:false,
        isModerator:false,
        createdAt: new Date(),
        updatedAt: new Date()

    }]);


    
    queryInterface.bulkInsert('User_Suggestions', [{
        id:1,
        name:'Predlog1',
        userId:4,
        purpose:'Cilj predloga',
        role:'uloga',
        location:'lokacija',
        description:'opis',
        createdAt: new Date(),
        updatedAt: new Date()        

    },{
        id:2,
        name:'Predlog2',
        userId:4,
        purpose:'Cilj predloga2',
        role:'uloga2',
        location:'lokacija2',
        description:'opis2',
        createdAt: new Date(),
        updatedAt: new Date()  


    },{
        id:3,
        name:'Predlog3',
        userId:3,
        purpose:'Cilj predloga3',
        role:'uloga3',
        location:'lokacija3',
        description:'opis3',
        createdAt: new Date(),
        updatedAt: new Date()  


    }],{});


    
    await queryInterface.bulkInsert('Activities', [{
            id:1,
            name:'Mladi odlučuju',
            organisation:'Youth Fest Novi Sad',
            description:`Youth Fest poziva volontere da anketiranjem mladih dostavljaju kratke izveštaje u formi bloga kojima bi nam odgovorili da li mladi učestvuju u donošenju odluka.`,
            time: "14:00",
            location:'Sentandrejski put 106b, Novi Sad',
            outdoor:true,
            date:"2022-3-1",
            createdAt: new Date(),
            updatedAt: new Date()
         },{
            id:2,
            name:'Čišćenje plaže Igalo',
            organisation:'Ne bacajmo boce',
            description:`Očistimo našu sredinu`,
            time: "10:00",
            location:'Plaža Igalo,hotel Palmon,Herceg Novi',
            outdoor:true,
            date:"2022-6-6",
            createdAt: new Date(),
            updatedAt: new Date()
         },{
            id:3,
            name:'Nek se čuje glas',
            organisation:`Okular`,
            description:'Pisanje članaka, blogova, beseda, intervjua, vesti i tekstova',
            time: "14:00",
            location:'Kralja Petra 23,Beograd',
            outdoor:false,
            date:"2022-4-15",
            createdAt: new Date(),
            updatedAt: new Date()
         },{
            id:4,
            name:'Ime4',
            organisation:`Organizacija4`,
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet eros id risus semper laoreet feugiat a magna. Nunc in lectus imperdiet, tempus ipsum ac, consectetur felis. Maecenas suscipit rhoncus dictum.',
            time: "14:00",
            location:'Knez Mihaila 23,Beograd',
            outdoor:false,
            date:"2022-4-15",
            createdAt: new Date(),
            updatedAt: new Date()


         },
         {
            id:5,
            name:'Ime5',
            organisation:`Organizacija5`,
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet eros id risus semper laoreet feugiat a magna. Nunc in lectus imperdiet, tempus ipsum ac, consectetur felis. Maecenas suscipit rhoncus dictum.',
            time: "14:00",
            location:'Knez Mihaila 23,Beograd',
            outdoor:false,
            date:"2022-4-15",
            createdAt: new Date(),
            updatedAt: new Date()


         },{
            id:6,
            name:'Ime6',
            organisation:`Organizacija6`,
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet eros id risus semper laoreet feugiat a magna. Nunc in lectus imperdiet, tempus ipsum ac, consectetur felis. Maecenas suscipit rhoncus dictum.',
            time: "14:00",
            location:'Knez Mihaila 23,Beograd',
            outdoor:false,
            date:"2022-4-15",
            createdAt: new Date(),
            updatedAt: new Date()


         },{
            id:7,
            name:'Ime7',
            organisation:`Organizacija7`,
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet eros id risus semper laoreet feugiat a magna. Nunc in lectus imperdiet, tempus ipsum ac, consectetur felis. Maecenas suscipit rhoncus dictum.',
            time: "14:00",
            location:'Knez Mihaila 23,Beograd',
            outdoor:false,
            date:"2022-4-15",
            createdAt: new Date(),
            updatedAt: new Date()


         },{
            id:8,
            name:'Ime8',
            organisation:`Organizacija8`,
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet eros id risus semper laoreet feugiat a magna. Nunc in lectus imperdiet, tempus ipsum ac, consectetur felis. Maecenas suscipit rhoncus dictum.',
            time: "14:00",
            location:'Knez Mihaila 23,Beograd',
            outdoor:false,
            date:"2022-4-15",
            createdAt: new Date(),
            updatedAt: new Date()


         },{
            id:9,
            name:'Ime9',
            organisation:`Organizacija9`,
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet eros id risus semper laoreet feugiat a magna. Nunc in lectus imperdiet, tempus ipsum ac, consectetur felis. Maecenas suscipit rhoncus dictum.',
            time: "14:00",
            location:'Knez Mihaila 23,Beograd',
            outdoor:false,
            date:"2022-4-15",
            createdAt: new Date(),
            updatedAt: new Date()


         },{
            id:10,
            name:'Ime10',
            organisation:`Organizacija10`,
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet eros id risus semper laoreet feugiat a magna. Nunc in lectus imperdiet, tempus ipsum ac, consectetur felis. Maecenas suscipit rhoncus dictum.',
            time: "14:00",
            location:'Knez Mihaila 23,Beograd',
            outdoor:false,
            date:"2022-4-15",
            createdAt: new Date(),
            updatedAt: new Date()


         },{
            id:11,
            name:'Ime11',
            organisation:`Organizacija11`,
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet eros id risus semper laoreet feugiat a magna. Nunc in lectus imperdiet, tempus ipsum ac, consectetur felis. Maecenas suscipit rhoncus dictum.',
            time: "14:00",
            location:'Knez Mihaila 23,Beograd',
            outdoor:false,
            date:"2022-4-15",
            createdAt: new Date(),
            updatedAt: new Date()


         },{
            id:12,
            name:'Ime12',
            organisation:`Organizacija12`,
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet eros id risus semper laoreet feugiat a magna. Nunc in lectus imperdiet, tempus ipsum ac, consectetur felis. Maecenas suscipit rhoncus dictum.',
            time: "14:00",
            location:'Knez Mihaila 23,Beograd',
            outdoor:false,
            date:"2022-4-15",
            createdAt: new Date(),
            updatedAt: new Date()


         },{
            id:13,
            name:'Ime13',
            organisation:`Organizacija13`,
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet eros id risus semper laoreet feugiat a magna. Nunc in lectus imperdiet, tempus ipsum ac, consectetur felis. Maecenas suscipit rhoncus dictum.',
            time: "14:00",
            location:'Knez Mihaila 23,Beograd',
            outdoor:false,
            date:"2022-4-15",
            createdAt: new Date(),
            updatedAt: new Date()


         }], {});

         

         

  },


  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {


      });

      await queryInterface.bulkDelete('Activities', null, {


      });

      await queryInterface.bulkDelete('User_Suggestions', null, {


    });


  }
};
