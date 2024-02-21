import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {

   url = 'https://randomuser.me/api/?results=10';
   constructor(private http: HttpClient) {

  }

  listarprueba(){   
    
    fetch(this.url)
    .then(response => {      
      if (response.ok) {       
        console.log(response.json())
        return response.json();
      }
      throw new Error('La solicitud falló.');
    })
    .then(data => {
      // Manejar los datos recibidos
      console.log(data);
      // Aquí puedes procesar los datos y mostrarlos en tu aplicación
    })
    .catch(error => {
      // Manejar errores
      console.error('Hubo un problema con la solicitud:', error);
    });
  }
     
 public listar() {
   
    
    fetch('https://randomuser.me/api/?results=10')
      .then(response => {
        // Verificar si la solicitud fue exitosa (código de estado 200)
        if (response.ok) {
          // Leer el cuerpo de la respuesta y almacenarlo en una variable
          return response.text();
        }
        throw new Error('La solicitud falló.');
      })
      .then(data => {       
        const jsonData = JSON.parse(data);      
      
        const results = jsonData.results.map(result => ({
          gender: result.gender,
          name: result.name,
          location: result.location,
          email: result.email,
          dob: result.dob,
          picture: result.picture
        }));
        console.log(results);        
       
      })
      .catch(error => {
       
        console.error('Hubo un problema con la solicitud:', error);
      });
  }   

}
