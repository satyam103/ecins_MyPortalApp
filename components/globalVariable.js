fetch("https://ipapi.co/json/", {
  method: 'GET'
}).then((response) => response.json())
.then((responseJson) => {      
  if(responseJson.country_code !== undefined){
    // console.log(responseJson.country_code);
        // Creating Global Variable.  
        if(responseJson.country_code=="GB"){
          global.ApiUrl = 'https://em.ecdesk.org';
          global.ApiSecret = "B6EXKckC6nirW1viiW1G3B0pmEV5WXHACD3dTQvX";
        }else if(responseJson.country_code=="AU"){
          global.ApiUrl = 'https://em.ecdesk.com.au';
          global.ApiSecret = "B6EXKckC6nirW1viiW1G3B0pmEV5WXHACD3dTQvX";
        }else if(responseJson.country_code=="US"){
          global.ApiUrl = 'https://em.ecdesk-us.org';
          // global.ApiSecret = "n6EXKckC6nirW1viiW1G3B0pmEV5WXHACD3dTQvj";
          global.ApiSecret = "B6EXKckC6nirW1viiW1G3B0pmEV5WXHACD3dTQvX";
        }else if(responseJson.country_code=="NZ"){
          global.ApiUrl = 'https://em.ecdesk.dev';
          global.ApiSecret = "n6EXKckC6nirW1viiW1G3B0pmEV5WXHACD3dTQvj";
        }else{
          global.ApiUrl = 'https://em.ecdesk.dev';
          global.ApiSecret = "n6EXKckC6nirW1viiW1G3B0pmEV5WXHACD3dTQvj";
        }
  }     
})
.catch((error) => {
  console.log("Geo API"+error);
});